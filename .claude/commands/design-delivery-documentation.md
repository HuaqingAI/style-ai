---
name: design-delivery-documentation
description: Workflow command scaffold for design-delivery-documentation in style-ai.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /design-delivery-documentation

Use this workflow when working on **design-delivery-documentation** in `style-ai`.

## Goal

Packaging and documenting a delivery milestone, including updating delivery YAMLs, handoff logs, and test scenario files.

## Common Files

- `deliveries/DD-*-handoff-log.md`
- `deliveries/DD-*.yaml`
- `test-scenarios/TS-*.yaml`
- `_bmad-output/C-UX-Scenarios/*/*.md`
- `_bmad-output/_progress/00-design-log.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Add or update delivery YAML in deliveries/DD-XXX-*.yaml
- Add or update handoff log in deliveries/DD-XXX-handoff-log.md
- Add or update test scenario YAML in test-scenarios/TS-XXX-*.yaml
- Update related UX scenario markdowns in _bmad-output/C-UX-Scenarios/
- Log progress in _bmad-output/_progress/00-design-log.md

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.