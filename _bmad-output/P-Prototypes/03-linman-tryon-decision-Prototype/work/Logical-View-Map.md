# Logical View Map - 03 林曼的试穿决策

**Scenario**: `03-linman-tryon-decision`  
**Prototype**: `_bmad-output/P-Prototypes/03-linman-tryon-decision-Prototype/`  
**Confirmed By**: Sue  
**Confirmed Date**: 2026-05-14  
**Prototype Language**: 中文  
**Device Compatibility**: Mobile-Only  
**Design Fidelity**: Design System Components

---

## Source Specifications Read

- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03-linman-tryon-decision.md`
- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.1-tryon-entry/03.1-tryon-entry.md`
- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.2-import-reference/03.2-import-reference.md`
- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.3-tryon-setup/03.3-tryon-setup.md`
- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.4-tryon-waiting/03.4-tryon-waiting.md`
- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.5-tryon-result/03.5-tryon-result.md`
- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.6-history-collection/03.6-history-collection.md`
- `_bmad-output/C-UX-Scenarios/03-linman-tryon-decision/03.7-credit-purchase/03.7-credit-purchase.md`

`03.1-tryon-entry/Sketches/` exists but is currently empty. No sketch files were available for this analysis.

---

## Specification Coverage

| Step | Spec Status | Notes |
|------|-------------|-------|
| 03.1 tryon-entry | Complete page spec available | Ready for breakdown and prototype implementation |
| 03.2 import-reference | Prototype-draft page spec available | Draft built for review; not yet final-approved |
| 03.3 tryon-setup | Prototype-draft page spec available | Draft built for review; not yet final-approved |
| 03.4 tryon-waiting | Prototype-draft page spec available | Draft built for review; not yet final-approved |
| 03.5 tryon-result | Prototype-draft page spec available | Draft built for review; not yet final-approved |
| 03.6 history-collection | Prototype-draft page spec available | Draft built for review; not yet final-approved |
| 03.7 credit-purchase | Prototype-draft page spec available | Draft built for review; not yet final-approved |

---

## Logical View Mapping

| Scenario Step | Logical View | Build Status | Rationale |
|---------------|--------------|--------------|-----------|
| 03.1 tryon-entry | Tryon Entry View | Built | Complete page spec exists. The page introduces the immediate try-on decision flow, explains reference import, and shows credit cost context. |
| 03.2 import-reference | Reference Import View | Draft Built | Prototype-draft spec exists. The page imports an external reference image, handles empty/importing/imported/error states, and prepares the route into setup. |
| 03.3 tryon-setup | Tryon Setup View | Draft Built | Prototype-draft spec exists. The page confirms reference object, profile image, intent, and credits before generation. |
| 03.4 tryon-waiting | Tryon Waiting View | Draft Built | Prototype-draft spec exists. The page shows generation progress, task context, credit handling, processing steps, and waiting/failure recovery states. |
| 03.5 tryon-result | Tryon Result View | Draft Built | Prototype-draft spec exists. The page shows try-on result, recommendation reasons, caution notes, quick judgment feedback, and next actions. |
| 03.6 history-collection | History Collection View | Draft Built | Prototype-draft spec exists. The page saves the current try-on result to history, manages compare/favorite state, and keeps history/profile boundaries clear. |
| 03.7 credit-purchase | Credit Purchase View | Draft Built | Prototype-draft spec exists. The page recaps value after one useful try-on, shows balance and selectable credit plans, and simulates purchase/decline states. |

---

## Build Order

1. `03.1 Tryon Entry View` - built and approved.
2. `03.2 Reference Import View` - draft built and pending Sue review.
3. `03.3 Tryon Setup View` - draft built and pending Sue review.
4. `03.4 Tryon Waiting View` - draft built and locally accepted for scroll behavior; pending Sue spec review.
5. `03.5 Tryon Result View` - draft built and pending Sue review.
6. `03.6 History Collection View` - draft built and pending Sue review.
7. `03.7 Credit Purchase View` - draft built and pending Sue review.

This keeps the prototype grounded in prototype-draft specifications for each downstream screen while preserving Sue review before production handoff.

---

## Current View Ready for Review

**View**: Credit Purchase View  
**Source page**: `03.7-credit-purchase`  
**Purpose**: 林曼在看见一次试穿价值后，判断是否购买更多生成额度。  
**Entry Context**: 她已经从 03.5 结果页或 03.6 历史页看到奶油白短外套的试穿价值。  
**Exit Action**: 购买额度后继续试参考，或暂不购买并回到结果/历史。

**Known on-page interactions**:

- 查看刚才 1 个额度带来的价值回顾、当前余额、已消耗额度和下次预计消耗。
- 在轻量补充、决策小包、集中探索三种额度方案之间选择。
- 查看购买和生成消耗边界：购买不会自动生成，结果成功后才消耗生成额度。
- 评审 default、selected、purchasing、success、purchase-error、declined 六种状态。

---

## Open Dependencies

- `03.2`, `03.3`, `03.4`, `03.5`, `03.6`, and `03.7` need Sue review before final approval.
- If visual sketches are later added under `03.1-tryon-entry/Sketches/`, review them before implementing sections.

---

**Status**: 03.7 Draft Built  
**Next Step**: Review `03.2-import-reference.html`, `03.3-tryon-setup.html`, `03.4-tryon-waiting.html`, `03.5-tryon-result.html`, `03.6-history-collection.html`, and `03.7-credit-purchase.html`.
