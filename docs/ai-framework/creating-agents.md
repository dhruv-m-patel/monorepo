# Creating Agent Templates

Agent templates are structured workflow documents that guide AI agents through complex, multi-phase tasks. Unlike skills (auto-triggered) or commands (user-invoked), agent templates serve as reference playbooks that an AI agent follows when executing a complex task.

## How Agent Templates Work

1. A user (or orchestration system like ralph-tui) asks Claude to perform a complex task
2. The user references the agent template: "Use the feature-implementer workflow"
3. Claude reads the template from `.claude/agents/`
4. Claude follows the phased workflow, using the specified tools at each phase
5. Claude applies the decision rules when encountering choices or issues

Agent templates are markdown files in `.claude/agents/`. They are **not** auto-triggered by intent like skills. They must be explicitly referenced.

## Agent Template Structure

Every agent template should include these sections:

```
# Agent Template: <Name>

<One-line purpose>

## Purpose
Why this template exists and what it accomplishes.

## Inputs
Table of inputs the agent needs to start.

## Expected Outputs
Table of outputs the agent produces.

## Workflow
Phased steps (Phase 1, 2, 3...) with detailed instructions.

## Tool Usage
Table mapping tools to their usage in this workflow.

## Decision Rules
Heuristics for handling common situations.

## Constraints
Hard rules the agent must never violate.
```

## Step-by-Step: Create a New Agent Template

### Step 1: Create the File

```bash
touch .claude/agents/my-agent.md
```

### Step 2: Define Purpose and I/O

Start with a clear purpose statement and define what the agent needs (inputs) and what it produces (outputs):

```markdown
# Agent Template: My Agent

Does X by following a structured Y-phase workflow.

## Purpose

Describe the specific problem this agent solves and why a structured
workflow is needed (vs. ad-hoc instructions).

## Inputs

| Input        | Source          | Description                |
| ------------ | --------------- | -------------------------- |
| `inputName`  | User or system  | What this input represents |
| `configPath` | Default: `path` | Path to configuration      |

## Expected Outputs

| Output        | Description                           |
| ------------- | ------------------------------------- |
| Code changes  | Source files modified to achieve goal |
| Documentation | Updated docs reflecting changes       |
```

### Step 3: Define the Phased Workflow

Break the workflow into sequential phases. Each phase should be self-contained and produce a clear outcome:

```markdown
## Workflow

### Phase 1: Context Gathering

1. Read relevant files
2. Understand current state
3. Identify what needs to change

### Phase 2: Planning

1. Break down the work into tasks
2. Order tasks by dependency
3. Create a todo list for tracking

### Phase 3: Implementation

For each task:

1. Make the change
2. Verify it works
3. Mark task complete

### Phase 4: Verification

Run all quality checks:
\`\`\`bash
nvm use
yarn build && yarn typecheck && yarn lint && yarn test
\`\`\`

### Phase 5: Documentation

1. Update relevant docs
2. Record learnings
```

### Step 4: Add Tool Usage, Decision Rules, and Constraints

```markdown
## Tool Usage

| Tool      | Usage                          |
| --------- | ------------------------------ |
| Read      | Read source files, configs     |
| Write     | Create new files               |
| Edit      | Modify existing files          |
| Bash      | Run build, test, lint commands |
| TodoWrite | Track progress through phases  |

## Decision Rules

- When unsure about a pattern: check existing code first
- When a test fails: fix the implementation, not the test
- When a lint rule triggers: follow the rule unless documented exception

## Constraints

- Do NOT skip quality checks
- Do NOT modify unrelated files
- ALWAYS verify all checks pass before completing
```

### Step 5: Format and Verify

```bash
yarn prettier:format
yarn lint
```

## Worked Example: Creating a Refactoring Agent

This example creates an agent template for safely refactoring modules across the monorepo.

### File: `.claude/agents/refactoring-agent.md`

