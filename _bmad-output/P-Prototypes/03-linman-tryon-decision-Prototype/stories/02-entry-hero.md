# Story 02 - Entry Hero

**View**: Tryon Entry View  
**Section**: 2  
**Status**: Complete  
**Estimate**: 15 minutes  
**Output file**: `03.1-tryon-entry.html`
**Completed**: 2026-05-14

---

## Purpose

Implement the hero content directly below the completed mobile header. This section should make the page promise clear: Linman can take a specific reference image and preview how it looks on herself before buying or changing her style.

This story does not implement decision-context cards, import scope details, credit notices, action buttons, profile status, or recent results. Those belong to later sections.

---

## Specification References

- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.1-tryon-entry/03.1-tryon-entry.md`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/work/Tryon-Entry-View-Work.yaml`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/data/demo-data.json`
- `_bmad-output/D-Design-System/design-tokens.md`

---

## Objects

### `obj-entry-hero`

**Type**: Mobile hero / primary value proposition  
**Label**: `把心动参考图先试到自己身上`  
**Behavior**: Static content in this section. No buttons or navigation behavior.  
**States**:

- `default`: Headline and subhead visible after header.
- `small-mobile`: Text remains readable at 375px width without overlapping or causing horizontal scroll.

**Spec Source**:

- Page purpose: 林曼进入即时决策入口，开始处理具体参考对象。
- On-page interaction: 查看试穿/试造型入口，理解它用于把外部参考直接试到自己身上。

**Demo Data Source**:

```json
{
  "headline": "把心动参考图先试到自己身上",
  "subhead": "导入衣服、发型或妆容参考，Style AI 会用你的常用形象生成一次快速预览，帮你判断值不值得买或改。"
}
```

---

## HTML Structure

Replace the Section 2 placeholder in `03.1-tryon-entry.html` with a hero section:

```html
<section id="entry-hero" data-object-id="obj-entry-hero">
  <p><!-- small context label --></p>
  <h1>把心动参考图先试到自己身上</h1>
  <p>导入衣服、发型或妆容参考，Style AI 会用你的常用形象生成一次快速预览，帮你判断值不值得买或改。</p>
</section>
```

Keep the hero immediately under the header. Leave a placeholder after it for Section 3.

---

## Tailwind / Styling Requirements

Required layout behavior:

- Hero should read as product UI content, not a marketing landing hero.
- Use compact but confident type. Do not use viewport-width font scaling.
- Text must fit inside `375px` width without overflow.
- Keep letter spacing at normal/default.
- Avoid large gradients, decorative orbs, bokeh, or illustration-only treatment.
- The hero should leave room for Section 3 content below on common mobile screens.

Recommended classes/patterns:

```html
<section id="entry-hero" data-object-id="obj-entry-hero" class="px-5 pt-6">
  <p class="mb-3 text-xs font-semibold uppercase tracking-normal text-[#9D7AFF]">即时试穿预览</p>
  <h1 class="text-[34px] font-semibold leading-[1.05] text-[#FAFAF7]">把心动参考图先试到自己身上</h1>
  <p class="mt-4 text-base leading-7 text-white/68">...</p>
</section>
```

Use brand token references:

- Primary text: `#FAFAF7`
- Accent label: `#9D7AFF`
- Surface remains `#111111`

If `34px` feels too large after testing at 375px, reduce to `32px`. Do not make it smaller than `30px` unless text wrapping still feels cramped.

---

## JavaScript Requirements

No JavaScript behavior is required for Section 2.

Do not load demo data dynamically yet. The hero copy can be hardcoded from `data/demo-data.json` for prototype readability.

Keep the existing `window.__STYLE_AI_PROTOTYPE__` metadata. Update `section` only if useful for debugging, but do not remove Section 1 metadata.

---

## Demo Data Requirements

Use these values exactly:

- `entryPageCopy.headline`: `把心动参考图先试到自己身上`
- `entryPageCopy.subhead`: `导入衣服、发型或妆容参考，Style AI 会用你的常用形象生成一次快速预览，帮你判断值不值得买或改。`

Do not render credits, profile image, reference candidates, or recent results in this section.

---

## Agent-Verifiable Acceptance Criteria

Use browser or source-level verification after implementation:

- `data-object-id="obj-entry-hero"` exists exactly once.
- The old `entry-hero-placeholder` is removed or no longer visible.
- Headline text is present exactly as specified.
- Subhead text is present exactly as specified.
- `data-object-id="obj-header"` still exists exactly once.
- Section 1 header text remains present.
- The page remains `lang="zh-CN"`.
- HTML still contains no Section 3-6 objects.

If browser automation remains blocked by `file://` policy, record static checks and request Sue's manual visual review.

---

## User-Evaluable Acceptance Criteria

Sue should be able to review:

- The first content after the header immediately communicates the value of this page.
- The copy feels direct and decision-oriented, not instructional or promotional.
- The text size feels appropriate for a mobile app screen.
- The hero creates a good setup for the next decision-context section.

---

## Test Instructions

After implementation:

1. Open or refresh `03.1-tryon-entry.html`.
2. Confirm the header still appears as approved.
3. Confirm the hero headline and subhead are visible directly below the header.
4. Check 375px width if possible: text should wrap cleanly without horizontal scrolling.
5. Confirm no buttons, credit notices, or recent result cards have been introduced yet.

---

## Notes for Implementation

- Remove the dashed Section 2 placeholder from Section 1.
- Add a subtle placeholder after the hero for Section 3 if needed.
- Keep the visual rhythm compact; later sections still need to fit naturally below.
- Do not use image assets in this section.

---

## Completion Notes

**Implemented objects**:

- `obj-entry-hero`

**Files updated**:

- `03.1-tryon-entry.html`

**Implementation summary**:

- Replaced the Section 2 placeholder with a real hero section.
- Added the `即时试穿预览` label, headline, and subhead from `data/demo-data.json`.
- Preserved the approved Section 1 header.
- Added a hidden spacer placeholder for Section 3 without introducing Section 3 objects.

**Verification summary**:

- Source checks passed for `obj-entry-hero`, headline, subhead, `obj-header`, `zh-CN`, and absence of Section 3-6 objects.
- Started local static server at `http://127.0.0.1:18083/` to avoid `file://` browser automation policy.
- Checked localhost prototype at 375, 393, and 428 widths. Header and hero were present at all three widths.
- Sue approved Section 2 on 2026-05-14 after localhost review.

**Issues encountered**:

- Initial visual review showed hero title was too poster-like and the visible dashed Section 3 placeholder distracted from review.
- A second visual check showed the subhead left a single-word orphan at 375px width.

**Improvements made**:

- Reduced hero title from `34px` to `30px`, adjusted line-height to `1.14`, and reduced the subhead to `14px / 23px`.
- Replaced the visible dashed Section 3 placeholder with a hidden spacer.
