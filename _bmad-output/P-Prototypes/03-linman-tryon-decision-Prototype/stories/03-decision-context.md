# Story 03 - Decision Context

**View**: Tryon Entry View  
**Section**: 3  
**Status**: Complete  
**Estimate**: 15 minutes  
**Output file**: `03.1-tryon-entry.html`
**Completed**: 2026-05-14

---

## Purpose

Implement a compact decision-context section below the hero. This section should make Linman's situation concrete: she already has a specific clothing, hairstyle, or styling reference in mind, but needs a fast way to judge whether it suits her before buying or changing.

The section also needs a short reassurance that the flow will clarify process and cost before generation, addressing the worry that she might spend credits without getting a useful conclusion.

This story does not implement import-scope controls, profile readiness, credit balance, primary action buttons, secondary actions, or recent result cards.

---

## Specification References

- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.1-tryon-entry/03.1-tryon-entry.md`
- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03-linman-tryon-decision.md`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/work/Tryon-Entry-View-Work.yaml`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/data/demo-data.json`

---

## Objects

### `obj-context-card`

**Type**: Compact context card  
**Label**: `你已经有一个想试的对象`  
**Behavior**: Static content. No interaction.  
**States**:

- `default`: Shows immediate-decision context below the hero.
- `small-mobile`: Text remains concise and readable without dominating the hero.

**Spec Source**:

- Entry context: 她在小红书或电商页面看到心动参考图，已经想买或想改造，却还在犹豫。
- User situation: 她看到一件想买的衣服、一个想尝试的发型，已经有具体对象了，但卡在“这个放到我身上会不会合适”。

**Proposed Copy**:

- Title: `你已经有一个想试的对象`
- Body: `不管是电商截图、小红书收藏图，还是线下看到的衣服或发型，先把它放到自己的常用形象上看一眼。`

### `obj-risk-reassurance`

**Type**: Reassurance note / process guardrail  
**Label**: `生成前再确认`  
**Behavior**: Static content. No interaction.  
**States**:

- `default`: Shows a brief reassurance inside or directly under the context card.

**Spec Source**:

- Worry: 她担心花了额度还是没有明确结论，或者流程太慢赶不上当下的决策窗口。

**Proposed Copy**:

- Label: `生成前再确认`
- Body: `本页会先说明流程和消耗，再进入导入。你可以在生成前确认参考图和本人形象。`

---

## HTML Structure

Replace the hidden Section 3 placeholder in `03.1-tryon-entry.html` with a compact section:

```html
<section id="decision-context" class="px-5 pt-6">
  <article data-object-id="obj-context-card">
    <p><!-- small label --></p>
    <h2>你已经有一个想试的对象</h2>
    <p>不管是电商截图、小红书收藏图，还是线下看到的衣服或发型，先把它放到自己的常用形象上看一眼。</p>
    <div data-object-id="obj-risk-reassurance">
      <p>生成前再确认</p>
      <p>本页会先说明流程和消耗，再进入导入。你可以在生成前确认参考图和本人形象。</p>
    </div>
  </article>
</section>
```

Add a hidden spacer placeholder after this section for Section 4.

---

## Tailwind / Styling Requirements

Required layout behavior:

- The context card should feel like product UI, not a decorative marketing card.
- Keep border radius at `8px` or less.
- Do not nest cards inside cards. If reassurance is inside the context card, it should read as a compact note row, not a second card.
- Use muted surfaces and light borders to separate content without competing with the hero.
- Content must fit at 375px without horizontal overflow.

Recommended classes/patterns:

```html
<section id="decision-context" class="px-5 pt-6">
  <article data-object-id="obj-context-card" class="rounded-lg border border-white/10 bg-white/[0.04] p-4">
    <p class="text-xs font-medium text-white/48">当前状态</p>
    <h2 class="mt-2 text-lg font-semibold leading-6 text-[#FAFAF7]">你已经有一个想试的对象</h2>
    <p class="mt-2 text-sm leading-6 text-white/66">...</p>
    <div data-object-id="obj-risk-reassurance" class="mt-4 border-t border-white/10 pt-3">
      <p class="text-sm font-semibold text-[#9D7AFF]">生成前再确认</p>
      <p class="mt-1 text-xs leading-5 text-white/54">...</p>
    </div>
  </article>
</section>
```

Token references:

- Surface: `#111111`
- Primary text: `#FAFAF7`
- Accent: `#9D7AFF`
- Subtle borders: `white/10`

---

## JavaScript Requirements

No JavaScript behavior is required for Section 3.

Do not add click handlers, navigation, local storage, or dynamic loading for this section.

---

## Demo Data Requirements

Use context from:

- `user.decisionContext`
- `referenceCandidates[0].source`
- `referenceCandidates[1].source`

The section can hardcode the approved copy for readability. Do not render the full reference candidate list yet; import scope belongs to Section 4.

---

## Agent-Verifiable Acceptance Criteria

Use localhost browser verification and source checks after implementation:

- `data-object-id="obj-context-card"` exists exactly once.
- `data-object-id="obj-risk-reassurance"` exists exactly once.
- `data-object-id="obj-entry-hero"` still exists exactly once.
- `data-object-id="obj-header"` still exists exactly once.
- Context title `你已经有一个想试的对象` is visible.
- Reassurance label `生成前再确认` is visible.
- No Section 4-6 object ids are present.
- Content remains visible at 375, 393, and 428 widths.

---

## User-Evaluable Acceptance Criteria

Sue should be able to review:

- The section makes Linman's situation feel specific and immediate.
- It reduces anxiety without becoming a tutorial.
- It supports the hero instead of competing with it.
- The page still feels compact enough for a mobile entry screen.

---

## Test Instructions

After implementation:

1. Refresh the localhost prototype.
2. Check the flow from header to hero to decision context.
3. Confirm the card feels like a product surface, not a marketing card.
4. Confirm the reassurance note is visible but secondary.
5. Check 375px width: no horizontal scroll, no crowded wrapping.

---

## Notes for Implementation

- Keep this section concise. Section 4 will explain import types and profile readiness.
- Do not add buttons or credit values here.
- Avoid oversized card styling.
- The reassurance note may be inside the context card as a separated note row.

---

## Completion Notes

**Implemented objects**:

- `obj-context-card`
- `obj-risk-reassurance`

**Files updated**:

- `03.1-tryon-entry.html`

**Implementation summary**:

- Added compact decision-context section below the hero.
- Added product-style context card with `当前状态`, `你已经有一个想试的对象`, and supporting copy.
- Added `生成前再确认` reassurance note inside the card as a separated note row, not a nested card.
- Added hidden spacer placeholder for Section 4.

**Verification summary**:

- Source checks passed for `obj-context-card`, `obj-risk-reassurance`, existing header/hero object ids, Section 3 copy, and absence of Section 4-6 object ids.
- Localhost DOM checks passed at 375, 393, and 428 widths for header, hero, context card, and reassurance note.
- Screenshot capture timed out twice through the browser automation channel; visual review was completed by Sue on the open localhost page.
- Sue approved Section 3 on 2026-05-14.

**Issues encountered**:

- Browser screenshot capture timed out during Section 3 verification, although DOM checks passed.

**Improvements made**:

- None requested.
