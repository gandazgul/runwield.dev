# RunWield.dev Domain Language

This glossary covers the public RunWield website and the product language it publishes for current visitors.

## Language

### Product

**RunWield**: A plan- and lifecycle-centered coding harness for developers who use AI on real codebases. It turns a rough idea into a collaborative Plan, deliberate execution, validation, and a durable Work Record. _Avoid_: pull-request review bot, autonomous vibe-coding tool.

**Coding Harness**: The product category for RunWield. A coding harness keeps human intent, agent work, review, and validation in one controlled workflow.

**AI Agent**: A software agent that can help make code changes. RunWield keeps agents aligned with the user, the Plan, and validation evidence.

**Engineering Control**: The ability for developers to keep intent, risk, review, and proof visible while agents make code changes.

### Workflow

**Rough Idea**: The starting point for RunWield work before the intent becomes specific enough for an agent to act.

**Plan**: The shared working surface where intent becomes specific enough for agents to act without guessing. A Plan supports annotation, redlining, attached context, execution choices, and approval.

**Deliberate Execution**: The work phase after an approved Plan. Agents execute the Plan instead of guessing from a loose prompt.

**Validation**: The proof step for completed work. Validation can include tests, types, lint, formatting, and project-specific checks.

**Work Record**: The durable record that follows validation. Work Records help future planning.

**Better Future Planning**: The result of feeding Work Records back into later work.

### Review Surfaces

**Plan Review**: The surface for reviewing a Plan. It lets the user annotate, redline, attach context, choose how the work should run, and approve the Plan.

**Code Review**: The guided surface for inspecting an exact code change. It shows the diff, changed files, inline annotations, Guided Review status, and approval action.

**Guided Review**: The review mode that gives cues for human review and keeps feedback and repair in the same workflow.

**Inline Annotation**: Feedback attached to a specific part of a Plan or code diff.

### Public Interfaces

**wld CLI**: The command-line interface for RunWield.

**TUI**: The terminal user interface for RunWield.

**Try It With Me**: The public website call to action for early users who want to try RunWield and give context about their agent workflow.

## Open Language Questions

- **Record vs. Work Record**: Some published copy says "Record" and some says "Work Record". Use "Work Record" for the durable artifact unless the visible text specifically says "Record".
