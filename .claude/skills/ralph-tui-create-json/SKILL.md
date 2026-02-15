---
name: ralph-tui-create-json
description: Convert PRDs to prd.json format for ralph-tui execution. Creates JSON task files with user stories, acceptance criteria, and dependencies. Triggers on: create prd.json, convert to json, ralph json, create json tasks.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
---

# PRD to JSON Converter

Convert a Product Requirements Document (PRD) into the `prd.json` format used by ralph-tui for automated task orchestration and AI agent execution.

## Trigger Conditions

Use this skill when:

- The user asks to "create prd.json", "convert to json", "ralph json"
- The user asks to "create json tasks" from an existing PRD
- The user wants to prepare a PRD for ralph-tui automated execution
- After generating a PRD with the `ralph-tui-prd` skill

## Arguments

`$ARGUMENTS` can be:

- A path to an existing PRD markdown file (e.g., `tasks/prd.md`)
- Empty (will look for `tasks/prd.md` by default)
- A brief description to generate both PRD and JSON in one step

## Instructions

### 1. Locate the PRD Source

Find the PRD to convert:

```bash
# Check for existing PRD files
ls tasks/prd.md tasks/prd.json 2>/dev/null
```

If no PRD exists, inform the user to create one first using the `ralph-tui-prd` skill.

### 2. JSON Schema

The `prd.json` file follows this schema:

```json
{
  "name": "Project or Feature Name",
  "description": "Brief description of the overall goal",
  "branchName": "ralph/feature-name",
  "userStories": [
    {
      "id": "US-001",
      "title": "Story title",
      "description": "As a [role], I want [capability] so that [benefit].",
      "acceptanceCriteria": [
        "Specific testable criterion 1",
        "Specific testable criterion 2",
        "yarn build passes",
        "yarn lint passes",
        "yarn test passes"
      ],
      "priority": 1,
      "passes": false,
      "notes": "Implementation hints, phase info, constraints",
      "dependsOn": []
    },
    {
      "id": "US-002",
      "title": "Second story title",
      "description": "As a [role], I want [capability] so that [benefit].",
      "acceptanceCriteria": [
        "Criterion 1",
        "Criterion 2",
        "yarn build passes",
        "yarn lint passes",
        "yarn test passes"
      ],
      "priority": 2,
      "passes": false,
      "notes": "Phase 2 - depends on US-001",
      "dependsOn": ["US-001"]
    }
  ]
}
```

### 3. Field Specifications

| Field                              | Type     | Required | Description                                                   |
| ---------------------------------- | -------- | -------- | ------------------------------------------------------------- |
| `name`                             | string   | Yes      | Project/feature name                                          |
| `description`                      | string   | Yes      | Brief overall description                                     |
| `branchName`                       | string   | Yes      | Git branch for this work (e.g., `ralph/feature-name`)         |
| `userStories`                      | array    | Yes      | Array of user story objects                                   |
| `userStories[].id`                 | string   | Yes      | Unique story ID (format: `US-XXX`)                            |
| `userStories[].title`              | string   | Yes      | Short descriptive title                                       |
| `userStories[].description`        | string   | Yes      | Full user story description                                   |
| `userStories[].acceptanceCriteria` | string[] | Yes      | Array of testable criteria                                    |
| `userStories[].priority`           | number   | Yes      | 1 (highest) to 5 (lowest)                                     |
| `userStories[].passes`             | boolean  | Yes      | Whether this story is complete (set to `false` initially)     |
| `userStories[].notes`              | string   | No       | Implementation hints, phase info, prerequisites               |
| `userStories[].dependsOn`          | string[] | Yes      | Array of story IDs this depends on (empty if no dependencies) |

### 4. Conversion Rules

When converting from markdown PRD to JSON:

1. **Extract metadata**: Project name, description from PRD header
2. **Generate branch name**: Kebab-case from project name, prefixed with `ralph/`
3. **Parse user stories**: Extract ID, title, description, criteria, priority, dependencies
4. **Normalize criteria**: Ensure each criterion is a single string (no markdown checkboxes)
5. **Set `passes: false`**: All stories start as incomplete
6. **Validate dependencies**: Ensure all `dependsOn` references exist as story IDs
7. **Order by priority**: Stories should be ordered by priority (1 first), then by ID

### 5. Quality Checks

Before saving, validate:

- [ ] All story IDs are unique
- [ ] All `dependsOn` references point to valid story IDs
- [ ] No circular dependencies in the dependency graph
- [ ] Every story has at least one acceptance criterion
- [ ] Quality gate criteria (`yarn build/lint/test passes`) are included in every story
- [ ] JSON is valid and well-formatted

### 6. Dependency Graph Validation

```
For each story S:
  For each dependency D in S.dependsOn:
    - D must be a valid story ID
    - D must have a lower or equal priority number
    - There must be no path from D back to S (no cycles)
```

### 7. Output

Save the JSON to `tasks/prd.json`:

```bash
# The file should be valid JSON
cat tasks/prd.json | python3 -m json.tool > /dev/null
```

After generating:

1. Report the number of user stories created
2. Show the dependency graph as a text diagram
3. Identify which stories can run in parallel (no mutual dependencies)
4. Estimate total execution phases needed

### 8. Example Dependency Graph Output

```
Phase 1 (parallel): US-001, US-002
  |
Phase 2 (parallel): US-003 (needs US-001), US-004 (needs US-001)
  |
Phase 3 (sequential): US-005 (needs US-003, US-004)
```

### 9. Updating Existing prd.json

If `tasks/prd.json` already exists:

- Read the existing file
- Preserve `passes: true` for completed stories
- Add new stories with unique IDs (continue the numbering)
- Update existing stories if criteria have changed
- Never reset a completed story's `passes` flag without explicit user confirmation
