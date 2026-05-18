# Scenario 01: 小雨的首次真实预览 - Prototype Roadmap

**Scenario**: 01-xiaoyu-first-preview  
**Delivery**: DD-001 first real preview  
**Pages**: 01.1-start-login through 01.7-image-result  
**Device Compatibility**: Mobile-Only (375px-428px)  
**Design Fidelity**: Design System Components  
**Languages**: 中文 UI, no language switcher  
**Last Updated**: 2026-05-18

---

## Scenario Overview

**User Journey**: 小雨通过定向邀请入口进入 Style AI，在明确照片和形象档案边界的前提下，上传当前照片，完成首次个人形象生成，并看到一个足够像自己的风格预览结果。

**Pages in this Scenario**:

1. `01.1-start-login` - 启动/登录页，包含品牌欢迎、邀请码、手机号登录、Google 登录和登录边界说明。
2. `01.2-home-dual-entry` - 首页双入口，小雨选择先生成自己的形象方案。
3. `01.3-photo-upload` - 照片上传页，说明本次照片、历史结果和常用形象档案的边界。
4. `01.4-photo-quality-check` - 照片质量检查页，确认照片是否适合生成并给出重试建议。
5. `01.5-generation-setup` - 生成设置页，选择首次想看的主流风格方向。
6. `01.6-generation-waiting` - 生成等待页，展示进度、额度消耗和失败处理说明。
7. `01.7-image-result` - 结果页，展示本人风格预览、推荐理由、谨慎点和下一步动作。

---

## Device Compatibility

**Type**: Mobile-Only

**Reasoning**: DD-001 是移动 App 的首次真实预览链路，用户主要在手机上从定向邀请入口或桌面启动进入。首轮原型优先验证移动端信息密度、触控流程、照片上传和生成等待体验；访问限制由定向推广、邀请码、手机号白名单或后台控制承接，不由页面文案强调。

**Test Viewports**:

- iPhone SE (375px x 667px) - 最小常见尺寸，验证内容是否拥挤。
- iPhone 14 Pro (393px x 852px) - 标准尺寸，作为主要验收视口。
- iPhone 14 Pro Max (428px x 926px) - 较大手机，验证舒适间距和首屏节奏。

**Optimization Strategy**:

- Touch-first controls with no hover dependency.
- Single-column mobile layouts.
- Fixed bottom or primary actions only when they do not hide critical content.
- No tablet or desktop breakpoints in the first prototype.
- No Figma-driven pixel matching in this slice.

---

## Design Approach

**Selected Fidelity**: Design System Components

Use the existing Style AI design system and brand assets as the visual source:

- `_bmad-output/D-Design-System/design-tokens.md`
- `_bmad-output/D-Design-System/components/style-ai-app-icon-system.md`
- `_bmad-output/E-Assets/brand-logo/style-ai-reversible-s-wordmark-lockup.svg`
- `_bmad-output/E-Assets/brand-logo/style-ai-reversible-s-symbol.svg`

The current approved design-system component is `icn-001` (Style AI App Icon System). Product UI components for DD-001 should remain prototype-local until the first vertical slice reveals which patterns deserve promotion into the design system.

---

## Folder Structure

**HTML Files** (root level, created page by page):

```text
01.1-start-login.html
01.2-home-dual-entry.html
01.3-photo-upload.html
01.4-photo-quality-check.html
01.5-generation-setup.html
01.6-generation-waiting.html
01.7-image-result.html
```

**Supporting Folders**:

- `data/` - Demo data JSON files.
- `work/` - Planning files, one per page.
- `stories/` - Just-in-time section implementation guides.
- `shared/` - Shared JavaScript utilities and prototype API.
- `components/` - Reusable prototype UI components.
- `pages/` - Page-specific scripts when a page is complex.
- `assets/` - Prototype-local images, icons, and copied brand assets if needed.

---

## Demo Data

Primary file: `data/demo-data.json`

Default fixture:

- User: 小雨
- Demo invite code: `SEED-XIAOYU-001`
- Issued by: Sue
- Phone: `13800000001`
- Quota: 1 personal image generation
- Starting state: not logged in, no uploaded photo, no persistent profile, no generation history

---

## Prototype Status

