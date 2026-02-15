# Creating Slash Commands

Slash commands are explicit, user-invoked actions. When a user types `/command-name` in Claude Code, the command's markdown file expands into a prompt that Claude executes. This guide explains how to create new commands.

## How Commands Work

1. User types `/command-name` (optionally with arguments)
2. Claude Code looks for `.claude/commands/command-name.md`
3. The file's contents expand into a prompt, with `$ARGUMENTS` replaced by any text after the command name
4. Claude follows the expanded prompt

Commands live as markdown files in `.claude/commands/`. The filename (without `.md`) is the command name.

## Command File Structure

```
.claude/commands/
├── build.md          # /build
├── test.md           # /test [unit|e2e|perf|size|all]
├── lint.md           # /lint [fix]
└── new-package.md    # /new-package <name>
```

Each file is a plain Markdown document (no YAML frontmatter required, unlike skills).

## Step-by-Step: Create a New Command

### Step 1: Create the Markdown File

```bash
touch .claude/commands/my-command.md
```

### Step 2: Write the Command

```markdown
# /my-command - Short description

Brief explanation of what this command does.

## Usage

\`\`\`
/my-command $ARGUMENTS
\`\`\`

## Instructions

Detailed steps for Claude to follow when this command is invoked.

1. First step
2. Second step
3. Report results
```

### Step 3: Format and Verify

```bash
yarn prettier:format
yarn lint
```

## The `$ARGUMENTS` Placeholder

The `$ARGUMENTS` placeholder captures everything the user types after the command name:

```
/my-command hello world
```

In this case, `$ARGUMENTS` becomes `hello world`.

Use it to make commands flexible:

```markdown
## Instructions

Based on the argument `$ARGUMENTS`:

- If "all": run everything
- If a specific package name: run only for that package
- If empty: use the default behavior
```

## Worked Example: Creating a `/deploy` Command

This example creates a command for previewing deployment readiness.

### File: `.claude/commands/deploy.md`

```markdown
# /deploy - Check deployment readiness

Verify that the project is ready for deployment by running all quality
gates and producing a deployment checklist.

## Usage

\`\`\`
/deploy # Full deployment check
/deploy quick # Skip E2E and perf tests
\`\`\`

## What this does

1. Runs `nvm use` to ensure correct Node.js version
2. Builds all packages
3. Runs typecheck, lint, and tests
4. Checks bundle size
5. Produces a deployment readiness report

## Instructions

Based on the argument provided (default: full check):

**Full check** (default):

\`\`\`bash
nvm use && yarn build && yarn typecheck && yarn lint && yarn test && yarn test:e2e && yarn test:perf && yarn test:size
\`\`\`

**Quick check** (`quick` argument):

\`\`\`bash
nvm use && yarn build && yarn typecheck && yarn lint && yarn test && yarn test:size
\`\`\`

After running all checks, produce a deployment readiness report:

\`\`\`

## Deployment Readiness Report

| Check       | Status            | Details            |
| ----------- | ----------------- | ------------------ |
| Build       | PASS/FAIL         | ...                |
| Typecheck   | PASS/FAIL         | ...                |
| Lint        | PASS/FAIL         | ...                |
| Unit Tests  | PASS/FAIL         | X tests passed     |
| E2E Tests   | PASS/FAIL/SKIPPED | ...                |
| Perf Tests  | PASS/FAIL/SKIPPED | ...                |
| Bundle Size | PASS/FAIL         | X kB (limit: Y kB) |

**Ready to deploy**: Yes / No
\`\`\`

If any check fails, report the failure details and suggest fixes.
```

## Existing Commands in This Repo

| Command        | File                              | Purpose                                |
| -------------- | --------------------------------- | -------------------------------------- |
| `/build`       | `.claude/commands/build.md`       | Build all packages via Turborepo       |
| `/test`        | `.claude/commands/test.md`        | Run tests (unit, e2e, perf, size, all) |
| `/lint`        | `.claude/commands/lint.md`        | Lint + typecheck, optional auto-fix    |
| `/new-package` | `.claude/commands/new-package.md` | Scaffold a new workspace package       |

Review these files for the conventions used in this repo.

## Commands vs. Skills: When to Use Which

| Characteristic        | Slash Command             | Skill                                |
| --------------------- | ------------------------- | ------------------------------------ |
| **Invocation**        | Explicit: `/command-name` | Implicit: intent matching            |
| **User knows name**   | Yes, they type it         | No, Claude decides when to use it    |
| **Arguments**         | Via `$ARGUMENTS`          | Extracted from user message          |
| **Frontmatter**       | None required             | YAML with name, description, tools   |
| **Tool restrictions** | None (uses all tools)     | Via `allowed-tools` in frontmatter   |
| **Best for**          | Routine, repeatable tasks | Domain expertise, contextual actions |

**Rule of thumb**: If users will type it frequently and it always does the same thing, make it a command. If it requires judgment and activates contextually, make it a skill.

## Tips

- Start the file with `# /command-name - description` for self-documentation
- Include a `## Usage` section showing invocation patterns with `$ARGUMENTS`
- Add a `## What this does` section listing the numbered steps at a high level
- Put detailed execution logic in `## Instructions`
- Add error handling guidance ("If the build fails...") so Claude can self-recover
- Always include `nvm use` before any Yarn/Node commands (per project convention)
- Format with `yarn prettier:format` after creation to pass lint checks
