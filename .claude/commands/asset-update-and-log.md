---
name: asset-update-and-log
description: Workflow command scaffold for asset-update-and-log in style-ai.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /asset-update-and-log

Use this workflow when working on **asset-update-and-log** in `style-ai`.

## Goal

Updating or adding new design/image assets and logging the change.

## Common Files

- `_bmad-output/E-Assets/**/*`
- `assets/images/*`
- `_bmad-output/_progress/00-design-log.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Add or update image assets in _bmad-output/E-Assets/ or assets/images/
- Log the update in _bmad-output/_progress/00-design-log.md

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.