# Scenario 02 Acceptance Testing Notes

**Date:** 2026-05-18  
**Tester:** Codex / WDS Phase 5 Acceptance Testing  
**Scope:** Local HTML prototype for `02-xiaoyu-second-style-exploration`, pages `02.1` through `02.3`  
**Environment:** `http://127.0.0.1:17868` served by `serve-prototype.mjs`  
**Device coverage:** Mobile viewport simulation at 375 x 667, 393 x 852, and 428 x 926

## Materials Reviewed

- Scenario spec: `_bmad-output/C-UX-Scenarios/02-xiaoyu-second-style-exploration/02-xiaoyu-second-style-exploration.md`
- Page specs:
  - `_bmad-output/C-UX-Scenarios/02-xiaoyu-second-style-exploration/02.1-second-style-exploration/02.1-second-style-exploration.md`
  - `_bmad-output/C-UX-Scenarios/02-xiaoyu-second-style-exploration/02.2-save-result/02.2-save-result.md`
  - `_bmad-output/C-UX-Scenarios/02-xiaoyu-second-style-exploration/02.3-save-profile-prompt/02.3-save-profile-prompt.md`
- Prototype roadmap: `_bmad-output/P-Prototypes/02-xiaoyu-second-style-exploration-Prototype/PROTOTYPE-ROADMAP.md`
- Work files under `_bmad-output/P-Prototypes/02-xiaoyu-second-style-exploration-Prototype/work/`
- Stories under `_bmad-output/P-Prototypes/02-xiaoyu-second-style-exploration-Prototype/stories/`
- Design tokens: `_bmad-output/D-Design-System/design-tokens.md`

## Preparation Notes

- No dedicated `DD-002` or `TS-002` file exists in `deliveries/` or `test-scenarios/`.
- Acceptance criteria were derived from the Scenario 02 page specs, prototype roadmap, work files, and WDS Phase 5 acceptance testing guide.
- This is local prototype acceptance, not native Expo QA or production API validation.
- Screenshots were captured with Chrome headless at 393 x 852.
- Browser automation raw results are saved at `testing/SC-02/scenario-02-acceptance-results.json`.

## Raw Automation Notes

- The first broad automation run marked delayed `02.1 -> 02.2` navigation as failed because the prototype intentionally waits before routing. A focused retest waited for the route delay and passed.
- The first broad automation run counted an outer `#app[data-save-target]` attribute in addition to the two real save choice buttons. The user-visible save choices are two buttons, as required.
- Decorative brand SVGs have empty `alt`, so image-alt automation flagged them. The content preview images have alt text and non-zero natural dimensions.
- `save-profile-state-feedback` is intentionally hidden in the default state and visible in feedback states.

