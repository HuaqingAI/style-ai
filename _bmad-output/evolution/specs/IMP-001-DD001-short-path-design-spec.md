# IMP-001: DD-001 首次生成短链路减负 — Update Specification

**Type:** Product Evolution Design Update  
**Version:** v2.0 design direction  
**Previous Version:** DD-001 v1.0, `01.1 -> 01.7` seven-step local prototype  
**Scenario:** `_bmad-output/evolution/scenarios/SC-IMP-001-DD001-first-experience-short-path.md`  
**Date:** 2026-05-18  
**Status:** Pending Sue sign-off  

---

## Change Summary

DD-001 首次真实预览从“完整解释型流程”改为“短链路结果优先流程”。用户仍然登录、选择照片、等待、看结果；但照片质量检查和生成方向选择不再作为首次 happy path 的独立页面出现。系统在照片选择后自动检查质量并创建默认生成任务，等待页解释正在生成一个适合日常判断的稳妥方向，结果页第一屏只保留主结果图、一句判断、`换个方向`、`保存`。

---

## Kaizen Boundary

### One Thing To Change

把首次生成前的用户决策负担降到最低：选中照片后直接进入默认生成，不再要求用户先通过独立质量检查页或生成设置页。

### What's Changing

- User flow: `01.3 -> 01.4 -> 01.5 -> 01.6` 改为 `01.3 -> 01.6`。
- Interaction: `01.3` 的继续按钮从“进入下一步检查/设置”改为“创建默认生成任务”。
- Component behavior: 照片质量检查从独立页面下沉为 `01.3` 的 inline 状态和任务创建前校验。
- Component behavior: 首轮生成方向从用户选择改为系统默认。
- Visual hierarchy: `01.7` 第一屏从“结果 + 分析 + 反馈 + 保存/profile”收敛为“主图 + 一句判断 + 两个动作”。
- Copy: 系统语言从“质量检查 / 生成设置 / 参数”改为用户语言“这张能参考 / 正在生成一个稳妥方向 / 换个方向 / 保存”。
- Data contract: 新增或明确 `photoQualityStatus`、`defaultGenerationIntent`、`resultJudgmentSentence`、`quickFeedback`、`saveTarget`。

### What's Staying

- `01.1` 登录和 `01.2` 首页入口不做结构性调整。
- Photo Intake 的拍照、相册、权限、预览、重选能力保留。
- 异步生成等待页保留，仍支持 queued/generating/finalizing/success/timeout/failed。
- 结果页仍保留推荐原因、谨慎点、详细分析、反馈、保存历史、常用形象提示，但默认不抢第一屏。
- 失败不扣或退回额度的用户感知规则保留。
- 品牌、视觉基调、移动端优先、现有 prototype 技术形态不改变。

---

## Before

### Flow

```text
01.1 启动/登录
  -> 01.2 首页双入口
  -> 01.3 照片上传
  -> 01.4 照片质量检查
  -> 01.5 生成设置
  -> 01.6 生成等待
  -> 01.7 图片结果
```

### User Experience

- 用户选中照片后，还要看照片质量页。
- 用户通过照片质量页后，还要看风格方向选择和额度说明。
- 结果页首屏附近同时出现结果、推荐、谨慎点、反馈、保存和 profile 概念。
- 首次体验传达的是“完成一套生成流程”，而不是“尽快看到一个像自己的结果”。

---

## After

### Flow

```text
01.1 启动/登录
  -> 01.2 首页双入口
  -> 01.3 选照片 / inline 质量状态 / 创建默认生成任务
  -> 01.6 生成等待
  -> 01.7 看结果
```

### Flow Sketch

```text
[01.3 Photo Intake]
  Empty
    -> 选择照片
  Selected + quality pass
    -> CTA: 用这张生成预览
    -> create task(defaultGenerationIntent)
    -> 01.6
  Selected + quality warning
    -> inline warning: "这张可以先试，但光线略暗，结果可能没那么准。"
    -> CTA: 仍然生成预览
    -> 01.6
  Selected + quality fail
    -> blocking notice: "这张脸部不够清楚，换一张更容易生成。"
    -> CTA: 重新上传
    -> stay on 01.3

[01.6 Waiting]
  -> copy: "正在生成一个适合日常判断的稳妥方向。"
  -> task states remain
  -> success -> 01.7

[01.7 Result]
  First screen:
    -> generated result image
    -> one judgment sentence
    -> 换个方向
    -> 保存
  Below / triggered:
    -> reasons and cautious notes
    -> quick feedback details
    -> common profile prompt
```

---

## Page Specifications

