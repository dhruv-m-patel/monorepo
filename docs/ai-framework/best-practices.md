# Best Practices

Patterns, anti-patterns, and practical advice for extending the Claude AI framework in this monorepo.

## Patterns (Do This)

### 1. Principle of Least Privilege for Skills

Restrict each skill's `allowed-tools` to only what it needs:

```yaml
# Good: read-only skill for code review
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Task

# Bad: giving write access to a review-only skill
allowed-tools:
  - Read
  - Write # unnecessary - reviewer shouldn't modify code
  - Edit # unnecessary
  - Glob
  - Grep
  - Bash
```

**Reference**: `.claude/skills/code-reviewer/SKILL.md` uses only read-oriented tools, while `.claude/skills/component-generator/SKILL.md` includes `Write` and `Edit` because it creates files.

### 2. Include Error Recovery in Commands

Commands should anticipate failures and tell Claude how to diagnose them:

```markdown
## Instructions

Run the build:

\`\`\`bash
nvm use && yarn build
\`\`\`

If the build fails:

- Check the error output for the failing package
- Common issues:
  - TypeScript type errors
  - Missing `.js` extensions in imports (nodenext)
  - Missing dependencies
- Report which packages built successfully and which failed
```

**Reference**: `.claude/commands/build.md` includes failure diagnostics for each package.

### 3. Use Decision Rules in Agent Templates

Codify the heuristics an agent should use when encountering ambiguity:

```markdown
## Decision Rules

- When unsure about a pattern: check existing code first
- When a test fails: fix the implementation, not the test
- When a lint rule triggers: follow the rule; only disable if documented
- When build fails: check turbo.json dependency graph
```

**Reference**: `.claude/agents/feature-implementer.md` defines 6 decision rules covering common edge cases.

### 4. Reference Real Files, Not Hypotheticals

Documentation and skill instructions should point to actual files in the repo:

```markdown
# Good

See `packages/express-app/src/middleware/healthCheck.ts` for the health
check middleware implementation.

# Bad

See the health check middleware implementation (hypothetical example).
```

### 5. Phase Boundaries with Verification

Agent workflows should verify at phase boundaries before proceeding:

```markdown
### Phase 3: Implementation

...make changes...

### Phase 4: Verification

Run all quality checks:
\`\`\`bash
yarn build && yarn typecheck && yarn lint && yarn test
\`\`\`

If any check fails:

1. Read the error output
2. Fix the issue
3. Re-run the failing check
4. Continue only when all checks pass
```

**Reference**: All three agent templates (`.claude/agents/*.md`) include a verification phase.

### 6. Consistent Output Formats

Define structured output formats so results are predictable and parseable:

```markdown
## Output Format

\`\`\`

## Code Review Summary

**Files reviewed**: <count>
**Issues found**: <count critical> critical, <count warning> warnings

### Critical Issues

- \`file.ts:42\` - Description

### Warnings

- \`file.ts:15\` - Description
  \`\`\`
```

**Reference**: `.claude/skills/code-reviewer/SKILL.md` and `.claude/skills/perf-analyzer/SKILL.md` both define detailed output templates.

### 7. Self-Documenting Commands

Start every command file with a comment-style header that explains what it does:

```markdown
# /command-name - Short description

Brief explanation of purpose.

## Usage

...

## What this does

1. Step one
2. Step two
```

**Reference**: All four commands in `.claude/commands/` follow this pattern.

### 8. Always Include `nvm use`

Per project convention, shell commands should start with `nvm use` to ensure the correct Node.js version:

```markdown
\`\`\`bash
nvm use && yarn build
\`\`\`
```

This is especially important because the project requires Node.js >= 22 and uses features not available in older versions.

## Anti-Patterns (Avoid This)

### 1. Overly Broad Skill Descriptions

```yaml
# Bad: too vague, will match too many user messages
description: Helps with code

# Good: specific intent phrases that avoid false matches
description: Reviews code changes for monorepo best practices, TypeScript conventions, testing patterns, and common gotchas specific to this Yarn 3 + Turborepo monorepo.
```

A vague description causes the skill to activate when not intended, leading to unexpected behavior.

### 2. Skipping Formatting After File Creation

```bash
# Bad: create a skill and forget to format
touch .claude/skills/my-skill/SKILL.md
# ... write content ...
# Ship it! (yarn lint will fail)

# Good: always format after creating markdown files
touch .claude/skills/my-skill/SKILL.md
# ... write content ...
yarn prettier:format
yarn lint
```

