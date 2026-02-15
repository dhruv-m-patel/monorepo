# Agent Template: PR Creator

Creates well-structured pull requests from completed work, with comprehensive descriptions, test plans, and change summaries.

## Purpose

Analyze completed work on a branch and create a polished GitHub pull request with a structured description, change summary, test plan, and relevant context for reviewers.

## Inputs

| Input        | Source                 | Description                                              |
| ------------ | ---------------------- | -------------------------------------------------------- |
| `baseBranch` | Default: `master`      | Target branch for the PR                                 |
| `title`      | User or auto-generated | PR title (auto-generated from commits if not provided)   |
| `storyIds`   | User (optional)        | User story IDs from `tasks/prd.json` included in this PR |
| `draft`      | Default: `false`       | Whether to create as a draft PR                          |

## Expected Outputs

| Output              | Description                            |
| ------------------- | -------------------------------------- |
| GitHub Pull Request | Created PR with structured description |
| PR URL              | URL to the created pull request        |

## Workflow

### Phase 1: Analyze Changes

1. **Get branch info**:

```bash
# Current branch name
git branch --show-current

# Commits since diverging from base
git log master..HEAD --oneline

# Full diff stats
git diff master..HEAD --stat

# Detailed diff
git diff master..HEAD
```

2. **Categorize changes** by type:

   - New features (new files, new exports)
   - Bug fixes (changed behavior in existing code)
   - Refactoring (restructured code, no behavior change)
   - Configuration (build, lint, CI changes)
   - Documentation (CLAUDE.md, comments, READMEs)
   - Testing (new tests, test infrastructure)
   - Dependencies (package.json, yarn.lock changes)

3. **Identify affected packages**:

   - `service/` - Express API service
   - `web-app/` - React SPA
   - `packages/express-app/` - Shared Express utility package
   - Root config files

4. **Read user stories** (if `storyIds` provided):

```bash
cat tasks/prd.json | python3 -c "
import json, sys
prd = json.load(sys.stdin)
for s in prd['userStories']:
    if s['id'] in sys.argv[1:]:
        print(f\"- {s['id']}: {s['title']}\")
" US-001 US-002
```

### Phase 2: Generate PR Description

Structure the PR body using this template:

```markdown
## Summary

[1-3 bullet points describing the overall change]

## Changes

### [Category 1: e.g., New Features]

- Description of change 1 (`file.ts`)
- Description of change 2 (`other-file.ts`)

### [Category 2: e.g., Configuration]

- Description of config change (`turbo.json`)

## User Stories

- US-XXX: Story title - [Completed/Partial]
- US-YYY: Story title - [Completed/Partial]

## Test Plan

- [ ] `yarn build` passes
- [ ] `yarn typecheck` passes
- [ ] `yarn lint` passes
- [ ] `yarn test` passes (XX tests across N packages)
- [ ] `yarn test:e2e` passes (if E2E-relevant changes)
- [ ] `yarn test:perf` passes (if service changes)
- [ ] `yarn test:size` passes (if web-app changes)
- [ ] Manual verification: [specific items to check manually]

## Breaking Changes

[List any breaking changes, or "None"]

## Screenshots

[For UI changes, describe what to look for in Storybook or the running app]

## Notes for Reviewers

[Any context that helps reviewers, such as:]

- Key design decisions and alternatives considered
- Areas that need extra scrutiny
- Known limitations or follow-up work needed
```

### Phase 3: Pre-PR Checks

Before creating the PR, verify:

1. **All quality checks pass**:

```bash
nvm use
yarn build && yarn typecheck && yarn lint && yarn test
```

2. **Branch is up to date with base**:

```bash
git fetch origin master
git log HEAD..origin/master --oneline
# If behind, inform user to rebase
```

3. **No untracked files** that should be committed:

```bash
git status
```

4. **No sensitive files** in the diff:

```bash
# Check for env files, credentials, tokens
git diff master..HEAD --name-only | grep -iE '\.env|credential|secret|token|key'
```

### Phase 4: Create the PR

1. **Push branch** if not already pushed:

```bash
git push -u origin $(git branch --show-current)
```

2. **Create PR** using GitHub CLI:

```bash
gh pr create \
  --title "PR title here" \
  --body "$(cat <<'EOF'
## Summary
...full PR body...

Generated with [Claude Code](https://claude.com/claude-code)
EOF
)" \
  --base master
```

3. **Add labels** if applicable:

```bash
gh pr edit <number> --add-label "enhancement,testing"
```

4. **Report the PR URL** to the user

### Phase 5: Post-Creation

1. Report the PR URL
2. Summarize the key changes for the user
3. Suggest reviewers based on the files changed
4. Note any follow-up work or TODOs

## Tool Usage

| Tool      | Usage                                                |
| --------- | ---------------------------------------------------- |
| Read      | Read source files, PRD, progress log for context     |
| Glob      | Find files to include in change summary              |
| Grep      | Search for patterns in changed files                 |
| Bash      | Git commands, gh CLI for PR creation, quality checks |
| Task      | Delegate exploration of changes across packages      |
| TodoWrite | Track PR creation progress                           |

## PR Title Conventions

Follow conventional commit style for PR titles:

| Prefix      | Usage                                      |
| ----------- | ------------------------------------------ |
| `feat:`     | New feature or capability                  |
| `fix:`      | Bug fix                                    |
| `refactor:` | Code restructuring without behavior change |
| `chore:`    | Build, CI, dependency updates              |
| `docs:`     | Documentation changes                      |
| `test:`     | Test additions or modifications            |
| `perf:`     | Performance improvements                   |

Examples:

- `feat: add dark mode toggle with Tailwind CSS v4`
- `chore: upgrade TypeScript to 5.7 and migrate tsconfigs`
- `test: add Playwright E2E tests for home page and API`

## Decision Rules

- **Single story PR**: Title from story title, full acceptance criteria in test plan
- **Multi-story PR**: Summary title, list stories in description, combined test plan
- **Draft PR**: Use `--draft` flag for work-in-progress or early review requests
- **Large PR**: Add "Notes for Reviewers" section highlighting key files to review first
- **Breaking changes**: Always include a "Breaking Changes" section, even if empty ("None")

## Constraints

- Never force-push to the PR branch
- Never include sensitive data (env vars, tokens, credentials) in the PR description
- Always run quality checks before creating the PR
- Always use a HEREDOC for the PR body to preserve formatting
- Always include a test plan, even for documentation-only changes
- Always report the PR URL back to the user
