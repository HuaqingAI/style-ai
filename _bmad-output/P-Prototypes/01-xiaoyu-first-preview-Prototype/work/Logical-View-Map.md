# Logical View Map - DD-001 First Real Preview

**Project**: style-ai  
**Scenario**: 01-xiaoyu-first-preview  
**Prototype Folder**: `_bmad-output/P-Prototypes/01-xiaoyu-first-preview-Prototype/`  
**Device Compatibility**: Mobile-Only  
**Design Fidelity**: Design System Components  
**Confirmed By**: Sue  
**Confirmed Date**: 2026-05-13

---

## Mapping Decision

DD-001 contains seven scenario steps. Each step is a separate logical view because each has a distinct page purpose, layout structure, user context, and exit action. No step is documented as inheriting from another step, and no step is only an overlay or modal state of a previous view.

`01.1-start-login` includes both welcome and login content in one logical view. A standalone welcome/onboarding page is not part of DD-001.

---

## Logical Views

| Build Order | Scenario Step | Logical View | Prototype File | View Type | Notes |
|-------------|---------------|--------------|----------------|-----------|-------|
| 1 | `01.1-start-login` | Start / Login View | `01.1-start-login.html` | Full page | Brand trust, invite code, phone login, Google login, boundary note |
| 2 | `01.2-home-dual-entry` | Home Dual Entry View | `01.2-home-dual-entry.html` | Full page | Two product entry cards, quota snapshot, empty history prompt |
| 3 | `01.3-photo-upload` | Photo Upload View | `01.3-photo-upload.html` | Full page | Photo boundary note, camera/album actions, selected photo preview |
| 4 | `01.4-photo-quality-check` | Photo Quality Check View | `01.4-photo-quality-check.html` | Full page | Photo review, quality summary, checklist, recovery actions |
| 5 | `01.5-generation-setup` | Generation Setup View | `01.5-generation-setup.html` | Full page | Style direction selector, credit summary, start generation |
| 6 | `01.6-generation-waiting` | Generation Waiting View | `01.6-generation-waiting.html` | Full page with async states | Queued, generating, finalizing, success, timeout, failed |
| 7 | `01.7-image-result` | Image Result View | `01.7-image-result.html` | Full page | Result viewer, fit summary, next actions, common profile prompt, feedback panel |

---

## Reuse Notes

Potential reusable patterns should stay prototype-local until validated:

- Brand identity header from `icn-001`
- Trust / boundary note
- Mobile top bar
- Primary action button
- Credit / quota summary
- Photo preview card
- Status / progress panel
- Action group

Do not promote these into `_bmad-output/D-Design-System/` until the first vertical slice reveals stable requirements.

---

## State Notes

| Logical View | Important States |
|--------------|------------------|
| Start / Login View | Default, loading, error, success |
| Home Dual Entry View | First-time, returning, low credit, feature unavailable |
| Photo Upload View | Empty, permission denied, selected, upload error |
| Photo Quality Check View | Checking, pass, warning, fail, check unavailable |
| Generation Setup View | Default, no credit, submitting, submit error |
| Generation Waiting View | Queued, generating, finalizing, success, timeout, failed |
| Image Result View | Default, partial result, load error, feedback submitted |

---

## Build Order

Build in scenario order:

1. `01.1-start-login`
2. `01.2-home-dual-entry`
3. `01.3-photo-upload`
4. `01.4-photo-quality-check`
5. `01.5-generation-setup`
6. `01.6-generation-waiting`
7. `01.7-image-result`

The first implementation target is `01.1-start-login`.

---

## Source Specifications

- `_bmad-output/C-UX-Scenarios/01-xiaoyu-first-preview/01.1-start-login/01.1-start-login.md`
- `_bmad-output/C-UX-Scenarios/01-xiaoyu-first-preview/01.2-home-dual-entry/01.2-home-dual-entry.md`
- `_bmad-output/C-UX-Scenarios/01-xiaoyu-first-preview/01.3-photo-upload/01.3-photo-upload.md`
- `_bmad-output/C-UX-Scenarios/01-xiaoyu-first-preview/01.4-photo-quality-check/01.4-photo-quality-check.md`
- `_bmad-output/C-UX-Scenarios/01-xiaoyu-first-preview/01.5-generation-setup/01.5-generation-setup.md`
- `_bmad-output/C-UX-Scenarios/01-xiaoyu-first-preview/01.6-generation-waiting/01.6-generation-waiting.md`
- `_bmad-output/C-UX-Scenarios/01-xiaoyu-first-preview/01.7-image-result/01.7-image-result.md`

---

**Status**: Confirmed  
**Next Step**: Step 3 - Logical View Breakdown
