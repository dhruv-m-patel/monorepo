# Getting Started with the Claude AI Framework

This guide introduces the Claude AI development framework built into this monorepo. It covers the framework's purpose, components, and how to get up and running quickly.

## What Is This Framework?

This monorepo includes a set of Claude Code extensions that accelerate development by providing:

- **Skills** - Auto-triggered capabilities that activate based on your intent (e.g., "review my code", "write tests for this")
- **Slash Commands** - Explicit commands you type to run common tasks (e.g., `/build`, `/test`, `/lint`)
- **Agent Templates** - Structured multi-phase workflow documents that guide AI agents through complex tasks (e.g., implementing a feature, creating a PR)
- **Project Context** - A `CLAUDE.md` file and `.claude/settings.json` that configure Claude's understanding of this specific codebase

## Prerequisites

- [Claude Code CLI](https://docs.claude.com/en/docs/claude-code) installed and authenticated
- Node.js >= 22 (use `nvm use` from the repo root)
- Yarn 3.2.3+ (configured in `packageManager` field)

## Quick Start

### 1. Set up the project

```bash
nvm use
yarn install
yarn build
```

### 2. Open Claude Code in the repo

```bash
claude
```

Claude automatically reads `CLAUDE.md` at the repo root and `.claude/settings.json` for project context and permissions.

### 3. Try a slash command

```
/build
/test
/lint
```

### 4. Trigger a skill

Skills activate automatically based on intent. Try:

- "Review my recent changes" (triggers the **code-reviewer** skill)
- "Write tests for `service/src/routes/message.ts`" (triggers the **test-writer** skill)
- "Create a Button component" (triggers the **component-generator** skill)
- "Analyze performance results" (triggers the **perf-analyzer** skill)

### 5. Reference an agent template

Agent templates are not auto-triggered. They serve as structured playbooks:

- "Implement US-005 using the feature-implementer workflow"
- "Help me upgrade React using the migration-helper template"
- "Create a PR using the pr-creator template"

## Framework File Layout

```
.claude/
├── settings.json                         # Permissions (allow/deny lists)
├── commands/                             # Slash commands
│   ├── build.md                          # /build
│   ├── test.md                           # /test [unit|e2e|perf|size|all]
│   ├── lint.md                           # /lint [fix]
│   └── new-package.md                    # /new-package <name>
├── skills/                               # Auto-triggered skills
│   ├── code-reviewer/SKILL.md            # Code review against monorepo conventions
│   ├── test-writer/SKILL.md              # Vitest test generation
│   ├── component-generator/SKILL.md      # React component scaffolding
│   ├── perf-analyzer/SKILL.md            # Performance result analysis
│   ├── ralph-tui-prd/SKILL.md            # PRD document generation
│   └── ralph-tui-create-json/SKILL.md    # PRD to JSON conversion
└── agents/                               # Agent workflow templates
    ├── feature-implementer.md            # End-to-end feature implementation
    ├── migration-helper.md               # Package upgrade workflows
    └── pr-creator.md                     # Structured PR creation

CLAUDE.md                                 # Root project context document
```

## How the Pieces Fit Together

1. **CLAUDE.md** provides project-wide context (architecture, conventions, gotchas) that Claude reads on startup
2. **Settings** (`settings.json`) control which shell commands Claude can run automatically
3. **Slash commands** handle routine tasks (build, test, lint, scaffold)
4. **Skills** provide domain-specific intelligence (code review, test writing, component generation)
5. **Agent templates** orchestrate multi-step workflows by combining skills, commands, and manual steps

See [Architecture](./architecture.md) for a detailed diagram of how these components interact.

## Next Steps

| Guide                                       | When to Read It                            |
| ------------------------------------------- | ------------------------------------------ |
| [Creating Skills](./creating-skills.md)     | You want to add a new auto-triggered skill |
| [Creating Commands](./creating-commands.md) | You want to add a new `/command`           |
| [Creating Agents](./creating-agents.md)     | You want to define a multi-phase workflow  |
| [Architecture](./architecture.md)           | You want to understand the full system     |
| [Best Practices](./best-practices.md)       | You want patterns, anti-patterns, and tips |
