---
name: prototype-scenario-development
description: Workflow command scaffold for prototype-scenario-development in style-ai.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /prototype-scenario-development

Use this workflow when working on **prototype-scenario-development** in `style-ai`.

## Goal

Developing or updating a user scenario prototype, including UX scenario markdowns, prototype HTML/screens, test scripts, and work YAMLs.

## Common Files

- `_bmad-output/C-UX-Scenarios/*/*.md`
- `_bmad-output/P-Prototypes/*-Prototype/*.html`
- `_bmad-output/P-Prototypes/*-Prototype/work/*.yaml`
- `_bmad-output/P-Prototypes/*-Prototype/testing/*`
- `_bmad-output/P-Prototypes/*-Prototype/Logical-View-Map.md`
- `_bmad-output/P-Prototypes/*-Prototype/PROTOTYPE-ROADMAP.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or add UX scenario markdown in _bmad-output/C-UX-Scenarios/[scenario]/[step].md
- Update or create corresponding prototype HTML and assets in _bmad-output/P-Prototypes/[scenario]-Prototype/[step].html and related files
- Update or add work YAMLs in _bmad-output/P-Prototypes/[scenario]-Prototype/work/[step]-Work.yaml
- Update or add test scripts/results in _bmad-output/P-Prototypes/[scenario]-Prototype/testing/[test-folder]/
- Update Logical-View-Map.md and/or PROTOTYPE-ROADMAP.md as needed

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.