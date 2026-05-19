# Story 01 - Mobile Shell & Header

**View**: Tryon Entry View  
**Section**: 1  
**Status**: Complete  
**Estimate**: 10 minutes  
**Output file**: `03.1-tryon-entry.html`
**Completed**: 2026-05-14

---

## Purpose

Create the mobile-only page shell and top header for `03.1-tryon-entry`. This section establishes the viewport frame, brand identity, and current page context before any page-specific content is added.

This story does not build the hero, action buttons, credit notice, profile status, or recent results. Those belong to later sections.

---

## Specification References

- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.1-tryon-entry/03.1-tryon-entry.md`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/work/Tryon-Entry-View-Work.yaml`
- `_bmad-output/D-Design-System/components/style-ai-app-icon-system.md`
- `_bmad-output/D-Design-System/design-tokens.md`

---

## Objects

### `obj-header`

**Type**: Mobile header / brand navigation shell  
**Label**: `Style AI` plus current page context `试穿决策`  
**Behavior**: Static in this section. The back control can exist visually but does not need navigation behavior until later flow pages exist.  
**States**:

- `default`: Brand mark and `Style AI` text are visible.
- `small-mobile`: Header remains readable at 375px width.

**Spec Source**:

- Page purpose: 林曼进入即时决策入口，开始处理具体参考对象。
- Platform: Mobile.

**Design Source**:

- Use approved Style AI brand mark from `icn-001`.
- Prefer existing asset reference: `_bmad-output/E-Assets/brand-logo/style-ai-reversible-s-symbol.svg`.
- Do not redraw or reinterpret the logo.

---

## HTML Structure

Create the initial document structure in `03.1-tryon-entry.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <!-- meta viewport, page title, Tailwind CDN/config -->
  </head>
  <body>
    <main class="mobile-shell">
      <header data-object-id="obj-header">
        <!-- back control, brand mark, Style AI label, page context -->
      </header>
      <section id="entry-hero-placeholder">
        <!-- reserved for Section 2 -->
      </section>
    </main>
  </body>
</html>
```

Use `data-object-id="obj-header"` on the header so later verification can locate it.

---

## Tailwind / Styling Requirements

Use Tailwind CDN for the prototype.

Required layout behavior:

- Body background should be calm and app-like, not a landing-page hero.
- Page shell should be mobile constrained and centered for desktop browser testing.
- Shell width should support 375px, 393px, and 428px without horizontal scroll.
- Header should use compact mobile spacing and stable dimensions.
- Avoid decorative orbs, bokeh, or large gradients.

Recommended classes/patterns:

```html
<body class="min-h-screen bg-neutral-950 text-neutral-50 antialiased">
<main class="mx-auto min-h-screen w-full max-w-[428px] overflow-x-hidden bg-[#111111]">
<header class="flex h-16 items-center justify-between px-5">
```

Brand token references:

- `#111111` brand icon background / dark app surface
- `#FAFAF7` brand mark / primary light text
- `#9D7AFF`, `#6D3DF7`, `#7B52FA` spark accent options

Header guidance:

- If using the SVG as an `<img>`, keep it around `28px-32px`.
- If using an inline text lockup, keep `Style AI` visible beside the symbol.
- Keep page context text compact, for example `试穿决策`.
- Back control can use a simple text/icon placeholder such as `‹` with `aria-label="返回"`.

---

## JavaScript Requirements

No business logic is required for Section 1.

Allowed minimal script:

- Define a `window.__STYLE_AI_PROTOTYPE__` metadata object for debugging.
- No click behavior is required yet.
- Do not implement import, history, credits, or demo data loading in this section.

Suggested metadata:

```javascript
window.__STYLE_AI_PROTOTYPE__ = {
  scenario: '03-linman-tryon-decision',
  page: '03.1-tryon-entry',
  section: '01-mobile-shell-header'
};
```

---

## Demo Data Requirements

No demo data rendering is required in Section 1.

Do not duplicate `data/demo-data.json` into the HTML. Later sections may read:

- `scenario.name`
- `entryPageCopy`
- `credits`
- `profileImage`
- `recentResults`

---

## Agent-Verifiable Acceptance Criteria

Use browser automation or equivalent viewport checks after implementation:

- At `375x667`, `393x852`, and `428x926`, the page has no horizontal scroll.
- `data-object-id="obj-header"` exists exactly once.
- Header height is stable and does not grow because of wrapping text.
- `Style AI` is visible in the header.
- Page context `试穿决策` is visible in the header.
- The header uses or references the approved brand mark asset rather than a hand-drawn substitute.
- Document language is `zh-CN`.

---

## User-Evaluable Acceptance Criteria

Sue should be able to review the section and judge:

- The top of the page feels like a real mobile product screen, not a marketing landing page.
- The brand identity is recognizable but not oversized.
- The header makes it clear this is the try-on decision entry.
- The layout feels ready to receive the next hero/content section.

---

## Test Instructions

After implementation:

1. Open `03.1-tryon-entry.html` in a browser.
2. Verify the page at mobile widths: 375, 393, and 428.
3. Confirm no horizontal scrollbar appears.
4. Confirm the header remains readable and compact.
5. Confirm the logo mark is sourced from existing Style AI assets.

---

## Notes for Implementation

- Keep this section small. It should only create the shell/header foundation.
- Do not add Section 2 hero copy yet, except for an empty/reserved placeholder if needed.
- Do not wire navigation to missing `03.2` files.
- Do not create reusable design-system components from this section yet; wait until the prototype validates repeated patterns.

---

## Completion Notes

**Implemented objects**:

- `obj-header`

**Files updated**:

- `03.1-tryon-entry.html`

**Implementation summary**:

- Created a mobile-only `zh-CN` HTML shell constrained to `max-w-[428px]`.
- Added compact header with visual back control, approved Style AI brand asset, `Style AI` text, and `试穿决策` context.
- Added a Section 2 placeholder without implementing hero content.
- Added minimal `window.__STYLE_AI_PROTOTYPE__` metadata.

**Verification summary**:

- Local static checks passed for language, object id, visible labels, brand asset reference, metadata, max-width, and horizontal overflow guard.
- In-app browser automation could not complete `file://` viewport checks because Browser Use blocked local file URL automation by security policy.
- Sue manually reviewed the open in-app browser page and approved Section 1 on 2026-05-14.

**Issues encountered**:

- Automated browser verification for `file://` was blocked by security policy.

**Improvements made**:

- None requested.