### 01.3 Photo Upload — Updated

**Purpose:** 让用户选择当前照片，并在不新增页面的情况下完成照片可用性判断和默认生成任务创建。

**Updated Structure:**

1. Top bar with back
2. Photo boundary note
3. Photo picker actions
4. Selected photo preview
5. Inline photo quality status
6. Primary generation action
7. Photo tips

**Modified Components:**

| Component | Object ID | Change |
|---|---|---|
| Photo Boundary Note | `photo-upload-boundary-note` | 保留短句，避免扩成隐私教育页。 |
| Selected Photo Preview | `photo-upload-selected-preview` | 增加质量状态承载区。 |
| Inline Quality Status | `photo-upload-quality-status` | 新增。展示 pass/warning/fail/unavailable 的轻量状态。 |
| Continue Button | `photo-upload-continue-button` | 行为改为创建默认生成任务并进入 `01.6`。 |
| Photo Tips | `photo-upload-photo-tips` | 保留，但作为辅助信息，不要求用户先读完。 |

**State Behavior:**

| State | UI | Primary Action | Route |
|---|---|---|---|
| Empty | 上传区、拍照/相册入口、照片边界说明 | Disabled or hidden | Stay |
| Permission denied | 权限说明和系统设置入口 | 重新授权 | Stay |
| Selected / Pass | 预览 + 轻提示 “这张可以生成” | `用这张生成预览` | `01.6-generation-waiting` |
| Selected / Warning | 预览 + inline warning | `仍然生成预览` | `01.6-generation-waiting` |
| Selected / Fail | 预览 + blocking reason | `重新上传` | Stay |
| Check unavailable | 说明暂时无法检查，不承诺精确判断 | `先生成预览` or `重试检查` | `01.6` or Stay |
| Task submit error | 不扣额度说明 + 重试 | `重试生成` | Stay or retry |

**Copy Direction:**

- Pass: “这张可以用来生成。”
- Warning: “这张可以先试，但光线略暗，结果可能没那么准。”
- Fail: “这张脸部不够清楚，换一张更容易生成。”
- CTA pass: “用这张生成预览”
- CTA warning: “仍然生成预览”
- CTA fail: “重新上传”

**Design Notes:**

- Warning 不使用红色错误样式；用轻提示、可继续。
- Fail 只给一个主动作，避免用户在“继续/重拍/设置/看建议”之间犹豫。
- `01.4-photo-quality-check` 的能力保留为系统状态，不再是首次 happy path 页面。

### 01.4 Photo Quality Check — Repositioned

**Purpose:** 不再作为首次 happy path 页面。保留为后台/异常/开发参考规格。

**New Role:**

- 作为照片质量规则和异常状态的详细定义来源。
- 可在严重失败、检查服务异常、或后续高级照片管理中复用。
- 不从 `01.3` 的合格或 warning 状态自动路由进入。

**Implementation Constraint:**

- 首次合格路径不得出现 `01.4`。
- Warning 不得进入 `01.4`，只能 inline 提示。
- Fail 可停留在 `01.3`，不需要独立页。

### 01.5 Generation Setup — Repositioned

**Purpose:** 不再作为首轮生成前页面。首轮默认生成方向由系统自动选择。

**New Role:**

- 可作为后续“换个方向”的轻量选择逻辑参考。
- 可作为高级设置或二次探索的后台配置来源。
- 不从 `01.3` 或 `01.6` 在首轮 happy path 中进入。

**Default Generation Intent:**

| Field | Value |
|---|---|
| `defaultGenerationIntent` | `daily_judgment_safe_direction` |
| Product name | 日常判断稳妥方向 |
| User-facing explanation | “先给你生成一个变化明显但不突兀的方向，方便判断适不适合。” |
| Design rule | 不要求用户选择；只在等待页或结果页轻量解释。 |

### 01.6 Generation Waiting — Updated

**Purpose:** 维持等待信任感，同时解释系统已经替用户选择了一个低风险首轮方向。

**Updated Structure:**

1. Generation status
2. Default direction note
3. Plain-language processing list
4. Credit handling note
5. Recovery actions

**Modified Components:**

| Component | Object ID | Change |
|---|---|---|
| Generation Status | `generation-waiting-status` | 文案从单纯“正在生成”改为“正在生成一个适合日常判断的稳妥方向”。 |
| Default Direction Note | `generation-waiting-default-direction-note` | 新增。解释系统没有要求用户先选风格。 |
| Credit Handling Note | `generation-waiting-credit-note` | 保留，但弱化，不抢主视觉。 |
| Detail List | `generation-waiting-detail-list` | 保留；“整理推荐理由和谨慎点”可移到较低层级。 |

