# Scenario 04 Logical View Map

**Scenario**: 04-xiaoyu-seed-feedback  
**Created**: 2026-05-18  
**Source Spec**: `_bmad-output/C-UX-Scenarios/04-xiaoyu-seed-feedback/04.1-result-quick-feedback-panel/04.1-result-quick-feedback-panel.md`

---

## Logical Views

| Logical View | Scenario Step | Type | Build Order | Notes |
|--------------|---------------|------|-------------|-------|
| Result Quick Feedback Panel | 04.1 | In-result page section | 1 | Standalone result context plus inline expandable feedback panel |

---

## State Coverage

| State | Purpose |
|-------|---------|
| `default` | Feedback entry is visible beside result judgment, panel collapsed |
| `open` | Feedback panel is expanded for lightweight selections |
| `validation-error` | Submit attempted without any signal |
| `submitting` | Simulated feedback submission |
| `submitted` | Feedback accepted and user returns to result context |
| `tryon-context` | Same panel with try-on-specific quick issue tags |

---

## Build Order

1. Build `04.1-result-quick-feedback-panel.html`.
2. Verify required object IDs and state transitions.
3. Capture mobile screenshot at 393px.
4. Mark Scenario 04 prototype as built pending Sue qualitative review.

---

## Integration Notes

- This prototype is self-contained so it can be reviewed independently from Scenario 01 and Scenario 03.
- Production should mount the panel inside existing result pages rather than route to a separate screen.
- The dynamic tags should come from result metadata: personal image results and try-on results use different quick issue sets.
