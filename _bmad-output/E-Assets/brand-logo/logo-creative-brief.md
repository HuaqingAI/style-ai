# Style AI Logo Creative Brief

**Created:** 2026-05-11  
**Phase:** Lightweight brand anchor before Phase 4 UX Design  
**Status:** Draft for direction selection  

---

## Purpose

Style AI 现在不需要完整品牌手册，但需要一个足够清晰的 Logo 方向，作为后续启动页、登录页、首页、App 图标、结果页水印和视觉系统的共同锚点。

Logo 的任务不是显得“高级”或“AI 感强”，而是让目标用户一眼理解：这是一个可信、温和、能帮我先看见自己未来形象的个人风格工具。

---

## Strategic Message

**核心表达：先看见真实的自己，再做更有把握的风格选择。**

Logo 应该服务 Style AI 的核心心理命题：

- 用户想看到“我自己这样会怎样”，而不是别人好不好看。
- 用户需要推荐和避坑，但不希望被评判。
- 用户愿意探索，但前提是结果可信、照片使用边界清楚。
- 产品是日常变美新手的个人风格试验室，不是专业造型师工具，也不是泛化图片玩具。

---

## Brand Keywords

| Keyword | Meaning for Logo |
| --- | --- |
| 真实预览 | 有“看见自己”“镜像”“画面预演”的感觉 |
| 可信 | 清爽、稳定、克制，不像夸张 AI 滤镜工具 |
| 温和 | 不制造外貌压力，不尖锐、不评判 |
| 清晰 | 适合移动端小尺寸，识别快，不复杂 |
| 探索 | 有轻微变化、切换、可能性的暗示 |
| 日常变美 | 精致但不奢侈，亲近但不幼稚 |

---

## Avoid

- 过度奢侈品感：容易显得高冷、昂贵，不贴近日常新手。
- 医美/整形感：会提高隐私和外貌焦虑。
- 泛化 AI 符号：魔法棒、星星堆叠、紫蓝渐变脑图都太常见。
- 过度女性化：粉色单一、睫毛、口红、裙子图形会限制用户和品类。
- 监控/人脸扫描感：取景框、识别点、网格脸会削弱照片信任。
- 卡通头像：降低“可用于判断”的可信度。

---

## Recommended Direction

### Direction A: Mirror Window + Subtle Spark

**推荐作为主方向。**

图形由一个简化的镜面、窗口或圆角画框构成，内部有轻微反射、切换层或小面积光点。它表达“先看见自己”，同时保留一点 AI 生成和风格探索的暗示。

**Why it fits:**

- 直接连接首次真实预览的核心价值。
- 比人脸图形更安全，不会引发隐私或审美评判感。
- 可以自然扩展为 App 图标、启动页标识和结果页水印。
- 视觉上比纯文字 Logo 更容易形成移动端识别资产。

**Risk to control:**

- 不要做成普通化妆镜或自拍 App。
- 光点只作为辅助，不要让 Logo 变成泛化 AI 工具。

---

## Secondary Directions

### Direction B: Style Compass

以轻量方向标、路径或多个风格节点表达“帮我找到适合自己的方向”。

**Strength:** 更强调推荐、判断和避坑。  
**Weakness:** 可能显得偏工具、偏咨询，少了“真实预览”的第一价值。

### Direction C: Try-On Frame

用两张重叠图片卡、前后对比或替换动作表达“把参考图放到我身上”。

**Strength:** 很适合万能试穿/试造型入口。  
**Weakness:** 作为主 Logo 会偏功能，不够品牌化。

**Use suggestion:** 主 Logo 用 Direction A；Direction C 可以发展成试穿功能图标。

### Direction D: Style Portal / Liquid Glass

用一个更具当代移动应用质感的“风格入口”表达 Style AI：半透明玻璃、柔和折射、流动的 S 形空间或预览门户，强调“进入一个可以看到未来形象的空间”，而不是字面化的镜子。

**Strength:** 更潮流、更适合 App icon，也更容易形成独特的品牌记忆点。
**Weakness:** 如果质感过重，会牺牲 logo 的单色可用性；需要保留一个可抽象成单色符号的核心形状。

**Use suggestion:** 下一轮 App icon 优先探索 Direction D。若有候选成立，再反向提炼出单色 symbol 和 wordmark lockup。

### Selected Direction: Reversible S / Future Spark

Sue selected a stronger app icon direction from external exploration on 2026-05-12:

`_bmad-output/E-Assets/brand-logo/style-ai-selected-app-icon-reference-2026-05-12.png`

The chosen direction uses a bold white `S`-like reversible transformation stroke on a deep black rounded-square field, with a small central spark as the AI/style transformation cue.

**Why it fits:**

