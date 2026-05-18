# Scenario 03: 林曼的试穿决策 - Prototype Roadmap

**Scenario**: 03-linman-tryon-decision  
**Pages**: 03.1 through 03.7  
**Device Compatibility**: Mobile-Only (375px-428px)  
**Prototype Language**: 中文  
**Design Fidelity**: Design System Components  
**Design System Source**: `_bmad-output/D-Design-System/`  
**Last Updated**: 2026-05-18

---

## Scenario Overview

**User Journey**: 林曼看到一个具体想买或想尝试的外部参考对象后，进入 Style AI，把参考图快速试到自己身上，并用结果判断是否购买、改变造型或继续生成。

**Pages in this Scenario**:

1. `03.1-tryon-entry` - 进入即时试穿/试造型入口，理解流程和额度消耗。
2. `03.2-import-reference` - 从相册、截图或当前页面导入外部参考图。
3. `03.3-tryon-setup` - 确认参考对象和本人照片或常用形象。
4. `03.4-tryon-waiting` - 查看生成进度、本次消耗和失败处理说明。
5. `03.5-tryon-result` - 查看本人效果、推荐/谨慎理由和下一步建议。
6. `03.6-history-collection` - 把结果加入对比或收藏。
7. `03.7-credit-purchase` - 在看见价值后判断是否继续购买额度。

---

## Device Compatibility

**Type**: Mobile-Only

**Reasoning**: 该场景发生在小红书、电商、直播间或线下店的即时决策窗口，用户主要通过手机打开 Style AI 并导入参考图。原型优先验证手机端节奏、触控入口、信息密度和额度提示。

**Test Viewports**:

- iPhone SE (375px x 667px) - 小屏极限与首屏信息压缩测试
- iPhone 14 Pro (393px x 852px) - 标准主测试尺寸
- iPhone 14 Pro Max (428px x 926px) - 大屏移动端留白与节奏测试

**Optimization Strategy**:

- 使用单列移动端布局，避免桌面断点。
- 主要操作使用底部或首屏可触达按钮。
- 所有点击目标按触控场景设计。
- 不依赖 hover 状态。
- 不包含桌面专用布局。

---

## Design Approach

**Fidelity**: Design System Components

**Available Approved Component**:

- `icn-001` Style AI App Icon System

**Available Tokens**:

```yaml
brand:
  icon-background: "#111111"
  icon-mark: "#FAFAF7"
  spark-light: "#9D7AFF"
  spark-core: "#6D3DF7"
  spark-deep: "#7B52FA"
```

Product UI tokens are still sparse, so this prototype should use the approved brand token set plus restrained mobile UI primitives. Any repeated product patterns discovered during implementation can be proposed later as design system component candidates.

---

## Folder Structure

**HTML Files**:

```text
03.1-tryon-entry.html
03.2-import-reference.html
03.3-tryon-setup.html
03.4-tryon-waiting.html
03.5-tryon-result.html
03.6-history-collection.html
03.7-credit-purchase.html
```

`03.2-import-reference.html`, `03.3-tryon-setup.html`, `03.4-tryon-waiting.html`, `03.5-tryon-result.html`, `03.6-history-collection.html`, and `03.7-credit-purchase.html` are built from prototype-draft page specs and should be reviewed before production handoff.

**Supporting Folders**:

- `shared/` - Shared prototype code and API abstraction
- `components/` - Reusable UI components
- `pages/` - Page-specific scripts
- `data/` - Demo data
- `stories/` - Just-in-time section implementation guides
- `work/` - Planning files for each page
- `assets/` - Prototype-specific images and icons

---

## Demo Data

**Primary user**: 林曼，31 岁，城市白领  
**Decision context**: 看到具体想买或想尝试的衣服/发型，想先判断放到自己身上是否合适。  
**Credits**: 6 个生成额度，单次试穿消耗 1 个额度。  
**Reference examples**:

- 奶油白短外套，来源为电商截图。
- 低层次微卷发，来源为小红书收藏图。

Full data lives in `data/demo-data.json`.

---

## Prototype Status

