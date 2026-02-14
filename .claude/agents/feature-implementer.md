# Agent Template: Feature Implementer

Takes a user story from a PRD and implements it end-to-end, including code changes, tests, and quality verification.

## Purpose

Autonomously implement a single user story from a PRD (`tasks/prd.json`). The agent reads the story's acceptance criteria, plans the implementation, writes code, adds tests, and verifies all quality gates pass.

## Inputs

| Input          | Source                            | Description                                     |
| -------------- | --------------------------------- | ----------------------------------------------- |
| `storyId`      | User or ralph-tui                 | The user story ID to implement (e.g., `US-005`) |
| `prdPath`      | Default: `tasks/prd.json`         | Path to the PRD JSON file                       |
| `progressPath` | Default: `.ralph-tui/progress.md` | Path to the progress log for context            |

## Expected Outputs

| Output               | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| Code changes         | Source files modified/created to satisfy acceptance criteria |
| Test files           | New or updated tests covering the implementation             |
| Updated progress log | Entry appended to `.ralph-tui/progress.md` with learnings    |
| Quality verification | Confirmation that build, lint, and test pass                 |

## Workflow

### Phase 1: Context Gathering

1. **Read the PRD**: Parse `tasks/prd.json` to extract the target user story
2. **Read progress log**: Check `.ralph-tui/progress.md` for:
   - Codebase patterns (top section) - critical conventions to follow
   - Previous story implementations - avoid repeating mistakes
   - Learnings from related stories
3. **Read CLAUDE.md**: Understand project conventions, architecture, and gotchas
4. **Check dependencies**: Verify all `dependsOn` stories are marked `passes: true`
5. **Explore relevant code**: Use Glob/Grep to find files related to the story's domain

### Phase 2: Planning

1. **Break down acceptance criteria** into implementable tasks
2. **Identify files to modify**: Map each criterion to specific files
3. **Identify files to create**: New source files, test files, config changes
4. **Order tasks**: Dependencies between implementation steps
5. **Create a todo list**: Track progress through implementation

### Phase 3: Implementation

For each task in the plan:

1. **Implement the change**: Write code following project conventions
2. **Follow codebase patterns**:
   - Use `.js` extensions for imports in `service/` and `packages/` (nodenext)
   - Use `@/` path alias for imports in `web-app/` (bundler resolution)
   - Use explicit Vitest imports (`import { describe, it, expect } from 'vitest'`)
   - Follow shadcn/ui patterns for UI components (forwardRef, CVA, cn())
   - Use Tailwind CSS v4 `@theme {}` variables for styling
3. **Write tests**: Cover the implementation with appropriate tests
   - Node packages: Vitest with supertest for routes
   - Web-app: Vitest with @testing-library/react and userEvent.setup()
4. **Mark task complete**: Update todo list after each task

### Phase 4: Quality Verification

Run all quality checks in sequence:

```bash
nvm use
yarn build
yarn typecheck
yarn lint
yarn test
```

If any check fails:

1. Read the error output carefully
2. Fix the issue
3. Re-run the failing check
4. Continue to the next check only when the current one passes

### Phase 5: Documentation

1. **Append to progress log** (`.ralph-tui/progress.md`):

```markdown
## [Date] - US-XXX

- What was implemented
- Files changed
- **Learnings:**
  - Patterns discovered
  - Gotchas encountered

---
```

2. **Add reusable patterns** to the "Codebase Patterns" section at the top of progress.md if any new patterns were discovered

## Tool Usage

| Tool      | Usage                                                      |
| --------- | ---------------------------------------------------------- |
| Read      | Read source files, configs, PRD, progress log              |
| Write     | Create new source files, test files                        |
| Edit      | Modify existing source files, configs                      |
| Glob      | Find files by pattern (e.g., `**/*.test.ts`)               |
| Grep      | Search for code patterns, imports, references              |
| Bash      | Run build, test, lint commands; git operations             |
| Task      | Delegate sub-tasks (e.g., use test-writer skill for tests) |
| TodoWrite | Track implementation progress                              |

## Decision Rules

- **When unsure about a pattern**: Check existing implementations in the codebase first
- **When a test fails**: Fix the implementation, not the test (unless the test is wrong)
- **When a lint rule triggers**: Follow the rule; only disable with inline comment if truly necessary and document why
- **When build fails**: Check `turbo.json` dependency graph and build order
- **When adding dependencies**: Use `yarn workspace <name> add <package>` for workspace-specific deps
- **When modifying shared config**: Consider impact on all packages (eslint.config.mjs, tsconfig.base.json)

## Constraints

- Do NOT modify stories other than the target story
- Do NOT skip quality checks
- Do NOT commit changes (ralph-tui handles commits)
- Do NOT modify `.ralph-tui/session.json` or `.ralph-tui/session-meta.json`
- ALWAYS update progress.md before signaling completion
- ALWAYS follow existing codebase patterns from progress.md