- Stronger app icon silhouette than the earlier mirror/window explorations.
- More memorable: the `S` can connect to Style without relying on a literal wordmark.
- Gender-neutral: no face, body, hair, makeup, clothing, or beauty-category symbol.
- More scalable: high contrast and simple geometry should hold better at small mobile sizes.
- Can support both app icon and symbol-only brand use.

**Risks to control:**

- The purple spark can easily become generic AI magic; refine it into a smaller, more controlled highlight.
- The arrow-like upper terminal may imply refresh/redo if it becomes too literal.
- The current source is a raster reference, not production-ready. It needs clean redrawing/vectorization, optical spacing, corner radius normalization, and export as app icon assets.
- A monochrome version must still read clearly without the central color spark.

**Refinement note, 2026-05-12:**

The approved reference should be treated as a single continuous stylized `S` glyph. Do not reinterpret it as two offset semicircles, two circular arrows, a refresh loop, or a star-centered AI badge. The white S silhouette is the primary identity; the purple spark is a small central accent only.

Implementation note: Sue provided a third-party PNG-to-SVG trace on 2026-05-12. Use its three main paths as the better structural reference: upper S ribbon, lower S ribbon, and the purple spark. Do not use the trace wholesale because it contains background paths, gray edge artifacts, and small color speckles from raster conversion.

Current draft assets:

- `style-ai-reversible-s-app-icon.svg`
- `style-ai-reversible-s-app-icon-mono.svg`
- `style-ai-reversible-s-symbol.svg`
- `style-ai-reversible-s-wordmark-lockup.svg`
- `exports/style-ai-app-icon-*.png`
- `style-ai-app-icon-size-preview.png`

---

## Logo System

| Usage | Form |
| --- | --- |
| App icon | Symbol only，优先使用 Mirror Window 图形 |
| 启动/登录页 | Symbol + `Style AI` wordmark |
| 首页顶部 | 小尺寸 wordmark，避免压过两个核心入口 |
| 结果页 | 低存在感水印或角标，不影响用户判断图片 |
| 分享图 | Symbol + Style AI，小而清晰 |
| 购买/额度页 | 使用 wordmark 增强信任，不用装饰性大图形 |

---

## Color Direction

建议先用一个克制但不冰冷的组合，避免单一粉色或紫蓝 AI 渐变：

| Role | Color | Purpose |
| --- | --- | --- |
| Base Ink | `#171717` | 信任、文字和主标识 |
| Soft Surface | `#FAFAF7` | 干净背景，减少焦虑感 |
| Warm Accent | `#FF6B6B` | 日常变美、亲近、活力 |
| Clear Accent | `#4DB6AC` | 清晰、判断、可信科技感 |
| Tiny Highlight | `#F4C430` | 少量用于光点，不做大面积主色 |

Logo 本体应优先支持单色版本。彩色只作为 App icon、启动页或营销图中的增强版本。

---

## Typography

- `Style AI` 保持英文名，`Style` Title Case，`AI` 大写。
- 字体气质：现代、人性化、清晰，不要过度圆润或奢侈品高反差。
- 字重：Medium 或 Semibold，移动端小尺寸要稳。
- 字距：正常，不做夸张拉伸。

---

## First Concept Prompts

Use these prompts to generate rough explorations. Keep app icon exploration separate from wordmark/logo lockup exploration, because the constraints are different.

### App Icon Exploration Prompt

Use this prompt when generating mobile app icon concepts:

```text
Create 6 distinct app icon concept directions for a mobile app named "Style AI".
The app helps everyday people preview realistic versions of themselves in different hairstyles, outfits, makeup, eyewear, facial hair, accessories, and clothing before making real-world style decisions.

Primary concept: a clean mirror, window, rounded image frame, or preview portal that suggests "seeing my future self", with only a very subtle AI-style spark, reflection, or transformation highlight.

Format: show six separate 1024x1024 square app icon concepts on a clean white presentation board. Each icon should be a single centered symbol inside its own rounded-square app icon tile. No wordmark, no text, no captions, no numbering.

App icon requirements: strong silhouette, immediately recognizable at small sizes, simple geometry, works at 24px, works in monochrome, suitable for iOS and Android adaptive icon adaptation, centered composition, clear safe-area padding, no thin decorative details near the edges.

Style: minimal vector-friendly logo, modern, trustworthy, warm, clear, restrained, gender-neutral, inclusive, polished but still exploratory.

Color direction: near-black base (#171717), off-white surface (#FAFAF7), optional warm coral accent (#FF6B6B), optional clear teal accent (#4DB6AC), optional tiny golden highlight (#F4C430). The icon must still work as a single-color mark.

Avoid: visible female face, visible male face, gendered silhouette, eyelashes, lips, long-hair beauty profile, cosmetics symbols, luxury fashion monogram, medical beauty or plastic surgery feeling, surveillance or face-scan UI, camera aperture, generic AI magic wand, excessive stars, purple-blue AI gradient, pink-only palette, detailed portrait, photorealistic rendering, 3D mockup, shadows, texture, watermark, any text.
```