| Page | Status | Sections | Last Updated | Notes |
|------|--------|----------|--------------|-------|
| 03.1 tryon-entry | Built | 6/6 | 2026-05-15 | Mobile entry prototype complete and integration-verified |
| 03.2 import-reference | Draft Built | 4/4 | 2026-05-18 | Prototype draft built from newly created page spec; pending Sue review |
| 03.3 tryon-setup | Draft Built | 4/4 | 2026-05-18 | Prototype draft built from newly created page spec; pending Sue review |
| 03.4 tryon-waiting | Draft Accepted Locally | 3/3 | 2026-05-18 | Prototype draft built and local review accepted; production handoff still needs spec review |
| 03.5 tryon-result | Draft Built | 3/3 | 2026-05-18 | Prototype draft built from newly created page spec; pending Sue review |
| 03.6 history-collection | Draft Accepted Locally | 3/3 | 2026-05-18 | Prototype draft built from newly created page spec; accepted in browser preview |
| 03.7 credit-purchase | Draft Built | 3/3 | 2026-05-18 | Prototype draft built from newly created page spec; pending Sue review |

---

## Development Workflow

1. Create a work file in `work/` after scenario analysis.
2. Break `03.1-tryon-entry` into logical sections.
3. Create story files just in time for each approved section.
4. Implement and test one section at a time.
5. Present each section for review before continuing.
6. Run mobile viewport verification before final approval.

---

## Testing Requirements

**Functional Testing**:

- Primary action starts the reference import path.
- Secondary action exposes existing results or history context.
- Credit cost is visible before the user commits.
- Entry page explains what can be imported and what happens next.
- Demo data loads without manual setup.

**Device Testing**:

- iPhone SE 375px x 667px
- iPhone 14 Pro 393px x 852px
- iPhone 14 Pro Max 428px x 926px
- No horizontal scroll
- Touch targets remain usable

---

## Change Log

### 2026-05-14

- Created isolated prototype environment for `03-linman-tryon-decision`.
- Recorded Chinese prototype language, Mobile-Only compatibility, and Design System Components fidelity.
- Added realistic Linman demo data for `03.1-tryon-entry`.

### 2026-05-15

- Completed `03.1-tryon-entry.html` with 6/6 sections.
- Integration-verified required content, primary/secondary action feedback, and mobile widths 375/393/428.
- Final integration review approved by Sue.
- Kept `03.2` through `03.7` deferred until full page specifications are available.

### 2026-05-18

- Created a prototype-draft spec for `03.2-import-reference`.
- Built `03.2-import-reference.html` with source options, empty/importing/imported/error states, reference preview/details, recovery copy, and reviewer state controls.
- Updated `03.1-tryon-entry.html` so the primary action routes to `03.2-import-reference.html`.
- Created a prototype-draft spec for `03.3-tryon-setup`.
- Built `03.3-tryon-setup.html` with reference summary, profile confirmation, intent selection, credit confirmation, start-generation action, and reviewer state controls.
- Kept `03.4` through `03.7` deferred until page specs are created.
- Created a prototype-draft spec for `03.4-tryon-waiting`.
- Built `03.4-tryon-waiting.html` with generation progress, task context summary, credit policy, processing steps, recovery actions, and reviewer state controls for queued/generating/finalizing/success/timeout/failed.
- Added `activeTryOnGeneration` demo data for the current waiting task.
- Fixed file-open mobile scrolling by making `#app` the explicit vertical scroll container.
- Local review accepted after scroll fix.
- Created a prototype-draft spec for `03.5-tryon-result`.
- Built `03.5-tryon-result.html` with generated try-on visual, reference summary, recommendation reasons, caution note, purchase checks, quick judgment feedback, save/compare actions, and reviewer state controls.
- Updated `03.4-tryon-waiting.html` so the success action routes to `03.5-tryon-result.html`.
- Added `tryOnResult` demo data and a local try-on preview asset for the current cream jacket result.
- Created a prototype-draft spec for `03.6-history-collection`.
- Built `03.6-history-collection.html` with current saved-result summary, history/profile boundary copy, compare and favorite actions, comparison list, decision actions, and reviewer state controls.
- Updated `03.5-tryon-result.html` so saved/compared result actions can continue into `03.6-history-collection.html`.
- Added `historyCollection` demo data and captured `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/03.6-history-collection-393.png`.
- Created a prototype-draft spec for `03.7-credit-purchase`.
- Built `03.7-credit-purchase.html` with value recap, balance summary, selectable credit plans, credit policy note, local purchase simulation, success/error/decline states, and reviewer state controls.
- Updated `03.5-tryon-result.html` and `03.6-history-collection.html` so their credit-plan actions route to `03.7-credit-purchase.html`.
- Added `creditPurchase` demo data for plan labels, pricing copy, value bullets, policy notes, and state feedback.

---

**Version**: 1.6  
**Status**: 03.7 Draft Built
