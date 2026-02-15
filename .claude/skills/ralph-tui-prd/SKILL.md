---
name: ralph-tui-prd
description: Generate a Product Requirements Document (PRD) for ralph-tui task orchestration. Creates PRDs with user stories that can be converted to beads issues or prd.json for automated execution. Triggers on: create a prd, write prd for, plan this feature, requirements for, spec out.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
---

# PRD Generator

Generate structured Product Requirements Documents (PRDs) compatible with ralph-tui automated execution. PRDs define user stories with acceptance criteria, priorities, and dependencies for AI-assisted development workflows.

## Trigger Conditions

Use this skill when:

- The user asks to "create a PRD", "write a PRD for", "plan this feature"
- The user asks for "requirements for", "spec out", "define user stories"
- The user wants to plan a multi-step development effort for AI agent execution
- The user wants to break down a large feature into implementable user stories

## Arguments

`$ARGUMENTS` should describe the project or feature to create a PRD for. Examples:

- "Create a PRD for adding authentication to the service"
- "Write a PRD for migrating from Express to Fastify"
- "Plan this feature: real-time notifications with WebSocket"

## Instructions

### 1. Gather Context

Before writing the PRD, understand the scope:

- Read relevant source files to understand existing architecture
- Check `CLAUDE.md` for project conventions and patterns
- Review `.ralph-tui/progress.md` for existing patterns and learnings
- Identify dependencies on existing packages and infrastructure

### 2. PRD Structure

Create a markdown PRD with this structure:

```markdown
# PRD: [Feature/Project Name]

## Overview

Brief description of what this PRD covers and why it's needed.

## Goals

- Primary goal 1
- Primary goal 2
- Non-goals (explicitly out of scope)

## Technical Context

- Current architecture relevant to this feature
- Key dependencies and constraints
- Reference to existing patterns in the codebase

## User Stories

### US-XXX: [Story Title]

**Description**: As a [role], I want [capability] so that [benefit].

**Priority**: [1-5, where 1 is highest]

**Dependencies**: [US-YYY, US-ZZZ] or none

**Acceptance Criteria**:

- [ ] Criterion 1 (specific, testable)
- [ ] Criterion 2
- [ ] yarn build passes
- [ ] yarn lint passes
- [ ] yarn test passes

**Notes**: Implementation hints, gotchas, or constraints

---

[Repeat for each user story]

## Execution Order

Suggested order for AI agent execution, respecting dependencies:

1. Phase 1 (parallel): US-XXX, US-YYY
2. Phase 2 (sequential): US-ZZZ (depends on Phase 1)
3. Phase 3 (parallel): US-AAA, US-BBB

## Risk Assessment

- Risk 1: [description] - Mitigation: [approach]
- Risk 2: [description] - Mitigation: [approach]
```

### 3. User Story Guidelines

Each user story should:

- **Be independently implementable** by an AI agent in a single session
- **Have clear acceptance criteria** that can be verified programmatically
- **Include quality gates**: `yarn build passes`, `yarn lint passes`, `yarn test passes`
- **Specify dependencies** on other stories (for execution ordering)
- **Be scoped to 1-3 hours** of AI agent work (break larger stories down)

### 4. Acceptance Criteria Best Practices

Write criteria that are:

- **Specific**: "Health endpoint returns `{ status: 'ok' }` JSON" not "Health endpoint works"
- **Testable**: Can be verified by running a command or checking a file
- **Complete**: Include both functional requirements and quality gates
- **Independent**: Each criterion tests one thing

Common quality gate criteria to always include:

```
- [ ] yarn build passes
- [ ] yarn lint passes
- [ ] yarn test passes
```

For features that touch CI:

```
- [ ] yarn typecheck passes
- [ ] All existing tests continue to pass
```

### 5. Dependency Graph Rules

- Stories with no dependencies can run in parallel
- Use `dependsOn` to specify blocking dependencies
- Group independent stories into execution phases
- Minimize sequential chains to maximize parallelism
- Infrastructure/tooling stories should come before feature stories

### 6. Priority Scale

| Priority | Meaning                             |
| -------- | ----------------------------------- |
| 1        | Critical - blocks other work        |
| 2        | High - core functionality           |
| 3        | Medium - important but not blocking |
| 4        | Low - nice to have, can be deferred |
| 5        | Optional - only if time permits     |

### 7. Output

After generating the PRD:

1. Save the markdown PRD to `tasks/prd.md` (human-readable version)
2. Inform the user they can convert to JSON using the `ralph-tui-create-json` skill
3. Suggest reviewing the dependency graph for parallelism opportunities
4. Highlight any risks or assumptions that need user validation

### 8. Monorepo-Specific Patterns

When creating PRDs for this monorepo, consider:

- **Package boundaries**: Stories should align with package boundaries (service, web-app, express-app)
- **Build order**: express-app must build before service (workspace dependency)
- **Test isolation**: Unit tests, E2E tests, perf tests, and bundle size checks are separate concerns
- **Shared config**: Changes to root config files (eslint.config.mjs, tsconfig.base.json) affect all packages
- **CI pipeline**: Stories that change CI workflows should be tested with `act` or manual workflow dispatch