```markdown
# Agent Template: Refactoring Agent

Safely refactors code across the monorepo with full test coverage
verification at each step.

## Purpose

Execute large-scale refactoring operations (rename, extract, move,
restructure) across multiple packages while maintaining all quality
gates. The phased approach ensures no step breaks the build, and
every change is verified before moving to the next.

## Inputs

| Input         | Source           | Description                                         |
| ------------- | ---------------- | --------------------------------------------------- |
| `description` | User             | What to refactor and why                            |
| `scope`       | User             | Affected packages: `all`, `service`, `web-app`, etc |
| `dryRun`      | Default: `false` | Preview changes without applying them               |

## Expected Outputs

| Output              | Description                                |
| ------------------- | ------------------------------------------ |
| Refactored code     | Source files with the refactoring applied  |
| Updated tests       | Tests updated to match new code structure  |
| Updated imports     | All import paths corrected across packages |
| Verification report | Confirmation that all quality gates pass   |

## Workflow

### Phase 1: Impact Analysis

1. **Identify targets**: Find all files affected by the refactoring

\`\`\`bash

# Example: find all usages of a function

grep -r "functionName" --include="_.ts" --include="_.tsx" .
\`\`\`

2. **Map dependencies**: Understand which packages import the target
3. **Assess risk**: Categorize files as high/medium/low risk
4. **Create task list**: One task per file or logical group

### Phase 2: Pre-Refactoring Baseline

1. Run all quality checks to confirm a green baseline:

\`\`\`bash
nvm use
yarn build && yarn typecheck && yarn lint && yarn test
\`\`\`

2. Record test count and any existing warnings

### Phase 3: Execute Refactoring (Incremental)

For each task, in dependency order:

1. **Apply the change** to the current file/module
2. **Update imports** in all files that reference the changed module
3. **Update tests** to match the new structure
4. **Verify**: Run `yarn typecheck` after each file group
5. **Mark task complete** in the todo list

Important ordering rules:

- Refactor shared packages (`packages/`) before consumers (`service/`)
- Update type definitions before implementations
- Update source before tests

### Phase 4: Full Verification

Run the complete quality suite:

\`\`\`bash
yarn build && yarn typecheck && yarn lint && yarn test
\`\`\`

If any check fails:

1. Identify the failing file and error
2. Fix the issue
3. Re-run the failing check
4. Only proceed when green

### Phase 5: Summary

Report:

- Files changed (count and list)
- Packages affected
- Test results (before vs. after)
- Any manual follow-up needed

## Tool Usage

| Tool      | Usage                                            |
| --------- | ------------------------------------------------ |
| Read      | Read source files, understand current structure  |
| Edit      | Apply refactoring changes (preferred over Write) |
| Glob      | Find files matching patterns                     |
| Grep      | Search for references to the refactoring target  |
| Bash      | Run typecheck, build, test after each phase      |
| Task      | Delegate exploration of large file sets          |
| TodoWrite | Track progress through each file/module          |

## Decision Rules

- **Rename vs. alias**: Prefer clean rename; add re-exports only if
  the module is published externally
- **When a test fails**: The refactoring likely missed an import or
  reference - fix the refactoring, don't weaken the test
- **When typecheck passes but tests fail**: Runtime behavior changed
  unexpectedly - review the actual code change
- **When scope is unclear**: Start narrow (single package) and expand

## Constraints

- Never combine refactoring with feature changes in the same session
- Always verify after each file group, not just at the end
- Preserve all existing test coverage (no deleting tests)
- Keep import paths consistent with package conventions:
  - `.js` extensions in `service/` and `packages/` (nodenext)
  - Extensionless in `web-app/` (bundler resolution)
  - `@/` alias in `web-app/` imports
```

## Existing Agent Templates in This Repo

| Agent                 | File                                    | Purpose                           |
| --------------------- | --------------------------------------- | --------------------------------- |
| `feature-implementer` | `.claude/agents/feature-implementer.md` | Implement a user story end-to-end |
| `migration-helper`    | `.claude/agents/migration-helper.md`    | Package upgrades and migrations   |
| `pr-creator`          | `.claude/agents/pr-creator.md`          | Create structured GitHub PRs      |

Study these files for the patterns and conventions used in this repo.

## Agents vs. Skills vs. Commands

| Characteristic      | Agent Template               | Skill                    | Command             |
| ------------------- | ---------------------------- | ------------------------ | ------------------- |
| **Invocation**      | Referenced by name           | Auto-triggered by intent | Typed as `/command` |
| **Complexity**      | Multi-phase workflows        | Single-task expertise    | Single action       |
| **Duration**        | Minutes to hours             | Seconds to minutes       | Seconds             |
| **State tracking**  | Uses TodoWrite for phases    | Typically stateless      | Stateless           |
| **Decision making** | Explicit decision rules      | Domain heuristics        | Minimal             |
| **Best for**        | Complex, multi-step projects | Domain-specific tasks    | Routine operations  |

**Rule of thumb**: If the task takes more than 5 steps and involves decision-making, create an agent template. If it is a single domain task, make it a skill. If it is a simple repeatable action, make it a command.

## Tips

- **Phase boundaries matter**: Each phase should produce a verifiable outcome before the next begins
- **Include a "Pre-X Baseline"** phase for any destructive or risky workflow to ensure you can detect regressions
- **Decision Rules are critical**: These encode the heuristics that prevent an AI agent from making poor choices under ambiguity
- **Constraints are guardrails**: List everything the agent must never do (skip tests, modify unrelated files, force-push)
- **Tool Usage tables** help scope what each phase needs and serve as documentation for reviewers
- Format with `yarn prettier:format` after creation to pass lint checks
