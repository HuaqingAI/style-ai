---
project: style-ai
created: 2026-05-11
method: Whiteport Design Studio (WDS)
design_intent: D
design_status: handoff-ready
---

# 01: 小雨的首次真实预览

**Project:** style-ai
**Created:** 2026-05-11
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
让小雨在不被迫建档的前提下，用本次授权照片完成首次个人形象生成，并看到一个足够像自己、可用于判断的结果。

---

## Business Goal (Q2)

**Goal:** 验证首次真实预览价值
**Objective:** 20-50 个种子用户中，至少 60% 完成首次个人形象生成或试穿生成，并表示结果“像自己、可用于判断”。

---

## User & Situation (Q3)

**Persona:** 小雨 (Primary)
**Situation:** 小雨，26 岁，一线或新一线城市白领。她刚刷到几个心动的发型/穿搭参考，但越看越不确定自己适不适合；晚上在手机上打开 Style AI，想先用自己的照片看一次真实效果，再决定要不要继续探索。

---

## Driving Forces (Q4)

**Trigger:** 她刚刷到几个心动的发型/穿搭参考，但越看越不确定这些风格放到自己身上是否成立。

**Hope:** 她希望先看到一个足够像自己的风格预览，判断这个方向现实里能不能尝试。

**Worry:** 她担心照片被默认长期保存，或者生成结果不像本人反而误导判断。

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile
**Entry:** 她晚上刷小红书时又收藏了几个风格参考，想到自己一直判断不出来，就从 Sue 发来的种子测试邀请打开 Style AI 手机 App。她不是带着购买任务进来，而是想先验证“这个工具能不能让我看见自己”。

---

## Best Outcome (Q7)

**User Success:**
小雨完成首次上传和生成，看到一个足够像自己的结果，能说出“这个方向我可以判断”。

**Business Success:**
Style AI 记录一次有效首次生成，并获得“像自己 / 可用于判断”的核心反馈信号，支撑 60% 首次真实预览价值指标。

---

## Shortest Path (Q8)

1. **启动/登录页** — 小雨用种子测试账号进入，理解登录用于额度、历史和账号管理。
2. **首页/双入口页** — 她看到两个入口，并选择“生成我的形象方案”。
3. **照片上传/拍摄页** — 她在上传前看到本次照片、历史结果、常用形象档案的边界说明，并上传一张当前照片。
4. **照片质量引导/重试页** — 系统确认照片是否适合生成，并给出清晰的重试建议。
5. **个人形象生成设置页** — 她选择想先看的主流风格方向。
6. **生成等待页** — 她看到生成进度、本次消耗和失败处理说明。
7. **个人形象结果页** — 她看到本人风格预览、推荐理由、谨慎点和下一步动作。 ✓

---

## Trigger Map Connections

**Persona:** 小雨 (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** 想先看到真实的自己会变成什么样。
- ❌ **Fear:** 怕上传照片后被默认长期保存；怕 AI 生成不像本人，反而误导判断。

**Business Goal:** 验证首次真实预览价值；至少 60% 种子用户完成首次生成并表示结果“像自己、可用于判断”。

---

## Scenario Steps

Steps are outlined one at a time after scenario creation. The first step is processed automatically.

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 01.1 | `01.1-start-login/` | 小雨用种子测试账号进入，并理解登录和额度、历史、账号管理相关。 | 登录成功后进入首页。 |
| 01.2 | `01.2-home-dual-entry/` | 小雨看到两个主入口，并选择先生成自己的形象方案。 | 点击“生成我的形象方案”。 |
| 01.3 | `01.3-photo-upload/` | 小雨在上传前理解照片使用边界，并上传一张当前照片。 | 确认上传照片。 |
| 01.4 | `01.4-photo-quality-check/` | 小雨获得照片质量反馈，确认这张照片适合生成。 | 点击继续生成设置。 |
| 01.5 | `01.5-generation-setup/` | 小雨选择首次想看的主流风格方向。 | 点击开始生成。 |
| 01.6 | `01.6-generation-waiting/` | 小雨看到生成进度、额度消耗和失败处理说明。 | 生成完成后进入结果页。 |
| 01.7 | `01.7-image-result/` | 小雨看到本人风格预览、推荐理由、谨慎点和下一步动作。 | 首次真实预览成功。 ✓ |

**First step** (01.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** (that don't leave the step) are documented as storyboard items within each page spec.

## Page Specification Status

| Step | Spec File | Status | Updated |
|------|-----------|--------|---------|
| 01.1 | `01.1-start-login/01.1-start-login.md` | Handoff-ready textual spec | 2026-05-13 |
| 01.2 | `01.2-home-dual-entry/01.2-home-dual-entry.md` | Handoff-ready textual spec | 2026-05-13 |
| 01.3 | `01.3-photo-upload/01.3-photo-upload.md` | Handoff-ready textual spec | 2026-05-13 |
| 01.4 | `01.4-photo-quality-check/01.4-photo-quality-check.md` | Handoff-ready textual spec | 2026-05-13 |
| 01.5 | `01.5-generation-setup/01.5-generation-setup.md` | Handoff-ready textual spec | 2026-05-13 |
| 01.6 | `01.6-generation-waiting/01.6-generation-waiting.md` | Handoff-ready textual spec | 2026-05-13 |
| 01.7 | `01.7-image-result/01.7-image-result.md` | Handoff-ready textual spec | 2026-05-13 |

**Delivery Package:** `deliveries/DD-001-first-real-preview.yaml`  
**Test Scenario:** `test-scenarios/TS-001-first-real-preview.yaml`