| Page | Status | Sections | Last Updated | Notes |
|------|--------|----------|--------------|-------|
| 01.1-start-login | Built | 5/5 | 2026-05-14 | Login page built and now navigates to the home prototype |
| 01.2-home-dual-entry | Built | 4/4 | 2026-05-14 | Dual-entry home with first-time, returning, low-credit, unavailable states, and real navigation to photo upload |
| 01.3-photo-upload | Built | 4/4 | 2026-05-14 | Reusable photo intake instance for personal-style generation; camera/album actions, selected preview, permission/error states, photo tips, and session-photo boundary |
| 01.4-photo-quality-check | Built | 1/1 | 2026-05-14 | Lightweight preflight inside the generation path with checking, pass, warning, fail, and unavailable states |
| 01.5-generation-setup | Built | 1/1 | 2026-05-14 | Full generation setup with photo context, five style directions, optional note, credit summary, no-credit, submitting, and submit-error states |
| 01.6-generation-waiting | Built | 1/1 | 2026-05-14 | Async waiting page with queued, generating, finalizing, success, timeout, and failed states; credit handling note, progress list, and recovery actions |
| 01.7-image-result | Accepted | 1/1 | 2026-05-18 | Fixed-atlas/App-composed result page with primary preview, quick judgment strip, three recommended hairstyle options, avoid comparison, expandable analysis detail, next actions, common-profile prompt, and seed feedback panel |

---

## Development Workflow

1. Analyze one page specification.
2. Create one page work file in `work/`.
3. Break the page into logical sections.
4. Create section story files just in time.
5. Implement and verify each section before moving to the next.
6. Run final integration testing across the scenario.

---

## Testing Requirements

**Device Testing**:

- iPhone SE (375px x 667px)
- iPhone 14 Pro (393px x 852px)
- iPhone 14 Pro Max (428px x 926px)
- Portrait orientation
- No horizontal scroll
- Touch targets usable

**Functional Testing**:

- Invite code, phone, and Google login validation.
- Phone login path mock behavior.
- Error and loading states.
- Navigation from each page to the next.
- Demo data persistence across the prototype flow.

---

## Change Log

### 2026-05-13

- Created prototype environment for DD-001 first real preview.
- Recorded Mobile-Only compatibility with default iPhone test viewports.
- Recorded Design System Components fidelity.
- Created default 小雨 seed-user demo data.

### 2026-05-14

- Built `01.2-home-dual-entry.html` with authenticated header, credit snapshot, primary personal-style entry, secondary try-on entry, empty-history prompt, and prototype state controls.
- Updated `01.1-start-login.html` success behavior to navigate to the newly built home page.
- Built `01.3-photo-upload.html` with upload boundary disclosure, camera/album simulated actions, selected-photo preview, recoverable permission/error states, photo tips, and navigation toward photo quality check.
- Updated `01.2-home-dual-entry.html` primary action to perform a real navigation to `01.3-photo-upload.html`.
- Clarified `01.3-photo-upload` as a reusable Photo Intake instance. The selected-photo CTA now uses “用这张照片继续生成”; after 01.4 was completed, the route is `01.3 -> 01.4 -> 01.5` so quality preflight stays inside the generation path.
- Built `01.4-photo-quality-check.html` as a standalone lightweight photo preflight page with selected-photo preview, quality summary, checklist, recovery actions, and prototype controls for checking/pass/warning/fail/unavailable states.
- Integrated `01.4` back into the main path after completion: `01.3-photo-upload.html` now routes to `01.4-photo-quality-check.html`, and pass/warning states continue to `01.5-generation-setup.html`.
- Built `01.5-generation-setup.html` with photo context, five style directions, optional note, credit summary, no-credit, submitting, and submit-error states.
- Built `01.6-generation-waiting.html` with async generation status, progress ring/bar, success-only credit deduction note, processing detail list, timeout/failed recovery actions, and prototype controls for queued, generating, finalizing, success, timeout, and failed states.
- Built `01.7-image-result.html` with a generated-result viewer, recommendation explanation, caution note, save actions, optional common-profile prompt, seed feedback, and prototype controls for default, partial-result, load-error, and feedback-submitted states.

### 2026-05-18

- Completed local DD-001 prototype acceptance after the `01.7` fixed-atlas redesign and hairstyle recommendation corrections.
- Acceptance report: `_bmad-output/P-Prototypes/01-xiaoyu-first-preview-Prototype/reviews/DD-001-local-prototype-acceptance-2026-05-18.md`.
- Verified invite-code happy path from `01.1-start-login.html` through `01.7-image-result.html`.
- Verified `01.7` at 375, 393, and 428 px widths with no horizontal overflow, no broken images, and no browser console errors.
- Verified `01.7` result interactions: recommendation switching to `法式八字`, expandable analysis detail, looks-like-me/useful-for-judgment capture, issue tag selection, and feedback submission.
- Next: proceed to BMad Architect walkthrough or development planning; keep native Expo permission/backend/API validation as implementation work.

---

**Version**: 1.0  
**Status**: Local Prototype Accepted