### Trend App Icon Exploration Prompt

Use this prompt when the first simple vector direction feels too generic or not fashion-forward enough:

```text
Create 6 distinct high-quality app icon concept directions for a mobile app named "Style AI".
The app helps everyday people preview realistic future versions of their personal style across hair, outfits, makeup, eyewear, facial hair, accessories, and clothing before making real-world choices.

Creative direction: Style Portal / Liquid Glass. The icon should feel like a contemporary fashion-tech app: a refined portal, reflective window, translucent glass layer, morphing S-shaped ribbon, or softly refracted preview frame that suggests "entering a space where I can see my future style". The result should feel current, premium, warm, and usable, not corporate and not cute.

Format: show six separate 1024x1024 square app icon concepts on a clean white presentation board in a 2x3 grid. Each icon is a single centered symbol inside its own rounded-square app icon tile. No wordmark, no text, no captions, no numbering.

App icon requirements: strong silhouette, recognizable at 24px, centered composition, clear safe-area padding, suitable for iOS and Android adaptive icon adaptation. The visual can have rich material depth, but the core shape must be simple enough to later simplify into a monochrome symbol.

Visual quality: polished app-store-ready icon exploration, soft glassmorphism, subtle depth, crisp edges, refined highlights, controlled gradients, high-end mobile product feel, fashion-tech rather than beauty salon. Use material texture and lighting sparingly; no clutter.

Color direction: near-black or deep charcoal base (#171717), warm off-white surface (#FAFAF7), coral accent (#FF6B6B), clear teal accent (#4DB6AC), tiny warm gold highlight (#F4C430). Gradients may be used only if they feel modern and restrained; avoid purple-blue AI gradient and pink-only palette.

Avoid: visible female face, visible male face, gendered body silhouette, eyelashes, lips, long-hair beauty profile, cosmetics symbols, clothing hanger, luxury monogram, medical beauty or plastic surgery feeling, surveillance or face-scan UI, camera aperture, generic AI magic wand, star overload, cartoon style, detailed human portrait, busy pattern, excessive 3D, heavy shadows, watermark, any text.
```

### Logo Lockup Exploration Prompt

Use this prompt when generating symbol + wordmark explorations:

```text
Create 6 distinct logo concept marks for a mobile app named "Style AI".
The app helps everyday people preview realistic versions of themselves in different hairstyles, outfits, makeup, eyewear, facial hair, accessories, and clothing before making real-world style decisions.

Primary concept: a clean mirror, window, or rounded image frame that suggests "seeing my future self", with a very subtle AI-style spark or reflection. The mark should feel trustworthy, warm, clear, and modern, not luxury fashion, not medical beauty, not surveillance, not a generic AI magic wand.

Style: minimal vector logo, gender-neutral, inclusive, mobile app icon ready, strong silhouette, works at 24px, works in monochrome.
Color direction: near-black base, warm coral accent, clear teal accent, optional tiny golden highlight. No purple-blue gradient, no pink-only palette, no cartoon face, no detailed human portrait, no visible gendered human silhouette.

Output: show symbol-only marks plus a small wordmark lockup reading "Style AI".
```

---

## Decision For Next Step

Selected next step: validate the refined **Selected Direction: Reversible S / Future Spark** candidates in real product contexts.

Do not continue broad logo exploration unless this direction fails in small-size or real-page testing. Next work should focus on:

1. compare `style-ai-app-icon-size-preview.png` against the selected raster reference;
2. validate inside startup/login page, homepage header, result watermark, and app icon contexts;
3. if approved, export production iOS/Android/Expo assets from the SVG source;
4. only then replace files under `assets/images`.

### Reference-Faithful Generation Prompt

Use this prompt when trying the chosen direction in other image tools:

```text
Create a refined mobile app icon for "Style AI" based on this reference direction: a deep black app icon tile with one bold, continuous white stylized S-shaped ribbon. The S should feel like a single flowing glyph, not two separate semicircles and not two circular arrows. The upper-right terminal may have a small angled cut/arrow-like edge, but it must remain part of the S silhouette and must not read as a generic refresh icon. Add one small purple four-point spark near the center-left crossing of the S as a subtle AI/style transformation accent.

The icon must be gender-neutral and inclusive: no faces, no body silhouettes, no hair profile, no lips, no eyelashes, no makeup/cosmetics symbol, no clothing hanger, no camera aperture, no surveillance scan UI, no magic wand, no extra stars, no text.

Style: app-store-ready, high contrast, premium but simple, vector-friendly, crisp edges, strong silhouette, readable at 24px, works in monochrome. Keep clear safe-area padding for iOS and Android adaptive icon use. The white S is the brand identity; the purple spark is secondary.
```
