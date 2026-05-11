---
project: style-ai
created: 2026-05-11
method: Whiteport Design Studio (WDS)
design_intent: D
design_status: not-started
---

# 02: 小雨的二次风格探索

**Project:** style-ai
**Created:** 2026-05-11
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
让小雨在看完首次结果后，能低压力地继续尝试另一个风格方向，并把有用结果保存下来，形成二次生成行为。

---

## Business Goal (Q2)

**Goal:** 验证继续探索动机
**Objective:** 至少 30% 用户在首次生成后进行第二次生成。

---

## User & Situation (Q3)

**Persona:** 小雨 (Primary)
**Situation:** 小雨刚看完第一次个人形象结果，觉得其中一个方向“有点像自己，也能判断”，但还不确定是否最适合。她在同一晚继续留在 App 里，想换一个更日常或更明显不同的风格，看看有没有更稳的选择。

---

## Driving Forces (Q4)

**Trigger:** 她刚看完第一次结果，觉得有参考价值，但还不确定哪个风格方向更适合自己。

**Hope:** 她希望趁第一次结果还有参考价值时，再看一个不同方向，比较哪种更适合自己。

**Worry:** 她担心继续生成会浪费额度，或者结果之间没有明显差异，无法帮助她判断。

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile
**Entry:** 她从首次个人形象结果页进入，看完推荐理由和谨慎点后，对结果产生了基本信任。她看到“换一个风格看看”或类似继续探索入口，于是决定消耗一次额度再生成一个方向。

---

## Best Outcome (Q7)

**User Success:**
小雨完成第二次风格生成，能把两个方向放在心里比较，并保存一个她觉得有参考价值的结果。

**Business Success:**
Style AI 记录一次二次生成行为，并获得小雨对保存结果或常用形象的意愿信号，支撑 30% 二次生成率指标。

---

## Shortest Path (Q8)

1. **二次探索/换风格页** — 小雨从首次结果进入，看到可继续尝试的风格方向和本次额度消耗。
2. **保存结果页** — 第二次生成后，她保存一个有参考价值的结果，方便之后回看。
3. **保存常用形象提示页** — 系统在保存结果后提示她可选保存常用形象，下次少传一次，但不强迫。 ✓

---

## Trigger Map Connections

**Persona:** 小雨 (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** 想低成本、低压力地多试几种方向。
- ❌ **Fear:** 怕花了额度后结果无法帮助判断，或继续探索成本失控。

**Business Goal:** 验证继续探索动机；至少 30% 用户在首次生成后进行第二次生成。

---

## Scenario Steps

Steps are outlined one at a time after scenario creation. The first step is processed automatically.

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 02.1 | `02.1-second-style-exploration/` | 小雨从首次结果进入，看到可继续尝试的风格方向和本次额度消耗。 | 选择一个新的风格方向并开始生成。 |
| 02.2 | `02.2-save-result/` | 小雨保存一个有参考价值的结果，方便之后回看。 | 点击保存结果。 |
| 02.3 | `02.3-save-profile-prompt/` | 小雨看到可选保存常用形象的提示，理解这不是强迫建档。 | 选择暂不保存或保存常用形象，结束场景。 ✓ |

**First step** (02.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** (that don't leave the step) are documented as storyboard items within each page spec.
