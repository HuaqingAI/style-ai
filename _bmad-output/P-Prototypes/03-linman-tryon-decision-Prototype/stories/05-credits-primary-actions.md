# Story 05 - Credits & Primary Actions

**View**: Tryon Entry View  
**Section**: 5  
**Status**: Complete  
**Estimate**: 20 minutes  
**Output file**: `03.1-tryon-entry.html`

---

## Purpose

Implement the decision/action area for the entry page. This section must show the expected credit cost before the user commits and make `导入参考图` the primary, most obvious action. It also provides a secondary `查看历史结果` action without implementing the history list, which belongs to Section 6.

---

## Specification References

- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.1-tryon-entry/03.1-tryon-entry.md`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/work/Tryon-Entry-View-Work.yaml`
- `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/data/demo-data.json`
- `_bmad-output/D-Design-System/design-tokens.md`

---

## Objects

### `obj-credit-notice`

**Type**: Credit cost notice  
**Label**: `本次预计消耗 1 个生成额度`  
**Behavior**: Static notice. No credit mutation.  
**States**:

- `default`: Shows current balance and expected cost before primary action.

**Spec Source**:

- On-page interaction: 看到本次流程的简短说明和额度消耗提示。

**Demo Data Source**:

- `credits.balance`: `6`
- `credits.tryOnCost`: `1`
- `credits.currencyLabel`: `生成额度`

**Proposed Copy**:

- `本次预计消耗 1 个生成额度`
- `当前余额 6`

### `obj-primary-action`

**Type**: Primary action button  
**Label**: `导入参考图`  
**Behavior**: Prototype-level feedback only. Do not navigate to `03.2` because the page spec and HTML do not exist yet.  
**States**:

- `default`: Enabled.
- `pressed`: Shows a small prototype toast or status message such as `下一步将进入参考图导入`.

**Spec Source**:

- Exit action: 选择导入外部参考图。

### `obj-secondary-action`

**Type**: Secondary action button/link  
**Label**: `查看历史结果`  
**Behavior**: Prototype-level feedback only. Do not render recent result cards in this section.  
**States**:

- `default`: Visible but visually secondary.
- `pressed`: Shows small prototype status such as `历史结果会在下方展示`.

**Demo Data Source**:

- `entryPageCopy.secondaryAction`
- `recentResults` is reserved for Section 6.

---

## HTML Structure

Replace the hidden Section 5 placeholder in `03.1-tryon-entry.html` with:

```html
<section id="credits-actions" class="px-5 pt-5">
  <div data-object-id="obj-credit-notice">
    <p>本次预计消耗 1 个生成额度</p>
    <p>当前余额 6</p>
  </div>
  <button data-object-id="obj-primary-action" type="button">导入参考图</button>
  <button data-object-id="obj-secondary-action" type="button">查看历史结果</button>
  <p id="prototype-action-status" aria-live="polite"></p>
</section>
```

Add a hidden spacer placeholder after this section for Section 6.

---

## Tailwind / Styling Requirements

Required layout behavior:

- The primary button must be the clearest action on the screen.
- Secondary action must be visible but lower emphasis.
- Credit notice should sit close to the primary action and be readable before tapping.
- Keep the action area compact; avoid creating a large checkout/payment panel.
- Buttons need stable heights and text must not overflow at 375px.

Recommended classes/patterns:

```html
<section id="credits-actions" class="px-5 pt-5">
  <div data-object-id="obj-credit-notice" class="mb-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
    ...
  </div>
  <button data-object-id="obj-primary-action" type="button" class="flex h-12 w-full items-center justify-center rounded-lg bg-[#FAFAF7] text-sm font-semibold text-[#111111]">
    导入参考图
  </button>
  <button data-object-id="obj-secondary-action" type="button" class="mt-2 flex h-11 w-full items-center justify-center rounded-lg border border-white/10 text-sm font-semibold text-white/72">
    查看历史结果
  </button>
  <p id="prototype-action-status" class="mt-3 min-h-5 text-center text-xs text-[#9D7AFF]" aria-live="polite"></p>
</section>
```

Token references:

- Primary button background: `#FAFAF7`
- Primary button text: `#111111`
- Accent/status: `#9D7AFF`
- Subtle border: `white/10`

---

## JavaScript Requirements

Implement prototype-only feedback:

- `handleImportReferenceClick()`: update `#prototype-action-status` to `下一步将进入参考图导入`
- `handleHistoryClick()`: update `#prototype-action-status` to `历史结果会在下方展示`

Do not navigate to missing pages.
Do not load demo data dynamically.
Do not mutate credits.
Do not render Section 6 recent results.

Keep `window.__STYLE_AI_PROTOTYPE__` metadata.

---

## Demo Data Requirements

Use these values:

- Cost: `1 个生成额度`
- Balance: `6`
- Primary action: `导入参考图`
- Secondary action: `查看历史结果`

Do not render:

- Recent result cards
- Payment options
- Purchase prompts

---

## Agent-Verifiable Acceptance Criteria

Use localhost browser verification and source checks after implementation:

- `data-object-id="obj-credit-notice"` exists exactly once.
- `data-object-id="obj-primary-action"` exists exactly once.
- `data-object-id="obj-secondary-action"` exists exactly once.
- Text `本次预计消耗 1 个生成额度` is visible.
- Text `当前余额 6` is visible.
- Text `导入参考图` is visible.
- Text `查看历史结果` is visible.
- Clicking primary action updates `#prototype-action-status`.
- Clicking secondary action updates `#prototype-action-status`.
- No `obj-recent-results` exists yet.
- Content remains visible at 375, 393, and 428 widths.

---

## User-Evaluable Acceptance Criteria

Sue should be able to review:

- The primary action is obviously the next step.
- Credit cost is visible before the action.
- Secondary action does not compete with the primary button.
- The area feels like an app action section, not a purchase/paywall panel.

---

## Test Instructions

After implementation:

1. Refresh the localhost prototype.
2. Confirm credit cost and balance are visible.
3. Confirm `导入参考图` is visually primary.
4. Click `导入参考图`; status should update.
5. Click `查看历史结果`; status should update.
6. Confirm no recent result cards appear yet.

---

## Notes for Implementation

- This is the first interactive section, but interactions are prototype-only.
- Do not create missing downstream pages.
- Keep action feedback subtle and reversible.

---

## Completion Record

**Completed**: 2026-05-14  
**Approved by**: Sue  
**Actual time**: 20 minutes  

**Implementation Summary**:

- Added `obj-credit-notice` with visible cost and balance copy.
- Added `obj-primary-action` as the dominant action for importing a reference image.
- Added `obj-secondary-action` as a lower-emphasis history entry.
- Added `#prototype-action-status` with prototype-only feedback for both actions.
- Did not render `obj-recent-results`; that remains reserved for Section 6.

**Verification Summary**:

- Source checks passed: all three Section 5 objects appear exactly once.
- Localhost page responded successfully.
- Browser DOM checks confirmed credit copy, balance copy, and both actions are visible.
- Click behavior passed through visible DOM automation: primary and secondary actions both update the status text.

**Issues**:

- Direct Playwright selector click timed out on the in-app browser CDP channel; verification continued through the in-app browser visible DOM click path.

**Improvements**:

- None.
