---
project: style-ai
created: 2026-05-11
method: Whiteport Design Studio (WDS)
design_intent: D
design_status: not-started
---

# 03: 林曼的试穿决策

**Project:** style-ai
**Created:** 2026-05-11
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
让林曼把一个具体的外部参考图快速试到自己身上，获得能帮助购买或改变决策的效果预览与适配判断。

---

## Business Goal (Q2)

**Goal:** 验证额度付费意愿
**Objective:** 10%-20% 用户愿意购买生成额度，或明确表示愿意为更多生成付费。

---

## User & Situation (Q3)

**Persona:** 林曼 (Secondary)
**Situation:** 林曼，31 岁，城市白领。她在电商、小红书、直播间或线下店看到一件想买的衣服、一个想尝试的发型，已经有具体对象了，但卡在“这个放到我身上会不会合适”，于是用手机打开 Style AI 先试一下。

---

## Driving Forces (Q4)

**Trigger:** 她看到一个具体想买或想尝试的参考对象，但不确定放到自己身上是否合适。

**Hope:** 她希望尽快把外部参考图变成自己身上的效果，马上判断值不值得买或改。

**Worry:** 她担心花了额度还是没有明确结论，或者流程太慢赶不上当下的决策窗口。

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile
**Entry:** 她在小红书或电商页面看到心动参考图，已经想买或想改造，却还在犹豫。她从同一张图直接导入 Style AI，想先把这个对象试到自己身上，再决定要不要继续。

---

## Best Outcome (Q7)

**User Success:**
林曼完成一次参考图导入和本人试穿/试造型，获得明确的推荐程度、谨慎点和可保存对比的结果。

**Business Success:**
Style AI 记录一个高意图试穿决策场景，并在结果后呈现额度购买入口，验证用户是否愿意为更多决策场景付费。

---

## Shortest Path (Q8)

1. **试穿/试造型入口页** — 林曼进入即时决策入口，开始处理具体参考对象。
2. **外部参考图导入页** — 她从相册、截图或当前页面导入参考图。
3. **试穿/试造型设置页** — 她确认参考对象和本人照片或常用形象。
4. **生成等待页** — 她看到生成进度、本次消耗和失败处理说明。
5. **试穿/试造型结果页** — 她看到本人效果、推荐/谨慎理由和下一步建议。
6. **历史/收藏页** — 她把结果加入对比或收藏，便于继续判断。
7. **额度/购买页** — 她在看见价值后判断是否继续购买额度。 ✓

---

## Trigger Map Connections

**Persona:** 林曼 (Secondary)

**Driving Forces Addressed:**
- ✅ **Want:** 想在购买或改变前快速做判断。
- ❌ **Fear:** 怕花了额度还是没有明确结论；怕流程太慢赶不上即时决策。

**Business Goal:** 验证额度付费意愿；10%-20% 用户愿意购买生成额度，或明确表示愿意为更多生成付费。

---

## Scenario Steps

Steps are outlined one at a time after scenario creation. The first step is processed automatically.

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 03.1 | `03.1-tryon-entry/` | 林曼进入即时决策入口，开始处理具体参考对象。 | 选择导入外部参考图。 |
| 03.2 | `03.2-import-reference/` | 林曼从相册、截图或当前页面导入参考图。 | 确认导入参考图。 |
| 03.3 | `03.3-tryon-setup/` | 林曼确认参考对象和本人照片或常用形象。 | 点击开始生成。 |
| 03.4 | `03.4-tryon-waiting/` | 林曼看到生成进度、本次消耗和失败处理说明。 | 生成完成后进入结果页。 |
| 03.5 | `03.5-tryon-result/` | 林曼看到本人效果、推荐/谨慎理由和下一步建议。 | 选择保存、对比或继续判断。 |
| 03.6 | `03.6-history-collection/` | 林曼把结果加入对比或收藏，便于继续判断。 | 回到结果页或进入额度页。 |
| 03.7 | `03.7-credit-purchase/` | 林曼在看见价值后判断是否继续购买额度。 | 完成购买决策。 ✓ |

**First step** (03.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** (that don't leave the step) are documented as storyboard items within each page spec.
