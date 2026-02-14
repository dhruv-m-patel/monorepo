# Architecture Overview

This document describes the architecture of the Claude AI development framework, how its components interact, and how it integrates with the monorepo's toolchain.

## System Architecture Diagram

```mermaid
graph TB
    subgraph "Developer Interaction"
        DEV[Developer]
        CLI[Claude Code CLI]
    end

    subgraph "Claude Code Runtime"
        CTX[Project Context]
        PERM[Permissions Engine]
        MATCH[Intent Matcher]
        EXEC[Execution Engine]
    end

    subgraph "Framework Components"
        direction TB
        CMD[Slash Commands<br/>.claude/commands/*.md]
        SKILL[Skills<br/>.claude/skills/*/SKILL.md]
        AGENT[Agent Templates<br/>.claude/agents/*.md]
    end

    subgraph "Configuration"
        CLAUDE_MD[CLAUDE.md<br/>Project Context]
        SETTINGS[settings.json<br/>Permissions]
    end

    subgraph "Monorepo Toolchain"
        TURBO[Turborepo]
        YARN[Yarn 3 Workspaces]
        VITEST[Vitest]
        ESLINT[ESLint v9]
        VITE[Vite 6]
        PW[Playwright]
    end

    DEV -->|types /command| CLI
    DEV -->|natural language| CLI
    CLI --> CTX
    CTX --> MATCH
    CLAUDE_MD --> CTX
    SETTINGS --> PERM

    MATCH -->|explicit /cmd| CMD
    MATCH -->|intent match| SKILL
    MATCH -->|referenced| AGENT

    CMD --> EXEC
    SKILL --> EXEC
    AGENT --> EXEC

    EXEC -->|allowed?| PERM
    PERM -->|yes| TURBO
    PERM -->|yes| YARN
    PERM -->|yes| VITEST
    PERM -->|yes| ESLINT
    PERM -->|yes| VITE
    PERM -->|yes| PW
```

## Component Details

### Project Context (`CLAUDE.md`)

The `CLAUDE.md` file at the repo root is the foundation of the framework. Claude reads it on startup and uses it throughout the session for:

- **Architecture knowledge**: Package structure, dependency graph, file conventions
- **Code conventions**: TypeScript settings, import patterns, testing frameworks
- **Common tasks**: Build, test, lint commands with correct flags
- **Gotchas**: Known issues and workarounds specific to this monorepo

**File**: `CLAUDE.md` (repo root)

### Permissions (`settings.json`)

The `.claude/settings.json` file controls what Claude can do automatically without asking for confirmation:

```json
{
  "permissions": {
    "allow": ["Bash(yarn build*)", "Bash(yarn test*)", "Bash(git status*)"],
    "deny": ["Bash(git push --force*)", "Bash(rm -rf /)*"]
  }
}
```

**File**: `.claude/settings.json`

**Design principle**: Allow safe, reversible operations. Deny destructive or irreversible ones.

### Slash Commands

Commands map user-typed invocations to structured prompts:

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant CC as Claude Code
    participant CMD as Command File
    participant Shell as Shell

    Dev->>CC: /test e2e
    CC->>CMD: Read .claude/commands/test.md
    CMD-->>CC: Expanded prompt with $ARGUMENTS="e2e"
    CC->>Shell: nvm use && yarn test:e2e
    Shell-->>CC: Test results
    CC-->>Dev: Formatted test report
```

| Command        | File                              | Arguments                    |
| -------------- | --------------------------------- | ---------------------------- |
| `/build`       | `.claude/commands/build.md`       | None                         |
| `/test`        | `.claude/commands/test.md`        | `unit\|e2e\|perf\|size\|all` |
| `/lint`        | `.claude/commands/lint.md`        | `fix` (optional)             |
| `/new-package` | `.claude/commands/new-package.md` | `<package-name>`             |

### Skills

Skills are intent-triggered specialists. Claude matches user intent to skill descriptions and loads the full skill when a match is found:

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant CC as Claude Code
    participant IM as Intent Matcher
    participant SK as Skill File
    participant Tools as Allowed Tools

    Dev->>CC: "Review my recent changes"
    CC->>IM: Match intent to skills
    IM->>SK: Load .claude/skills/code-reviewer/SKILL.md
    SK-->>CC: Instructions + allowed-tools: [Read, Glob, Grep, Bash]
    CC->>Tools: Execute with restricted tool set
    Tools-->>CC: Results
    CC-->>Dev: Structured code review
```

| Skill                   | Triggers On                                 | Tools                                     |
| ----------------------- | ------------------------------------------- | ----------------------------------------- |
| `code-reviewer`         | "review code", "check my changes"           | Read, Glob, Grep, Bash, Task              |
| `test-writer`           | "write tests for", "add tests to"           | Read, Write, Edit, Glob, Grep, Bash, Task |
| `component-generator`   | "create a component", "scaffold component"  | Read, Write, Edit, Glob, Grep, Bash, Task |
| `perf-analyzer`         | "analyze performance", "check perf results" | Read, Glob, Grep, Bash, Task              |
| `ralph-tui-prd`         | "create a PRD", "plan this feature"         | Read, Write, Edit, Glob, Grep, Bash, Task |
| `ralph-tui-create-json` | "create prd.json", "convert to json"        | Read, Write, Edit, Glob, Grep, Bash, Task |

### Agent Templates

Agent templates define multi-phase workflows for complex tasks. They are not auto-triggered but are referenced explicitly:

