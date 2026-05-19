# Component Library Configuration

**Library:** Style AI Custom Design System  
**Version:** 0.1.0  
**Last Updated:** 2026-05-13  
**Mode:** Custom, Expo / React Native

## Scope

This design system is intentionally small. It currently contains approved brand foundations and records the component candidates that should be extracted from the first implemented MVP flow.

The app does not use shadcn, Radix, MUI, or a third-party native component kit. Implementation should follow existing Expo / React Native patterns in the repository and extract reusable primitives only when they appear in real screens.

## Installation

No separate package is installed yet.

```bash
pnpm install
pnpm start
```

## Source of Truth

| Area | Source |
|------|--------|
| Tokens | `_bmad-output/D-Design-System/design-tokens.md` |
| Components | `_bmad-output/D-Design-System/components/` |
| Brand assets | `_bmad-output/E-Assets/brand-logo/` |
| Expo production assets | `assets/images/` |
| Implementation styles | Existing React Native `StyleSheet` patterns until a token module is created |

## Approved Components

| WDS ID | Name | Status | File |
|--------|------|--------|------|
| `icn-001` | Style AI App Icon System | Approved | `_bmad-output/D-Design-System/components/style-ai-app-icon-system.md` |

## DD-001 Component Candidates

These are not yet approved design-system components. They should be implemented locally first, then extracted if the pattern repeats.

| Candidate ID | Name | First Used In | Extraction Trigger |
|--------------|------|---------------|--------------------|
| `hdr-001` | App Header with credit and history actions | `01.2-home-dual-entry` | Reused on 2+ authenticated screens |
| `act-001` | Primary / secondary action card | `01.2-home-dual-entry` | Reused for dual-entry and empty-state CTAs |
| `upl-001` | Photo picker panel | `01.3-photo-upload` | Reused for personal generation and try-on reference import |
| `inf-001` | Trust boundary note | `01.1`, `01.3`, `01.6` | Reused for privacy, quota, and failure rules |
| `crd-001` | Credit summary chip / panel | `01.2`, `01.5`, `01.6` | Reused in generation setup and billing surfaces |
| `prg-001` | Generation progress panel | `01.6-generation-waiting` | Reused for personal generation and try-on generation |
| `res-001` | Result image viewer | `01.7-image-result` | Reused across history, share, and result flows |
| `fbk-001` | Seed feedback panel | `01.7-image-result` | Reused on all seed-test result pages |

## Theme Configuration

The only approved tokens today are brand icon tokens. Product UI tokens should be extracted from DD-001 implementation after the first vertical slice is visible.

```yaml
colors:
  brand:
    icon-background: "#111111"
    icon-mark: "#FAFAF7"
    spark-light: "#9D7AFF"
    spark-core: "#6D3DF7"
    spark-deep: "#7B52FA"

layout:
  app-icon-source-size: 1024
  app-icon-safe-area: platform mask safe area

effects:
  app-icon-corner-radius: platform-applied
```

## Implementation Guidance

- Keep first implementation local to the relevant screens unless a pattern repeats.
- Do not create a large component library before DD-001 is prototyped.
- When a candidate repeats, promote it to `components/*.md` with variants, states, usage, accessibility and token references.
- Do not rely on the purple spark as a general AI icon; `icn-001` is a brand mark, not a generic action icon.

## Open Design-System Work

| Item | Reason | Timing |
|------|--------|--------|
| Product color tokens | Current tokens only cover brand icon | After DD-001 visual prototype |
| Type scale | Needed once screens move beyond textual specs | During DD-001 prototype implementation |
| Spacing scale | Needed to stabilize screen layouts | During DD-001 prototype implementation |
| Button and input components | Repeated across login, setup, feedback | Extract after first two screens |
| Result and feedback components | Core learning loop | Extract after result page prototype |

