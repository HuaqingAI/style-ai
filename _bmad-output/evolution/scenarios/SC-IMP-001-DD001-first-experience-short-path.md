# SC-IMP-001: DD-001 首次生成短链路减负

**Improvement ID:** IMP-001  
**Activity:** WDS-8 Product Evolution / Scope Improvement  
**Date:** 2026-05-18  
**Scenario Source:** DD-001 / Scenario 01 `小雨的首次真实预览`  
**Status:** Pending Sue approval  

---

## Target

把 DD-001 首次真实预览从 7 个显性步骤压缩为 4 个用户感知步骤：

1. 进入
2. 选照片
3. 等待
4. 看结果

本次改进目标不是删除质量检查、生成设置、反馈、保存、历史、额度和常用形象能力，而是把它们从首次 happy path 的页面级负担改成自动处理、inline 轻提示、异常分支或行为触发。

核心业务目标保持不变：20-50 个种子用户中，至少 60% 完成首次个人形象生成或试穿生成，并表示结果“像自己、可用于判断”。

---

## Current State

现有 DD-001 首次路径为：

`01.1 启动/登录 -> 01.2 首页入口 -> 01.3 照片上传 -> 01.4 照片质量检查 -> 01.5 生成设置 -> 01.6 等待 -> 01.7 结果`

当前问题：

- `01.4-photo-quality-check` 是独立页面，合格照片也必须经过一次“审核关卡”。
- `01.5-generation-setup` 虽然默认有 AI 推荐，但仍要求首次用户在生成前理解风格方向、额度和可选说明。
- `01.7-image-result` 同时承载结果图、判断、推荐、谨慎点、详情、反馈、保存、常用形象和继续探索，首屏容易从“先看见自己”变成“阅读和管理结果”。
- 用户最想完成的是“快速看到一个像自己的结果”，但当前主链路把系统内部判断和长期管理概念提前暴露。

---

## Desired State

调整后的首次路径为：

`01.1 启动/登录 -> 01.2 首页入口 -> 01.3 选照片并自动创建任务 -> 01.6 等待 -> 01.7 看结果`

期望体验：

- 用户选中可用照片后，不再进入独立质量检查页和生成设置页。
- 系统自动选择首轮默认生成方向：适合日常判断的稳妥方向，变化可见但不突兀。
- 照片质量检查下沉到任务创建前：合格直接继续，轻微问题 inline 提示，严重问题才阻断并要求重新上传。
- 结果页第一屏只聚焦一个主结果图、一句判断、两个主动作：`换个方向` 和 `保存`。
- 详细原因、谨慎点、反馈原因、常用形象保存和历史管理都延后到用户主动动作或负向/不确定反馈之后。

---

## User Journey

### Entry Point

小雨从定向邀请入口打开 Style AI，登录后在首页选择“生成我的形象方案”。她的动机是先验证这个工具能不能让她看到一个像自己的结果，而不是配置风格参数。

### Current Flow

1. 小雨进入首页，选择首次形象生成。
2. 她选择一张当前照片。
3. 系统进入独立照片质量检查页。
4. 她阅读照片状态，再点击继续。
5. 系统进入生成设置页。
6. 她选择或确认一个风格方向，并看到额度说明。
7. 她点击开始生成。
8. 系统进入等待页。
9. 生成完成后进入结果页。
10. 结果页同时展示主图、推荐原因、谨慎点、反馈、保存和常用形象提示。

### Pain Points

- 照片选择后没有立即进入生成，用户会感觉还要被审核和配置。
- “AI 推荐”被包装成一个选项，仍要求用户理解自己要选什么。
- 质量检查和额度解释的时机偏早，会把系统风险转化为用户负担。
- 首次结果首屏如果出现太多模块，会削弱“我先看到自己”的价值感。

### Proposed Flow

1. 小雨进入首页，选择首次形象生成。
2. 她在 `01.3` 选择或拍摄一张照片。
3. 系统在本页或任务创建前自动检查照片质量。
4. 如果照片合格，按钮文案为“用这张生成预览”，点击后直接创建默认生成任务并进入等待页。
5. 如果照片有轻微问题，`01.3` inline 显示一句风险提示，但仍允许继续。
6. 如果照片严重不可用，`01.3` 阻断并只给一个主动作：重新上传。
7. `01.6` 等待页说明正在生成一个适合日常判断的稳妥方向，不要求用户配置。
8. `01.7` 首屏展示主结果图、一句判断、`换个方向`、`保存`。
9. 用户点负向或不确定反馈后，再展开原因标签和可选修正。
10. 用户点保存、第二次生成或进入试穿前，再触发常用形象保存提示。

