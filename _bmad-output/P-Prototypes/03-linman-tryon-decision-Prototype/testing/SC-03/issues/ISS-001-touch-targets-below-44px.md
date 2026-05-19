# Issue: Scenario 03 touch targets below 44 x 44 px

**ID:** ISS-001  
**Severity:** Medium  
**Status:** Closed  
**Delivery:** SC-03  
**Test:** SC-03, Check: A11Y touch targets  
**Created:** 2026-05-18  
**Assigned:** Prototype implementation

## Description

Several interactive controls across Scenario 03 are smaller than the 44 x 44 px mobile touch target minimum used by the WDS acceptance test.

## Expected

All visible interactive controls should provide at least a 44 x 44 px hit area on mobile viewports.

## Actual

Automated testing at 393 px width found sub-44 px controls on all Scenario 03 pages:

- `03.1`: header back button is 40 x 40 px.
- `03.2`: header back button is 40 x 40 px; prototype state controls are 82 x 34 px.
- `03.3`: header back button is 40 x 40 px; inline change/photo controls, intent controls, and prototype state controls are below 44 px high.
- `03.4`: header back/help controls are 40 x 40 px; prototype state controls are 34 px high.
- `03.5`: header controls are 40 x 40 px; small inline links/buttons and judgment/state controls are below 44 px high.
- `03.6`: header controls are 40 x 40 px; prototype state controls are 35 px high.
- `03.7`: header controls are 40 x 40 px; prototype state controls are 40 px high.

## Impact

This does not block the functional happy path, but it fails accessibility acceptance and increases tap error risk on mobile devices.

## Design Reference

- WDS acceptance testing accessibility criterion: touch targets should be minimum 44 x 44 px.
- Scenario specs: `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/`
- Prototype files: `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/*.html`

## Steps to Reproduce

1. Open any Scenario 03 HTML page at mobile width 393 px.
2. Measure visible interactive elements.
3. Compare element width and height to the 44 x 44 px minimum.

## Screenshot/Video

Reference screenshots are in `../screenshots/`.

## Recommendation

Increase hit areas without changing the visual hierarchy:

- Set header icon controls to `min-width: 44px; min-height: 44px`.
- Set reviewer/prototype state controls to at least `min-height: 44px`.
- For compact inline text links such as "更换", wrap them in a 44 px high tappable container.
- Retest at 375, 393, and 428 px widths.

## Resolution

Fixed on 2026-05-18 by increasing Scenario 03 hit areas:

- Header icon controls now use 44 x 44 px sizing.
- Reviewer/prototype state controls now use at least 44 px height.
- Compact inline controls such as "更换", "换图", detail toggle, judgment buttons, and recovery actions now expose at least 44 px hit areas.
- Retest passed: `scenario-03-acceptance-results.json` reports 133/133 checks passing.

## Related Issues

- Similar issue exists in Scenario 02 acceptance: `SC-02/issues/ISS-001-header-touch-targets.md`.

---

**Priority for fix:** This release