Prettier processes Markdown files during `yarn lint`. Unformatted markdown (inconsistent table alignment, line wrapping) causes CI failures.

### 3. Combining Agent Concerns

```markdown
# Bad: one agent that does everything

# Agent Template: Do Everything Agent

Implements features, reviews code, creates PRs, and deploys.

# Good: focused agents composed as needed

# Agent Template: Feature Implementer (implement code)

# Agent Template: PR Creator (create the PR)

# (Use feature-implementer, then pr-creator)
```

Single-responsibility agents are easier to test, debug, and compose.

### 4. Hard-Coding Values in Skills

```markdown
# Bad: hard-coded port number

Run the server on port 4000

# Good: reference the standard config

Start the service using `yarn workspace service run dev` (runs on the
port configured in the service's environment)
```

### 5. Missing Constraints in Agents

```markdown
# Bad: no guardrails

## Workflow

### Phase 1: Make changes

Make whatever changes are needed.

# Good: explicit constraints

## Constraints

- Do NOT modify stories other than the target story
- Do NOT skip quality checks
- Do NOT commit changes (handled by external orchestration)
- ALWAYS update progress.md before signaling completion
```

**Reference**: `.claude/agents/feature-implementer.md` lists 5 explicit constraints.

### 6. Duplicating CLAUDE.md Content in Skills

```markdown
# Bad: repeating project conventions in every skill

## TypeScript Rules

- Use nodenext module resolution
- Use .js extensions on imports
- Use strict mode
  (Copy-pasted from CLAUDE.md)

# Good: reference CLAUDE.md

Follow the TypeScript conventions documented in `CLAUDE.md`. Key points
for this skill:

- Use `.js` extensions for imports in `service/` and `packages/`
```

Claude already has `CLAUDE.md` loaded. Skills should reference it rather than duplicating it. Only include the specific conventions relevant to the skill's domain.

### 7. Ignoring Package-Specific Conventions

```markdown
# Bad: one-size-fits-all test instructions

Write tests using Jest with jsdom.

# Good: package-aware instructions

| Package      | Environment | Test Library     | Import Extensions |
| ------------ | ----------- | ---------------- | ----------------- |
| service/     | node        | supertest        | .js (nodenext)    |
| web-app/     | jsdom       | @testing-library | none (bundler)    |
| express-app/ | node        | supertest        | .js (nodenext)    |
```

**Reference**: `.claude/skills/test-writer/SKILL.md` includes a table mapping each package to its test conventions.

## Naming Conventions

| Component       | Naming Style      | Example                                 |
| --------------- | ----------------- | --------------------------------------- |
| Skill directory | `kebab-case`      | `.claude/skills/code-reviewer/`         |
| Skill file      | Always `SKILL.md` | `SKILL.md`                              |
| Command file    | `kebab-case.md`   | `.claude/commands/new-package.md`       |
| Agent file      | `kebab-case.md`   | `.claude/agents/feature-implementer.md` |
| Skill name      | `kebab-case`      | `code-reviewer`                         |

## Checklist: Before Submitting a New Framework Component

- [ ] File is in the correct directory (`.claude/commands/`, `.claude/skills/<name>/`, or `.claude/agents/`)
- [ ] YAML frontmatter is valid (skills only) with `name`, `description`, and `allowed-tools`
- [ ] Instructions reference actual files in the repo, not hypothetical examples
- [ ] Error handling is documented ("If X fails, do Y")
- [ ] `yarn prettier:format` has been run
- [ ] `yarn lint` passes
- [ ] Manually tested by invoking the command/skill/agent in Claude Code
- [ ] Output format is defined and consistent
- [ ] Existing components in the same category were reviewed for convention alignment

## Evolving the Framework

When the monorepo's toolchain changes (e.g., upgrading Vitest, adding a new package), update the framework components accordingly:

1. **CLAUDE.md**: Update project conventions, architecture, and gotchas
2. **Skills**: Update instructions that reference changed tools or APIs
3. **Commands**: Update shell commands and error handling for new tool versions
4. **Agents**: Update verification phases and decision rules
5. **This documentation**: Keep the architecture diagram and examples current

Record all changes in `.ralph-tui/progress.md` under the "Codebase Patterns" section for future reference.
