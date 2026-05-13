# Component Catalog

**Project:** style-ai  
**Version:** 0.1.0  
**Last Updated:** 2026-05-13  
**Catalog Status:** Initial catalog generated from current design-system files and DD-001 page specifications.

## Summary

| Category | Approved | Candidate | Notes |
|----------|----------|-----------|-------|
| Brand | 1 | 0 | App icon, symbol, mono mark, wordmark lockup |
| Navigation | 0 | 1 | App header candidate from DD-001 |
| Actions | 0 | 1 | Action card candidate from DD-001 |
| Forms / Inputs | 0 | 1 | Photo picker candidate from DD-001 |
| Feedback / Status | 0 | 4 | Trust note, credit panel, progress panel, feedback panel |
| Content / Results | 0 | 1 | Result image viewer candidate |

## Approved Components

### `icn-001` - Style AI App Icon System

| Field | Value |
|-------|-------|
| Type | Brand identity icon |
| Status | Approved |
| Source | `_bmad-output/D-Design-System/components/style-ai-app-icon-system.md` |
| Assets | `_bmad-output/E-Assets/brand-logo/` and `assets/images/` |
| Used In | App icon, splash screen, Android adaptive icon, favicon, launch/login, home header, result watermark, share image |

**Variants:**
- `app-icon-tile`
- `adaptive-foreground`
- `symbol-only`
- `mono-symbol`
- `wordmark-lockup`

**Key Rule:** The continuous white S silhouette is the primary identity. The purple spark is an accent only.

## Candidate Components From DD-001

These candidates are intentionally not promoted to approved components yet. They should be validated through the first prototype and extracted once repeated.

### `hdr-001` - Authenticated App Header

| Field | Value |
|-------|-------|
| First page | `01.2-home-dual-entry` |
| Purpose | Brand identity, credit balance, history and profile access |
| Likely variants | default, low-credit, no-history |
| Promotion signal | Reused on home, history, result and profile screens |

### `act-001` - Entry Action Card

| Field | Value |
|-------|-------|
| First page | `01.2-home-dual-entry` |
| Purpose | Represent high-value entry choices without a marketing landing page |
| Likely variants | primary, secondary, disabled/unavailable |
| Promotion signal | Reused for personal generation, try-on, and future saved-image prompts |

### `upl-001` - Photo Picker Panel

| Field | Value |
|-------|-------|
| First page | `01.3-photo-upload` |
| Purpose | Choose camera or album image with permission recovery |
| Likely variants | empty, selected, permission-denied, read-error |
| Promotion signal | Reused for personal photo and external reference image import |

### `inf-001` - Trust Boundary Note

| Field | Value |
|-------|-------|
| First pages | `01.1-start-login`, `01.3-photo-upload`, `01.6-generation-waiting` |
| Purpose | Explain login, photo, profile, history and credit boundaries before user anxiety spikes |
| Likely variants | privacy, quota, failure, profile-save |
| Promotion signal | Already appears conceptually in 3 DD-001 pages |

### `crd-001` - Credit Summary Panel

| Field | Value |
|-------|-------|
| First pages | `01.2-home-dual-entry`, `01.5-generation-setup`, `01.6-generation-waiting` |
| Purpose | Show available quota, expected cost and failure handling |
| Likely variants | normal, low-credit, insufficient, failure-not-charged |
| Promotion signal | Needed before generation and purchase surfaces |

### `prg-001` - Generation Progress Panel

| Field | Value |
|-------|-------|
| First page | `01.6-generation-waiting` |
| Purpose | Keep trust during async generation |
| Likely variants | queued, processing, finalizing, success, timeout, failed |
| Promotion signal | Reused for personal generation and try-on generation |

### `res-001` - Result Image Viewer

| Field | Value |
|-------|-------|
| First page | `01.7-image-result` |
| Purpose | Show generated personal image result without obscuring judgment |
| Likely variants | single image, carousel, partial result, history view |
| Promotion signal | Reused across result, history and share flows |

### `fbk-001` - Seed Feedback Panel

| Field | Value |
|-------|-------|
| First page | `01.7-image-result` |
| Purpose | Capture "looks like me", "useful for judgment" and specific issues |
| Likely variants | compact, expanded, submitted |
| Promotion signal | Reused across seed-test result pages |

## Token Coverage

| Token Area | Status | Notes |
|------------|--------|-------|
| Brand colors | Started | Approved for `icn-001` |
| Typography | Pending | Extract from DD-001 prototype |
| Spacing | Pending | Extract from DD-001 prototype |
| Radius | Pending | Current app uses ad hoc RN values |
| Shadow / elevation | Pending | Define only when cards need hierarchy |
| Motion | Pending | Define after generation waiting prototype |

## Next Design-System Action

Do not expand this catalog into a full library before DD-001 is prototyped. The next useful action is to implement or prototype the first vertical slice, then promote only repeated UI patterns into approved components.