---

## Success Criteria

- 首次 happy path 用户感知步骤不超过 4 步：进入、选照片、等待、看结果。
- 合格照片从 `01.3` 直接进入 `01.6`，不出现独立 `01.4` 页面。
- 首轮生成前不出现 `01.5` 风格方向选择或偏好填写页面。
- 轻微照片问题不阻断，只在 `01.3` inline 提示。
- 严重照片问题阻断，并提供单一明确动作：重新上传。
- `01.7` 首屏必须包含主结果图、一句判断、`换个方向`、`保存`。
- 反馈入口默认轻量；负向或“不确定”后才展开原因。
- 常用形象不在首轮生成前强制创建；保存、第二次生成或试穿前再提示。
- Scenario 02 的“换个方向”不得退化成复杂设置页。
- Scenario 03 在没有常用形象时仍允许继续试穿路径，不把 profile 作为前置门槛。

---

## Scope

### Pages Affected

- `01-xiaoyu-first-preview/01-xiaoyu-first-preview.md`
- `01.3-photo-upload`
- `01.4-photo-quality-check`
- `01.5-generation-setup`
- `01.6-generation-waiting`
- `01.7-image-result`

### Compatibility Checks

- `02.1-second-style-exploration`: 检查“换个方向”是否保持轻量选择，不复刻 `01.5` 的完整设置负担。
- `03.1-tryon-entry` and profile-dependent try-on steps: 检查没有 saved profile 时是否仍可通过当前照片或临时形象继续。

### Components Touched

- Photo Intake / photo picker
- Inline photo quality warning
- Severe photo blocking state
- Default generation task creation action
- Waiting page task status copy
- Result image viewer
- First-screen result judgment sentence
- Primary action group: `换个方向` / `保存`
- Quick feedback reaction and conditional reason expansion
- Save result and common profile prompt boundary

### Data Changes

Needed conceptually for production implementation, even if local HTML prototype can mock them first:

- `photoQualityStatus`: `pass | warning | fail | unavailable`
- `photoQualityReasons`: lightweight reason codes for warning/fail
- `defaultGenerationIntent`: first-run automatic intent, e.g. `daily_judgment_safe_direction`
- `generationTask.source`: `first_preview_auto_default`
- `resultJudgmentSentence`: AI/rules/template generated first-screen sentence
- `quickFeedback`: likeness/usefulness reaction plus optional issue tags
- `saveTarget`: history result first; common profile only after explicit user action

Open decisions for Design phase:

1. 默认生成方向的产品命名和解释。
2. 严重照片阻断的最低规则。
3. 一句判断的生成方式：AI、规则、模板，或组合。
4. `换个方向` 是直接生成，还是先给 2-3 个轻选择。
5. `保存` 默认保存的对象和后续 profile 提示时机。
6. 负向反馈后是只记录，还是给出修正/重生成入口。

### Risk Level

**Medium to High.**

原因：

- 这是结构性流程改动，不只是视觉调整。
- 质量检查和生成设置从页面级流程下沉为系统状态，需要明确数据和异常分支。
- 首次结果页首屏收敛会影响现有反馈、保存、常用形象和二次探索入口的展示优先级。
- 好处是当前 Expo 生产实现尚未落地 DD-001，改动主要发生在 WDS 规格和本地原型阶段，仍处于较低实现成本窗口。

---

## Before / After Summary

| Area | Before | After |
|---|---|---|
| Happy path | 7 个显性步骤 | 4 个用户感知步骤 |
| Photo quality | 独立检查页 | 自动检查、inline warning、严重才阻断 |
| Generation direction | 生成前选择 | 首轮默认，结果后再换方向 |
| Result first screen | 图、判断、原因、谨慎点、反馈、保存、profile | 主图、一句判断、换个方向、保存 |
| Feedback | 结果页显性面板 | 轻反应，负向/不确定后展开 |
| Profile | 结果页可提示 | 保存/二次生成/试穿前触发 |

---

## Approval Question

是否批准把 `IMP-001` 进入 `[D] Design Solution`，并按本场景更新 DD-001 规格和本地原型？
