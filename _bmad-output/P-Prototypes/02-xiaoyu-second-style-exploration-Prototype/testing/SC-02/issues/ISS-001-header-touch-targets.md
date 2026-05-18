# Issue: Header Navigation Touch Targets Are Below 44px

**ID:** ISS-001  
**Severity:** Medium  
**Status:** Closed  
**Delivery:** Scenario 02 local prototype  
**Test:** SC-02, Check: A11Y-003 Touch Targets  
**Created:** 2026-05-18  
**Assigned:** Prototype developer

## Description

The top header navigation controls on all Scenario 02 prototype pages measure 40 x 40 px. The WDS acceptance testing guide uses a 44 x 44 px minimum for touch targets.

## Expected

Back and home controls should have a touch target of at least 44 x 44 px while preserving the current compact mobile header layout.

## Actual

Initial measurement at 375, 393, and 428 px mobile widths:

- `02.1-second-style-exploration.html`: back control 40 x 40, home control 40 x 40.
- `02.2-save-result.html`: back control 40 x 40, home control 40 x 40.
- `02.3-save-profile-prompt.html`: back control 40 x 40, home control 40 x 40.

Retest after fix:

- `02.1-second-style-exploration.html`: back control 44 x 44, home control 44 x 44.
- `02.2-save-result.html`: back control 44 x 44, home control 44 x 44.
- `02.3-save-profile-prompt.html`: back control 44 x 44, home control 44 x 44.

## Impact

This is an accessibility and mobile ergonomics issue. It does not block the happy path, but it misses the acceptance threshold for reliable touch operation.

## Design Reference

- Acceptance guide: `.agents/skills/wds-5-agentic-development/data/testing-guide.md`, Accessibility / Touch Target Testing.
- Scenario 02 prototype roadmap: `_bmad-output/P-Prototypes/02-xiaoyu-second-style-exploration-Prototype/PROTOTYPE-ROADMAP.md`, Device Testing.

## Steps to Reproduce

1. Serve the prototype with `PORT=17868 node serve-prototype.mjs`.
2. Open any Scenario 02 page at 375, 393, or 428 px width.
3. Measure the top-left back control and top-right home control.
4. Observe that each control is 40 x 40 px.

## Screenshot/Video

- `../screenshots/02.1-second-style-exploration-393.png`
- `../screenshots/02.2-save-result-393.png`
- `../screenshots/02.3-save-profile-prompt-393.png`

## Resolution

Fixed by changing the repeated header navigation controls from `h-10 w-10` to `h-11 w-11` in all three Scenario 02 HTML pages.

**Verified:** 2026-05-18  
**Verifier:** Codex / WDS Acceptance Testing

## Related Issues

- None.

---

**Priority for fix:** Resolved
