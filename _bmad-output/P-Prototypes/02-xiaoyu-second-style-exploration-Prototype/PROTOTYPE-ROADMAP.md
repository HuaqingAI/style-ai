# Scenario 02: 小雨的二次风格探索 - Prototype Roadmap

**Scenario**: 02-xiaoyu-second-style-exploration  
**Pages**: 02.1 through 02.3  
**Device Compatibility**: Mobile-Only (375px-428px)  
**Prototype Language**: 中文  
**Design Fidelity**: Design System Components  
**Design System Source**: `_bmad-output/D-Design-System/`  
**Last Updated**: 2026-05-18

---

## Scenario Overview

**User Journey**: 小雨刚看完首次个人形象结果，觉得有参考价值但还不确定是否最适合。她希望低压力地再试一个明显不同或更日常的方向，并清楚知道这次会消耗 1 次额度。

**Pages in this Scenario**:

1. `02.1-second-style-exploration` - 从首次结果进入，比较可继续尝试的风格方向，确认额度消耗后开始第二次生成。
2. `02.2-save-result` - 第二次生成后保存一个有参考价值的结果。当前为 prototype draft，待 Sue 评审。
3. `02.3-save-profile-prompt` - 保存结果后可选保存常用形象。当前为 prototype draft，待 Sue 评审。

---

## Device Compatibility

**Type**: Mobile-Only

**Reasoning**: 02 场景发生在首次结果页之后，用户仍在手机 App 内连续探索。原型优先验证移动端的信息密度、风格差异可理解性、额度消耗安心感和主行动是否明确。

**Test Viewports**:

- iPhone SE: 375px x 667px
- iPhone 14 Pro: 393px x 852px
- iPhone 14 Pro Max: 428px x 926px

---

## Design Approach

**Selected Fidelity**: Design System Components

Use the existing Style AI brand assets and the validated DD-001 prototype visual language:

- `_bmad-output/D-Design-System/design-tokens.md`
- `_bmad-output/D-Design-System/components/style-ai-app-icon-system.md`
- `_bmad-output/P-Prototypes/01-xiaoyu-first-preview-Prototype/01.7-image-result.html`

The prototype stays product-like and mobile-app-like. It should not introduce a landing page, marketing hero, or new global component system.

---

## Folder Structure

```text
02-xiaoyu-second-style-exploration-Prototype/
├── 02.1-second-style-exploration.html
├── 02.2-save-result.html
├── 02.3-save-profile-prompt.html
├── PROTOTYPE-ROADMAP.md
├── serve-prototype.mjs
├── assets/
├── components/
├── data/
│   └── demo-data.json
├── pages/
├── shared/
├── stories/
└── work/
```

---

## Demo Data

Primary file: `data/demo-data.json`

Default fixture:

- User: 小雨
- Starting point: 已看完第一次结果，当前主推荐为 `中发层次`
- Remaining personal generation credits: 1
- Second generation cost: 1
- Exploration options: 日常轻层次、明显短一点、法式八字刘海
- Second generated result: `日常轻层次`
- Save choices: 保存第二次结果、改保存第一次结果
- Common profile prompt: 保存为常用形象、暂不保存、保存失败状态

---

## Prototype Status

| Page | Status | Sections | Last Updated | Notes |
|------|--------|----------|--------------|-------|
| 02.1 second-style-exploration | Built | 1/1 | 2026-05-18 | Mobile page for comparing next-style directions and starting second generation |
| 02.2 save-result | Draft built pending review | 1/1 | 2026-05-18 | Mobile page for comparing first/second result and saving a history result |
| 02.3 save-profile-prompt | Draft built pending review | 1/1 | 2026-05-18 | Mobile page for optional common-profile save after history save |

---

## Development Workflow

1. Build only pages with page-level specifications.
2. Create work and story files before implementation.
3. Keep downstream pages deferred until specs exist.
4. Verify mobile widths and console cleanliness before presenting.

---

## Testing Requirements

**Functional Testing**:

- User can see the first result context.
- User can compare at least three second-style directions.
- User can select a direction and see the active state update.
- User can see remaining credits and cost before committing.
- Low-credit and submit-error states are visible in prototype controls.
- Primary start action gives local feedback and does not silently spend credits.
- User can compare first and second result after the second generation.
- User can choose whether to save the first or second result.
- Save-result default, saving, saved, and save-error states are visible in prototype controls.
- Saved state clearly separates history save from common-profile save.
- User can choose whether to save the result image as a common profile.
- Save-profile default, saving-profile, profile-saved, skipped, and save-error states are visible in prototype controls.
- Saving or skipping the common profile prompt gives a clear end-of-scenario route.

**Device Testing**:

- 375px, 393px, and 428px widths.
- No horizontal scroll.
- Touch targets remain usable.
- Text does not overlap or overflow cards/buttons.

---

## Change Log

### 2026-05-18

- Created isolated prototype environment for `02-xiaoyu-second-style-exploration`.
- Added `02.1-second-style-exploration.html` for the available page-level spec.
- Updated the 01.7 result page continuation link to point to this 02.1 prototype.
- Added prototype-draft page spec, work file, story file, and HTML for `02.2-save-result`.
- Updated `02.1-second-style-exploration.html` so the primary action routes to `02.2-save-result.html`.
- Initially kept `02.3` deferred because only scenario-level descriptions existed.
- Added prototype-draft page spec, work file, story file, and HTML for `02.3-save-profile-prompt`.
- Connected the `02.2` saved-state forward route to the real `02.3-save-profile-prompt.html` page.
- Added demo data for common-profile prompt copy, benefits, privacy boundaries, saved/skipped feedback, and error recovery.

---

**Version**: 1.2  
**Status**: 02.3 Draft Built Pending Review