**Copy Direction:**

- Main: “正在生成一个适合日常判断的稳妥方向。”
- Support: “先让你看到一个变化明显但不突兀的结果，之后可以再换方向。”
- Credit: “生成成功后才消耗 1 次额度；失败不会扣。”

### 01.7 Image Result — Updated

**Purpose:** 让用户第一眼先判断“这个结果像不像我、能不能参考”，再决定保存、换方向或展开详情。

**First Screen Structure:**

1. Main result image viewer
2. One judgment sentence
3. Primary action row: `换个方向` / `保存`
4. Lightweight reaction entry, visually secondary

**Below / Conditional Structure:**

1. Reasons and cautious notes
2. Optional detail tiles / analysis detail
3. Feedback reason panel, only after negative or uncertain reaction
4. Common profile prompt, only after save/second-generation/try-on intent

**Modified Components:**

| Component | Object ID | Change |
|---|---|---|
| Result Image Viewer | `image-result-viewer` | First-screen anchor; no heavy overlay. |
| Judgment Sentence | `image-result-judgment-sentence` | New first-screen sentence. Replaces early multi-card explanation. |
| Fit Summary | `image-result-fit-summary` | Moves below first action area or becomes collapsed preview. |
| Next Actions | `image-result-next-actions` | First-screen action row contains only `换个方向` and `保存` as primaries. |
| Explore Another Style | `image-result-explore-another-style-button` | Label shortens to `换个方向`; leads to lightweight Scenario 02 entry. |
| Save Result | `image-result-save-result-button` | Label shortens to `保存`; saves history result first. |
| Judgment Strip | `image-result-judgment-strip` | Visually secondary; reason tags hidden until negative/uncertain. |
| Common Profile Prompt | `image-result-common-profile-prompt` | Hidden by default; triggered after save, second generation, or try-on prep. |
| Seed Feedback Panel | `image-result-seed-feedback-panel` | Hidden by default; expands after negative/uncertain feedback. |

**Judgment Sentence Generation:**

Use template-plus-AI field:

- AI or rules produce structured inputs: recommended direction, confidence, likeness caveat, caution.
- App renders one controlled sentence.
- Example: “这个方向先看自然清爽，变化看得出来，但不会一下子太夸张。”

**Action Behavior:**

| Action | First Tap Behavior | Follow-up |
|---|---|---|
| `换个方向` | Opens Scenario 02 lightweight direction choice, maximum 2-3 choices | Does not show full `01.5` setup |
| `保存` | Saves current result to history | Then may show compact “保存为常用形象？” prompt |
| Positive reaction | Records quick feedback silently | No panel expansion required |
| Negative/uncertain reaction | Records reaction and expands reason tags | May offer “换个方向” as recovery |

---

## Data / API Notes

| Field | Purpose | Required For Prototype | Required For Production |
|---|---|---:|---:|
| `photoQualityStatus` | pass/warning/fail/unavailable | Yes | Yes |
| `photoQualityReasons` | warning/fail reason codes | Yes | Yes |
| `defaultGenerationIntent` | first-run automatic direction | Yes | Yes |
| `generationTask.source` | distinguish first preview default task | Yes | Yes |
| `resultJudgmentSentence` | first-screen judgment line | Yes | Yes |
| `quickFeedback.looksLikeMe` | likeness signal | Yes | Yes |
| `quickFeedback.usefulForJudgment` | core MVP signal | Yes | Yes |
| `quickFeedback.issueTags` | optional negative reasons | Yes | Yes |
| `saveTarget` | history result vs common profile | Yes | Yes |

---

## Responsive Behavior

Target widths: 375, 393, 428 px mobile portrait.

- `01.3` selected photo preview must keep stable dimensions; quality status cannot push CTA offscreen without scroll.
- `01.3` fail state must show reason and `重新上传` in the same viewport whenever possible.
- `01.6` status text must wrap cleanly; no viewport-width font scaling.
- `01.7` first screen must show the main result image, judgment sentence, and both primary actions without horizontal overflow.
- Action labels must not truncate at 375 px. Use two equal buttons or vertical stacking if text overflows.
- Detailed analysis, feedback reason tags, and profile prompt live below the first-screen priority area.

---

## Edge Cases

