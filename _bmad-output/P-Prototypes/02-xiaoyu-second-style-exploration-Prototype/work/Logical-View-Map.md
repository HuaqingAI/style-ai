# Logical View Map - 02 小雨的二次风格探索

**Scenario**: `02-xiaoyu-second-style-exploration`  
**Prototype**: `_bmad-output/P-Prototypes/02-xiaoyu-second-style-exploration-Prototype/`  
**Confirmed By**: Sue request to continue 02 prototype  
**Confirmed Date**: 2026-05-18  
**Prototype Language**: 中文  
**Device Compatibility**: Mobile-Only  
**Design Fidelity**: Design System Components

---

## Source Specifications Read

- `_bmad-output/C-UX-Scenarios/02-xiaoyu-second-style-exploration/02-xiaoyu-second-style-exploration.md`
- `_bmad-output/C-UX-Scenarios/02-xiaoyu-second-style-exploration/02.1-second-style-exploration/02.1-second-style-exploration.md`
- `_bmad-output/C-UX-Scenarios/02-xiaoyu-second-style-exploration/02.2-save-result/02.2-save-result.md`
- `_bmad-output/C-UX-Scenarios/02-xiaoyu-second-style-exploration/02.3-save-profile-prompt/02.3-save-profile-prompt.md`

---

## Specification Coverage

| Step | Spec Status | Notes |
|------|-------------|-------|
| 02.1 second-style-exploration | Complete page spec available | Ready for prototype implementation |
| 02.2 save-result | Prototype draft page spec created | Built as a draft pending Sue review |
| 02.3 save-profile-prompt | Prototype draft page spec created | Built as a draft pending Sue review |

---

## Logical View Mapping

| Scenario Step | Logical View | Build Status | Rationale |
|---------------|--------------|--------------|-----------|
| 02.1 second-style-exploration | Second Style Exploration View | Built | Complete page spec exists. The page introduces next-style choices, explains difference from first result, and shows credit cost. |
| 02.2 save-result | Save Result View | Draft built pending review | Prototype-draft page spec now defines result preview, comparison, save choice, and save states. |
| 02.3 save-profile-prompt | Save Profile Prompt View | Draft built pending review | Prototype-draft page spec now defines optional common-profile save, skip path, boundary copy, and save states. |

---

## Build Order

1. `02.1 Second Style Exploration View`
2. `02.2 Save Result View`
3. `02.3 Save Profile Prompt View`

---

## Current View

**View**: Save Profile Prompt View  
**Source page**: `02.3-save-profile-prompt`  
**Purpose**: 小雨保存历史结果后，可选保存常用形象，并理解这不是强迫建档。  
**Entry Context**: 她已经在 02.2 保存了一个有参考价值的历史结果。  
**Exit Action**: 选择保存常用形象或暂不保存后结束场景。

**Known on-page interactions**:

- 查看刚刚保存到历史的结果摘要。
- 理解历史结果与常用形象的区别。
- 保存常用形象、暂不保存，或保存失败后重试。

---

## Open Dependencies

- `02.2-save-result` needs Sue review because its page spec is a prototype draft derived from the scenario outline.
- `02.3-save-profile-prompt` needs Sue review because its page spec is a prototype draft derived from the scenario outline and product boundary rules.
- If visual sketches are added later, review them before changing `02.1`.

---

**Status**: 02.3 Draft Built Pending Review  
**Next Step**: Review `02.2-save-result` and `02.3-save-profile-prompt`; then run scenario 02 acceptance testing.
