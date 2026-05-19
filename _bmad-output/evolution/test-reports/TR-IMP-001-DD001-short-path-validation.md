# Test Report: IMP-001 DD-001 首次生成短链路减负

**Date:** 2026-05-19  
**Tester:** Codex / Freya Product Evolution  
**Branch:** `evolution/imp-001-dd001-short-path`  
**Build:** Local HTML prototype, served from `http://127.0.0.1:17872/`  
**Type:** WDS-8 Acceptance Test / Incremental Improvement Validation  
**Result:** PASS

---

## Summary

IMP-001 local prototype validation passed after one minor accessibility fix.

- Initial implementation check: 38/43 passed; 5 findings.
- Findings triage: 2 were test-selector mismatches for already-valid links; 3 were real touch-target issues.
- Fix applied in same branch: raised affected interactive controls to at least 44px on `01.2`, `01.3`, `01.6`, and `01.7`.
- Final retest: 26/26 passed.
- Issues remaining: 0.

Validated short path:

`01.1-start-login -> 01.2-home-dual-entry -> 01.3-photo-upload -> 01.6-generation-waiting -> 01.7-image-result`

`01.4-photo-quality-check` and `01.5-generation-setup` remain available as secondary/system reference views, but are not shown in the first happy path.

---

## Test Environment

- Local server: `node _bmad-output/P-Prototypes/01-xiaoyu-first-preview-Prototype/serve-prototype.mjs`
- Port: `17872`
- Browser surface: Codex in-app browser automation
- Viewports: `375x667`, `393x852`, `428x926`

Note: the existing script `_bmad-output/P-Prototypes/01-xiaoyu-first-preview-Prototype/testing/IMP-001/run-imp-001-short-path-acceptance.js` could not run in this checkout because the project does not currently install the `playwright` package. The prior implementation artifact from 2026-05-18 records 33/33 pass; this WDS-8 validation used browser automation directly and then retested after fixes.

---

## New Functionality

| Test | Result | Notes |
|---|---:|---|
| `HP-001` login entry can continue to home | PASS | `#start-login-primary-button` points to `01.2-home-dual-entry.html`. |
| `HP-002` home primary entry can continue to photo upload | PASS | `#home-dual-entry-primary-card` points to `01.3-photo-upload.html`. |
| `HP-003` `01.3` selected/pass routes directly to `01.6` | PASS | CTA href includes `01.6-generation-waiting.html?taskId=demo-generation-001&source=first_preview_auto_default`. |
| `HP-004` `01.6` success state routes to `01.7` | PASS | `查看生成结果` opens `01.7-image-result.html`. |

---

## Acceptance Criteria

| ID | Result | Evidence |
|---|---:|---|
| `AC-DD001-01` | PASS | Happy path from `01.3` reaches `01.6`, not standalone `01.4`. |
| `AC-DD001-02` | PASS | Happy path from `01.3` reaches `01.6`, not `01.5`. |
| `AC-DD001-03` | PASS | `01.3` selected/pass CTA routes to `01.6`. |
| `AC-DD001-04` | PASS | Warning state remains inline and can still continue to `01.6`. |
| `AC-DD001-05` | PASS | Fail state sets CTA `aria-disabled="true"` and shows `需要重新上传`. |
| `AC-DD001-06` | PASS | `01.6` includes default-direction note: `本轮不用先选风格`. |
| `AC-DD001-07` | PASS | `01.7` contains result viewer, judgment sentence, `换个方向`, and `保存`. |
| `AC-DD001-08` | PASS | Feedback reason panel is hidden before negative/uncertain reaction. |
| `AC-DD001-09` | PASS | Common profile prompt is hidden before save/trigger action. |
| `AC-DD001-10` | PASS | `换个方向` routes to Scenario 02 lightweight choice page. |
| `AC-DD001-11` | PASS | Scenario 03 try-on entry remains usable without saved common profile. |
| `AC-DD001-12` | PASS | No horizontal overflow at 375/393/428 px on `01.2`, `01.3`, `01.6`, and `01.7`. |

---

## Regression Testing

| Test | Result | Notes |
|---|---:|---|
| Login page remains intact | PASS | Invite/login entry and primary continue action are present. |
| Home keeps dual-entry structure | PASS | Primary personal generation and secondary try-on entry remain visible. |
| `01.7` save/profile boundary remains progressive | PASS | Profile prompt appears after save, not before. |
| `01.7` feedback reason panel remains trigger-based | PASS | Negative likeness feedback expands the panel. |
| Browser console | PASS | No console errors on final loaded validation page. |

---

## Accessibility

| Check | Result | Notes |
|---|---:|---|
| Visible interactive controls meet 44px minimum on `01.2` | PASS | Fixed top actions, credit snapshot, and prototype state controls. |
| Visible interactive controls meet 44px minimum on `01.3` | PASS | Fixed top actions, boundary toggle, reselect, and prototype state controls. |
| Visible interactive controls meet 44px minimum on `01.6` | PASS | Fixed icon buttons and prototype state controls. |
| Visible interactive controls meet 44px minimum on `01.7` | PASS | Fixed top actions, viewer shortcut, feedback controls, profile actions, and prototype state controls. |

---

## Issues Found

**Total:** 1 resolved issue, 0 open issues.

| ID | Severity | Status | Description | Resolution |
|---|---|---|---|---|
| `ISS-001` | Minor | Fixed | Several prototype controls were below the 44px touch-target minimum. | Updated affected buttons/links in `01.2`, `01.3`, `01.6`, and `01.7`; final retest passed. |

Non-product test notes:

- Initial `HP-001` and `HP-002` failures were caused by outdated validation selectors, not broken links. Retest used the implemented object IDs.
- Screenshot capture in the in-app browser timed out once; DOM, route, viewport, console, and touch-target validation remained executable.

---

## Production Risks Not Covered

This report approves the local HTML prototype for IMP-001. It does not validate native Expo or backend production behavior:

- Native camera/photo permissions on iOS and Android.
- Real photo-quality detection rules.
- Async generation task API and persistence.
- Real credit/quota reserve/deduct/refund behavior.
- Image storage and retention implementation.
- Feedback/save/profile API submission.

---

## Recommendation

APPROVED for WDS-8 local prototype acceptance.

Proceed to `[P] Deploy` for packaging/PR/handoff of the prototype update, or run BMad Architect walkthrough before production implementation planning.