| Case | Design Response |
|---|---|
| Photo warning but user wants fast result | Allow continue with inline warning. |
| Photo severe fail | Block on `01.3`, single action `重新上传`. |
| Quality check unavailable | Allow “先生成预览” only if image can be read; otherwise ask to retry/reupload. |
| Low credit before default generation | Show inline credit block on `01.3` only when blocking; do not route to setup. |
| Task submit error | Stay on `01.3`, say no credit consumed, offer retry. |
| Generation timeout | `01.6` offers continue waiting or view later/history. |
| Partial result | `01.7` shows image first; analysis can say “稍后补全”. |
| User taps negative feedback | Expand reason tags and keep `换个方向` visible. |
| User taps save | Save to history first; profile prompt is optional and compact. |

---

## Acceptance Criteria

- `AC-DD001-01`: New user happy path from login to first result does not show standalone photo-quality page.
- `AC-DD001-02`: New user happy path from login to first result does not show generation setup page.
- `AC-DD001-03`: From `01.3` selected/pass state, primary CTA routes to `01.6-generation-waiting`.
- `AC-DD001-04`: From `01.3` selected/warning state, warning is inline and user can still route to `01.6`.
- `AC-DD001-05`: From `01.3` fail state, user cannot route to `01.6`; only primary recovery is reupload.
- `AC-DD001-06`: `01.6` explains default generation direction without asking user to configure it.
- `AC-DD001-07`: `01.7` first screen contains result image, one judgment sentence, `换个方向`, and `保存`.
- `AC-DD001-08`: `01.7` does not show full feedback reason panel before negative/uncertain reaction.
- `AC-DD001-09`: `01.7` does not require common profile creation before save, second generation, or try-on intent.
- `AC-DD001-10`: Scenario 02 entry from `换个方向` presents no more than 3 lightweight direction choices before generation.
- `AC-DD001-11`: Scenario 03 remains usable without a saved common profile.
- `AC-DD001-12`: 375/393/428 px checks show no horizontal overflow and no overlapping text/buttons.

---

## Hypothesis Validation

### Hypothesis

If first-time users can go from photo selection directly to waiting/result without separate quality-check and generation-setup pages, more users will complete the first generation and give a usable “像自己 / 可用于判断” signal, because the product shows value before asking for configuration or management decisions.

### Assumptions

- A safe default first direction is good enough to start judgment.
- Light photo warnings are acceptable if they do not significantly reduce result quality.
- Users prefer seeing the result first, then deciding whether to explore details, save, or give feedback.
- Reducing explicit setup will not meaningfully reduce trust if failure, quality, and credit states remain clear.

### Risks And Mitigations

| Risk | Mitigation |
|---|---|
| Default direction feels arbitrary | Waiting/result copy says it is a “稳妥方向” and result page supports `换个方向`. |
| Lower-quality photos increase bad results | Severe fail still blocks; warning is tracked for analysis. |
| Users miss why the result was recommended | Reason/caution content remains below first-screen actions. |
| Feedback volume drops | Keep lightweight reaction visible; expand reasons only when useful. |
| Save/profile boundary becomes unclear | `保存` means history result first; profile prompt uses explicit optional copy. |

### Success Metrics

- First generation completion rate: target remains at least 60% for seed users.
- Step drop-off between photo selected and waiting page: target lower than v1.0 baseline.
- Useful result signal: at least 60% of completed first generations marked “像自己 / 可用于判断”.
- Warning-photo completion and negative feedback rates tracked separately.
- Save result rate and second-generation entry rate tracked after result view.

### Failure Criteria

- Completion improves but “像自己 / 可用于判断” feedback drops meaningfully.
- Warning-state users produce disproportionately negative feedback.
- Users repeatedly tap `换个方向` immediately because the default direction feels wrong.
- Users confuse saving a result with saving a common profile.

---

## Design Self-Review

- [x] Solves the root cause: removes pre-result quality/setup burden from first happy path.
- [x] Smallest effective change: only changes DD-001 first path and compatibility checks for 02/03.
- [x] Aligns with existing design system: reuses current page structure, action groups, notes, and mobile prototype style.
- [x] Technically feasible: current prototype can route `01.3 -> 01.6`; production needs explicit data fields.
- [x] Measurable: completion, drop-off, feedback, warning quality, save, and second-generation metrics defined.
- [x] Edge cases considered: warning/fail/unavailable/low-credit/timeout/partial-result/feedback/save covered.
- [x] No scope creep: does not redesign login, home, Scenario 02 full flow, Scenario 03 full flow, or production architecture.

---

## Design Sign-Off Question

是否批准按本规格进入 `[I] Implement`，更新 DD-001 规格和本地 HTML 原型，使首次 happy path 变为 `01.1 -> 01.2 -> 01.3 -> 01.6 -> 01.7`？