```mermaid
graph LR
    subgraph "Agent: feature-implementer"
        P1[Phase 1<br/>Context Gathering]
        P2[Phase 2<br/>Planning]
        P3[Phase 3<br/>Implementation]
        P4[Phase 4<br/>Verification]
        P5[Phase 5<br/>Documentation]

        P1 --> P2 --> P3 --> P4 --> P5
    end

    subgraph "Tools Used Per Phase"
        T1[Read, Glob, Grep]
        T2[TodoWrite]
        T3[Write, Edit, Bash]
        T4[Bash: build, test, lint]
        T5[Edit: progress.md]
    end

    P1 -.-> T1
    P2 -.-> T2
    P3 -.-> T3
    P4 -.-> T4
    P5 -.-> T5
```

| Agent                 | Phases | Key Decision Rules                                       |
| --------------------- | ------ | -------------------------------------------------------- |
| `feature-implementer` | 5      | Fix implementation (not tests); follow codebase patterns |
| `migration-helper`    | 6      | Pre-migration baseline; incremental verification         |
| `pr-creator`          | 5      | Conventional commits; never force-push                   |

## Integration with Monorepo Toolchain

The framework integrates with the monorepo's existing toolchain rather than replacing it:

```mermaid
graph TB
    subgraph "Claude AI Framework"
        CMD[Commands]
        SKILL[Skills]
        AGENT[Agents]
    end

    subgraph "Task Orchestration"
        TURBO[Turborepo<br/>Cached parallel tasks]
        LERNA[Lerna<br/>Streaming/interactive]
    end

    subgraph "Quality Gates"
        BUILD[yarn build]
        TC[yarn typecheck]
        LINT[yarn lint]
        TEST[yarn test]
        E2E[yarn test:e2e]
        PERF[yarn test:perf]
        SIZE[yarn test:size]
    end

    subgraph "Packages"
        SVC[service/]
        WEB[web-app/]
        PKG[packages/express-app/]
    end

    CMD -->|/build| TURBO
    CMD -->|/test| TURBO
    CMD -->|/lint| LINT
    SKILL -->|code-reviewer| LINT
    SKILL -->|test-writer| TEST
    AGENT -->|feature-implementer| BUILD
    AGENT -->|feature-implementer| TC
    AGENT -->|feature-implementer| LINT
    AGENT -->|feature-implementer| TEST

    TURBO --> BUILD
    TURBO --> TC
    TURBO --> TEST

    BUILD --> SVC
    BUILD --> WEB
    BUILD --> PKG

    LERNA -->|yarn dev| SVC
    LERNA -->|yarn dev| WEB
```

### Key Integration Points

| Tool       | How the Framework Uses It                                                    |
| ---------- | ---------------------------------------------------------------------------- |
| Turborepo  | Commands and agents run `turbo run build\|test\|typecheck` for cached builds |
| Lerna      | Commands use `lerna run` for `dev` and `start` (streaming tasks)             |
| Vitest     | Test-writer skill generates Vitest tests; agents verify with `yarn test`     |
| ESLint v9  | Lint command runs `eslint` with flat config; code-reviewer checks compliance |
| Vite       | Component-generator skill understands Vite's build and dev server            |
| Playwright | Test command supports `yarn test:e2e`; agents verify E2E after changes       |
| Autocannon | Perf-analyzer skill reads autocannon results from `perf-results/`            |
| size-limit | Test command supports `yarn test:size`; agents check bundle size impact      |

## Data Flow: From User Request to Execution

```mermaid
flowchart LR
    A[User Request] --> B{Type?}
    B -->|/command| C[Load Command .md]
    B -->|Natural Language| D[Match Skill Description]
    B -->|"Use agent X"| E[Load Agent Template]

    C --> F[Replace $ARGUMENTS]
    D --> G[Load SKILL.md + Restrict Tools]
    E --> H[Follow Phased Workflow]

    F --> I[Execute Instructions]
    G --> I
    H --> I

    I --> J{Needs Shell?}
    J -->|Yes| K{Permitted?}
    J -->|No| L[Use Read/Write/Edit Tools]

    K -->|Allowed| M[Execute Command]
    K -->|Denied| N[Ask User Permission]

    M --> O[Return Results]
    L --> O
    N -->|Approved| M
    N -->|Denied| O

    O --> P[Format and Display to User]
```

## Directory Structure Summary

```
lerna-monorepo-sample/
├── CLAUDE.md                              # Project context (read on startup)
├── .claude/
│   ├── settings.json                      # Tool permissions
│   ├── commands/                          # User-invoked slash commands
│   │   ├── build.md
│   │   ├── test.md
│   │   ├── lint.md
│   │   └── new-package.md
│   ├── skills/                            # Intent-triggered skills
│   │   ├── code-reviewer/SKILL.md
│   │   ├── test-writer/SKILL.md
│   │   ├── component-generator/SKILL.md
│   │   ├── perf-analyzer/SKILL.md
│   │   ├── ralph-tui-prd/SKILL.md
│   │   └── ralph-tui-create-json/SKILL.md
│   └── agents/                            # Multi-phase workflow templates
│       ├── feature-implementer.md
│       ├── migration-helper.md
│       └── pr-creator.md
└── docs/ai-framework/                     # This documentation
    ├── getting-started.md
    ├── architecture.md
    ├── creating-skills.md
    ├── creating-commands.md
    ├── creating-agents.md
    └── best-practices.md
```
