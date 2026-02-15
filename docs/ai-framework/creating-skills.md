# Creating Skills

Skills are Claude Code's auto-triggered capabilities. When a user's intent matches a skill's description, Claude automatically loads the skill's instructions and follows them. This guide walks through creating a new skill from scratch.

## How Skills Work

1. Claude reads the `description` field in the skill's YAML frontmatter
2. When a user message matches that description, Claude loads the skill's full instructions
3. The skill's `allowed-tools` restrict which tools Claude can use while executing the skill
4. Claude follows the skill's instructions to complete the task

Skills live in `.claude/skills/<name>/SKILL.md`. The directory name is the skill identifier.

## Skill File Structure

```
.claude/skills/<skill-name>/
└── SKILL.md
```

Every `SKILL.md` requires:

1. **YAML frontmatter** with `name`, `description`, and `allowed-tools`
2. **Trigger conditions** explaining when the skill should activate
3. **Detailed instructions** for Claude to follow
4. **Output format** defining what the skill produces

## Step-by-Step: Create a New Skill

### Step 1: Create the Directory

```bash
mkdir -p .claude/skills/my-new-skill
```

### Step 2: Write the SKILL.md

```markdown
---
name: my-new-skill
description: Short description of what this skill does and when it triggers. Include key phrases users might say.
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
---

# My New Skill

Brief one-line description.

## Trigger Conditions

Use this skill when:

- The user asks to "do X", "perform Y"
- The user mentions keywords related to this skill's domain

## Instructions

### 1. First Step

Describe what Claude should do first.

### 2. Second Step

Describe the next action.

## Critical Rules

- ALWAYS do X
- NEVER do Y

## Output Format

Describe the expected output structure.
```

### Step 3: Format and Verify

```bash
yarn prettier:format
yarn lint
```

Prettier processes Markdown files during `yarn lint`, so always format after creating skill files.

## YAML Frontmatter Reference

| Field                      | Required | Description                                                              |
| -------------------------- | -------- | ------------------------------------------------------------------------ |
| `name`                     | Yes      | Unique skill identifier (lowercase, hyphens)                             |
| `description`              | Yes      | Intent-matching text - Claude uses this to decide when to load the skill |
| `allowed-tools`            | No       | List of tools the skill can use (defaults to all if omitted)             |
| `disable-model-invocation` | No       | Set `true` to prevent auto-triggering (manual-only via skill invocation) |
| `user-invocable`           | No       | Whether users can invoke the skill directly                              |
| `context`                  | No       | Additional context files to load with the skill                          |

## Available Tools

When defining `allowed-tools`, choose from:

| Tool    | Purpose                | Use When                                 |
| ------- | ---------------------- | ---------------------------------------- |
| `Read`  | Read file contents     | Almost always needed                     |
| `Write` | Create new files       | Skill generates new files                |
| `Edit`  | Modify existing files  | Skill modifies existing code             |
| `Glob`  | Find files by pattern  | Skill needs to discover files            |
| `Grep`  | Search file contents   | Skill needs to find code patterns        |
| `Bash`  | Execute shell commands | Skill runs builds, tests, git commands   |
| `Task`  | Delegate to sub-agents | Skill needs to parallelize or specialize |

**Security principle**: Grant the minimum tools needed. A read-only skill (like `code-reviewer`) should not have `Write` or `Edit`.

## Worked Example: Creating a Dependency Auditor Skill

This example creates a skill that audits dependencies for security vulnerabilities and outdated packages.

### File: `.claude/skills/dependency-auditor/SKILL.md`

```markdown
---
name: dependency-auditor
description: Audits monorepo dependencies for security vulnerabilities, outdated packages, and license compliance. Triggers on: audit dependencies, check vulnerabilities, outdated packages, dependency health.
allowed-tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Task
---

# Dependency Auditor

Audit all workspace packages for security vulnerabilities, outdated
dependencies, and license compliance issues.

## Trigger Conditions

Use this skill when:

- The user asks to "audit dependencies", "check for vulnerabilities"
- The user asks about "outdated packages" or "dependency health"
- The user wants to know if dependencies have known security issues

## Instructions

### 1. Run Security Audit

Execute the Yarn audit command across all workspaces:

\`\`\`bash
nvm use && yarn npm audit --all --recursive
\`\`\`

### 2. Check for Outdated Packages

For each workspace, check outdated dependencies:

\`\`\`bash
yarn outdated
\`\`\`

### 3. Analyze Results

For each vulnerability found:

- Severity (critical, high, moderate, low)
- Affected package and version
- Which workspace(s) use it
- Whether a fix is available

### 4. Check License Compliance

Read package.json files and verify all dependencies use compatible
licenses (MIT, ISC, Apache-2.0, BSD).

## Critical Rules

- NEVER automatically update packages - only report findings
- ALWAYS check all 3 workspaces: service, web-app, express-app
- ALWAYS include the fix command if one is available

## Output Format

\`\`\`

## Dependency Audit Report

### Security Vulnerabilities

| Severity | Package | Version | Fix Available | Workspaces |
| -------- | ------- | ------- | ------------- | ---------- |

### Outdated Packages

| Package | Current | Latest | Type | Workspaces |
| ------- | ------- | ------ | ---- | ---------- |

### License Issues

| Package | License | Issue |
| ------- | ------- | ----- |

### Recommendations

1. [Priority] Action item with command to run
   \`\`\`
```

## Existing Skills in This Repo

For reference, here are the skills already implemented:

| Skill                   | File                                            | Purpose                                   |
| ----------------------- | ----------------------------------------------- | ----------------------------------------- |
| `code-reviewer`         | `.claude/skills/code-reviewer/SKILL.md`         | Reviews code against monorepo conventions |
| `test-writer`           | `.claude/skills/test-writer/SKILL.md`           | Generates Vitest tests per package        |
| `component-generator`   | `.claude/skills/component-generator/SKILL.md`   | Scaffolds React components in web-app     |
| `perf-analyzer`         | `.claude/skills/perf-analyzer/SKILL.md`         | Analyzes autocannon performance results   |
| `ralph-tui-prd`         | `.claude/skills/ralph-tui-prd/SKILL.md`         | Generates Product Requirements Documents  |
| `ralph-tui-create-json` | `.claude/skills/ralph-tui-create-json/SKILL.md` | Converts markdown PRDs to JSON format     |

Study these files for patterns and conventions used in this repo.

## Testing Your Skill

After creating a skill:

1. **Format**: Run `yarn prettier:format` to ensure consistent formatting
2. **Lint**: Run `yarn lint` to verify no formatting issues
3. **Functional test**: Open Claude Code and type a message that matches your skill's trigger conditions
4. **Verify tool restrictions**: Confirm the skill only uses the tools listed in `allowed-tools`

## Tips

- Write the `description` field with the phrases users are likely to say - this is how Claude matches intent
- Include "Trigger Conditions" bullet points to make activation criteria explicit
- Add a "Critical Rules" section for non-negotiable constraints
- Define the "Output Format" so the skill produces consistent, predictable results
- Use `allowed-tools` to enforce least-privilege access
