---
project: style-ai
created: 2026-05-11
method: Whiteport Design Studio (WDS)
design_intent: D
design_status: not-started
---

# 04: 小雨的种子用户反馈

**Project:** style-ai
**Created:** 2026-05-11
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
让小雨在看完生成结果后，用很轻的方式在结果页内反馈结果像不像、能不能用于判断、哪里不对，帮助产品记录可行动的质量问题。

---

## Business Goal (Q2)

**Goal:** 建立高质量学习闭环
**Objective:** 至少 5 个用户给出具体反馈，并记录生成失败、不像本人、风格跑偏、照片质量等关键问题。

---

## User & Situation (Q3)

**Persona:** 小雨 (Primary)
**Situation:** 小雨刚看完一次生成结果，觉得结果整体有价值，但其中某些地方不像自己、风格略跑偏，或者她不确定能不能真的拿来判断。她愿意顺手留下反馈，因为她希望下次生成更准。

---

## Driving Forces (Q4)

**Trigger:** 她刚看完一次生成结果，感觉整体有价值，但发现有些地方不像自己或还不能判断。

**Hope:** 她希望轻松告诉产品哪里像、哪里不像，让下一次生成更准。

**Worry:** 她担心反馈太麻烦，或者说了也不会影响结果。

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile
**Entry:** 她从个人形象结果页或试穿结果页看到轻量反馈入口，在继续探索前顺手点开。入口不是强制弹窗，而是贴着结果判断出现，让她可以快速表达“像不像、能不能判断、哪里不对”。

---

## Best Outcome (Q7)

**User Success:**
小雨在不被打断的情况下提交一条具体反馈，并知道可以继续重试或探索。

**Business Success:**
Style AI 收到结构化质量反馈，能把“不像本人、风格跑偏、照片问题、无法判断”等问题记录为下一轮优化线索。

---

## Shortest Path (Q8)

1. **个人形象结果页 / 试穿结果页** — 小雨在结果页内打开轻量反馈抽屉，选择“像不像、能不能判断、哪里不对”等选项并提交。 ✓

---

## Trigger Map Connections

**Persona:** 小雨 (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** 想知道为什么适合或为什么要谨慎，并希望结果越来越可判断。
- ❌ **Fear:** 怕 AI 生成不像本人，反而误导判断。

**Business Goal:** 建立高质量学习闭环；至少 5 个用户给出具体反馈，并记录生成失败、不像本人、风格跑偏、照片质量等关键问题。

---

## Scenario Steps

Steps are outlined one at a time after scenario creation. The first step is processed automatically.

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 04.1 | `04.1-result-quick-feedback-panel/` | 小雨在结果页内选择“像不像、能不能判断、哪里不对”等轻量反馈项。 | 提交反馈后回到继续探索或重试。 ✓ |

**First step** (04.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** (that don't leave the step) are documented as storyboard items within each page spec.
