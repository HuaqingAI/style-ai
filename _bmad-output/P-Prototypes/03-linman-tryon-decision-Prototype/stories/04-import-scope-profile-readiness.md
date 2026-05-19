# Story 04 - Import Scope & Profile Readiness

**View**: Tryon Entry View  
**Section**: 4  
**Status**: Complete  
**Estimate**: 20 minutes  
**Output file**: `03.1-tryon-entry.html`
**Completed**: 2026-05-14

---

## Purpose

Implement a compact section that explains what kinds of external references can be imported and confirms that Linman's usual personal image is already ready. The section should reduce startup friction before the user reaches the credit and primary action section.

This story does not implement credit balance, primary action buttons, secondary action buttons, or recent result cards.

---

## Specification References

- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.1-tryon-entry/03.1-tryon-entry.md`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/work/Tryon-Entry-View-Work.yaml`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/data/demo-data.json`
- `_bmad-output/D-Design-System/design-tokens.md`

---

## Objects

### `obj-reference-options`

**Type**: Import scope list / supported reference types  
**Label**: `可以先导入这些参考`  
**Behavior**: Static content. No file picker or import behavior yet.  
**States**:

- `default`: Shows three import categories and realistic source examples.
- `small-mobile`: Three categories remain scannable without horizontal overflow.

**Spec Source**:

- On-page interaction: 理解它用于把外部参考直接试到自己身上。
- Discovery method: 她从同一张图直接导入 Style AI。

**Demo Data Source**:

- `referenceCandidates[0]`: clothing, 电商截图, 奶油白短外套
- `referenceCandidates[1]`: hairstyle, 小红书收藏图, 低层次微卷发

**Proposed Copy**:

- Title: `可以先导入这些参考`
- Options: `衣服`, `发型`, `妆容`
- Source note: `支持电商截图、小红书收藏图，也可以是线下看到的款式。`

### `obj-profile-ready`

**Type**: Readiness status row / profile image status  
**Label**: `常用本人形象已准备好`  
**Behavior**: Static content. No upload or edit behavior in this section.  
**States**:

- `ready`: Shows a ready status with a compact check indicator.

**Demo Data Source**:

- `profileImage.label`: 常用本人形象
- `profileImage.status`: ready
- `profileImage.notes`: 正面半身照，光线清晰，适合快速试穿。

**Proposed Copy**:

- Title: `常用本人形象已准备好`
- Body: `正面半身照，光线清晰，适合快速试穿。`

---

## HTML Structure

Replace the hidden Section 4 placeholder in `03.1-tryon-entry.html` with:

```html
<section id="import-readiness" class="px-5 pt-5">
  <div data-object-id="obj-reference-options">
    <h2>可以先导入这些参考</h2>
    <div>
      <span>衣服</span>
      <span>发型</span>
      <span>妆容</span>
    </div>
    <p>支持电商截图、小红书收藏图，也可以是线下看到的款式。</p>
  </div>
  <div data-object-id="obj-profile-ready">
    <p>常用本人形象已准备好</p>
    <p>正面半身照，光线清晰，适合快速试穿。</p>
  </div>
</section>
```

Add a hidden spacer placeholder after this section for Section 5.

---

## Tailwind / Styling Requirements

Required layout behavior:

- This section should feel like a compact readiness checklist, not another large card.
- Avoid putting a card inside another card.
- Three import types should be quick to scan and stable at 375px width.
- Profile readiness should be secondary but visible.
- Do not create button-like pills if they are not interactive; use quiet labels/chips.

Recommended classes/patterns:

```html
<section id="import-readiness" class="px-5 pt-5">
  <div data-object-id="obj-reference-options" class="space-y-3">
    <h2 class="text-base font-semibold text-[#FAFAF7]">可以先导入这些参考</h2>
    <div class="grid grid-cols-3 gap-2">
      <span class="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-sm text-white/78">衣服</span>
      ...
    </div>
    <p class="text-xs leading-5 text-white/52">...</p>
  </div>

  <div data-object-id="obj-profile-ready" class="mt-4 flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3">
    <span><!-- compact check indicator --></span>
    <div>
      <p class="text-sm font-semibold text-[#FAFAF7]">常用本人形象已准备好</p>
      <p class="mt-1 text-xs leading-5 text-white/52">...</p>
    </div>
  </div>
</section>
```

Token references:

- Primary text: `#FAFAF7`
- Accent / check: `#9D7AFF` or `#7B52FA`
- Border: `white/10`
- Muted text: `white/52` to `white/78`

---

## JavaScript Requirements

No JavaScript behavior is required for Section 4.

Do not implement upload, edit, import, or profile selection behavior in this section.

---

## Demo Data Requirements

Use these values:

- Import categories: `衣服`, `发型`, `妆容`
- Source note: `支持电商截图、小红书收藏图，也可以是线下看到的款式。`
- Profile title: `常用本人形象已准备好`
- Profile body: `正面半身照，光线清晰，适合快速试穿。`

Do not render:

- Credits
- Primary/secondary action buttons
- Recent results

---

## Agent-Verifiable Acceptance Criteria

Use localhost browser verification and source checks after implementation:

- `data-object-id="obj-reference-options"` exists exactly once.
- `data-object-id="obj-profile-ready"` exists exactly once.
- Existing `obj-header`, `obj-entry-hero`, `obj-context-card`, and `obj-risk-reassurance` remain present exactly once.
- `衣服`, `发型`, and `妆容` are visible.
- `常用本人形象已准备好` is visible.
- No Section 5-6 object ids are present.
- Content remains visible at 375, 393, and 428 widths.

---

## User-Evaluable Acceptance Criteria

Sue should be able to review:

- The section lowers friction by making import scope and profile readiness obvious.
- It does not look like a set of interactive buttons before actions are available.
- It does not compete with the upcoming primary action section.
- The page still feels compact and product-like on mobile.

---

## Test Instructions

After implementation:

1. Refresh the localhost prototype.
2. Confirm the import types are visible and quiet.
3. Confirm profile readiness is clear.
4. Confirm no credit balance or action button has appeared yet.
5. Check 375px width for clean wrapping and no horizontal scroll.

---

## Notes for Implementation

- Keep labels non-interactive.
- Do not use a second large card immediately after the Section 3 card if the page starts feeling heavy.
- Consider using a simple grid plus one compact status row.

---

## Completion Notes

**Implemented objects**:

- `obj-reference-options`
- `obj-profile-ready`

**Files updated**:

- `03.1-tryon-entry.html`

**Implementation summary**:

- Added compact import-readiness section below the decision context.
- Added three non-interactive reference labels: `衣服`, `发型`, `妆容`.
- Added source note for 电商截图、小红书收藏图、线下看到的款式.
- Added compact profile readiness row with `常用本人形象已准备好`.
- Added hidden spacer placeholder for Section 5.

**Verification summary**:

- Source checks passed for Section 4 object ids, existing Section 1-3 object ids, import labels, profile readiness text, and absence of Section 5-6 object ids.
- Localhost DOM checks passed at 375, 393, and 428 widths.
- Screenshot capture timed out through browser automation; Sue continued after visual review on the open localhost page.

**Issues encountered**:

- Browser screenshot capture timed out during Section 4 verification, although DOM checks passed.

**Improvements made**:

- None requested.
