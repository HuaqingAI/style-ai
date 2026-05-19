# Style AI App Icon System [icn-001]

**Type:** Content
**Category:** Brand identity icon
**Purpose:** Provide the primary Style AI app icon, symbol mark, monochrome mark, and wordmark lockup references for product and platform use.

---

## Overview

The Style AI app icon system is based on the approved **Reversible S / Future Spark** direction. The mark uses a bold continuous white S-shaped ribbon on a deep black square field, with a small purple spark as the secondary AI/style transformation cue.

Use this component for app icon exports, splash screen foregrounds, favicon, product header identity, launch/login brand moments, result-page watermarking, and share-image identity.

The white S silhouette is the primary identity. The purple spark is an accent only and should not become the dominant brand signal.

---

## Variants

- **app-icon-tile** - Full-square icon source with deep black background for Expo app icon and favicon.
- **adaptive-foreground** - Transparent centered foreground mark for Android adaptive icon and splash usage.
- **symbol-only** - Standalone reversible S mark for compact in-product identity.
- **mono-symbol** - Single-color version for cases where the purple spark is unavailable or visually noisy.
- **wordmark-lockup** - Symbol plus `Style AI` wordmark for launch, login, and high-trust product contexts.

---

## States

**Required States:**

- default - Full-color production mark.
- monochrome - Single-color mark that preserves the S silhouette without the spark.
- small-size - Mark tested at app-icon and header sizes where the S remains primary and the spark may reduce to a small accent.

**Optional States:**

- watermark - Low-presence mark for result pages and share images.
- disabled - Not applicable for static brand marks.

**State Descriptions:**

**Default:** Deep black square field, warm off-white S ribbon, small purple spark near the center crossing.

**Monochrome:** Single-color S mark without relying on the spark. This version must remain recognizable at small sizes.

**Small-size:** Preserve S recognition first. The spark may become visually subtle, but it must not distort the S or read as extra visual noise.

**Watermark:** Use reduced opacity and avoid competing with user-generated result imagery.

---

## Styling

### Visual Properties

**Size:** Source asset is 1024 x 1024. Production exports include 1024, 512, 256, 128, 64, 48, 32, and 16 px sizes.

**Shape:** Full-square source for platform cropping. Rounded corners are applied by iOS, Android, or preview contexts, not baked into the source SVG.

**Colors:**

- Background: `#111111`
- Primary mark: `#FAFAF7`
- Spark gradient: `#9D7AFF` to `#6D3DF7` to `#7B52FA`

**Typography:** Wordmark lockup uses English name `Style AI`; `Style` is Title Case and `AI` is uppercase.

**Spacing:** Keep clear safe-area padding around the S mark for iOS and Android adaptive icon masking.

### Design Tokens

```yaml
colors:
  brand:
    icon-background: "#111111"
    icon-mark: "#FAFAF7"
    spark-light: "#9D7AFF"
    spark-core: "#6D3DF7"
    spark-deep: "#7B52FA"

layout:
  app-icon-source-size: 1024
  app-icon-safe-area: "platform mask safe area; do not crop the S terminals"

effects:
  app-icon-corner-radius: "platform-applied"
```

### Figma Reference

**Figma Component:** Not configured.
**Node ID:** Not configured.
**Last Synced:** Not synced.

### Source Assets

- `_bmad-output/E-Assets/brand-logo/style-ai-reversible-s-app-icon.svg`
- `_bmad-output/E-Assets/brand-logo/style-ai-reversible-s-app-icon-mono.svg`
- `_bmad-output/E-Assets/brand-logo/style-ai-reversible-s-symbol.svg`
- `_bmad-output/E-Assets/brand-logo/style-ai-reversible-s-wordmark-lockup.svg`
- `_bmad-output/E-Assets/brand-logo/style-ai-app-icon-size-preview.png`
- `_bmad-output/E-Assets/brand-logo/style-ai-brand-context-preview.png`
- `_bmad-output/E-Assets/brand-logo/style-ai-expo-assets-preview.png`

### Production Assets

- `assets/images/icon.png`
- `assets/images/adaptive-icon.png`
- `assets/images/splash-icon.png`
- `assets/images/favicon.png`

### App Configuration

- `app.json` uses `./assets/images/icon.png` for the Expo app icon.
- `app.json` uses `./assets/images/splash-icon.png` with splash background `#111111`.
- `app.json` uses `./assets/images/adaptive-icon.png` with Android adaptive background `#111111`.
- `app.json` uses `./assets/images/favicon.png` for web favicon.

---

## Behavior

### Interactions

This is a static brand identity component and has no direct user interaction.

**Tap / Click:** No intrinsic action. If used inside a header, interaction belongs to the surrounding navigation component.

**Hover:** No hover treatment for the mark itself.

**Focus:** No focus treatment for the mark itself unless wrapped by an interactive element.

**Keyboard:** No keyboard behavior unless wrapped by an interactive element.

### Animations

No default animation. Avoid decorative spark animation in core product UI unless it serves a specific loading or transition moment.

---

## Accessibility

**ARIA Attributes:**

- Use accessible label `Style AI` when the mark communicates product identity.
- Use empty alt text or mark as decorative when the logo is repeated beside visible `Style AI` text.

**Keyboard Support:**

- None for the static mark.
- If wrapped in a pressable home link, Enter/Space behavior belongs to that wrapper.

**Screen Reader:**

Announce as `Style AI` when it is the only visible product identity. Do not announce decorative repeated instances.

---

## Usage

### When to Use

- App icon, favicon, splash screen, and adaptive icon surfaces.
- Launch and login screens where brand recognition supports trust.
- Compact product header identity.
- Result watermark or share-image identity, with restrained opacity.
- Documentation and design-system references for Style AI brand assets.

### When Not to Use

- Do not use as a generic AI sparkle icon.
- Do not use the spark alone as the brand mark.
- Do not reinterpret the S as two semicircles, circular arrows, refresh, or redo.
- Do not place the full app-icon tile inside dense UI where a symbol-only mark is more appropriate.
- Do not use as a button unless wrapped by a separate interactive component.

### Best Practices

- Keep the S silhouette continuous and dominant.
- Preserve high contrast between mark and background.
- Use monochrome when small-size clarity matters more than the purple spark.
- Keep enough padding for platform icon masks.
- Avoid extra stars, glow, purple-blue AI gradients, faces, body silhouettes, cosmetics symbols, camera aperture, or surveillance scan motifs.

---

## Used In

**Pages / Surfaces:**

- App icon
- Splash screen
- Android adaptive icon
- Web favicon
- Launch/login context preview
- Home header context preview
- Result watermark context preview
- Share-image context preview

**Usage Count:** 8 documented surfaces.

**Examples:**

- Expo app config - `icon`, `splash.image`, `android.adaptiveIcon.foregroundImage`, and `web.favicon`.
- Brand context preview - startup/login, homepage header, result watermark, and app icon placements.

---

## Related Components

- Future header logo component - should reference the symbol-only or wordmark-lockup variant.
- Future result watermark component - should reference the watermark state.
- Future loading/processing indicator - may borrow the spark motif only if it remains secondary and restrained.

---

## Version History

**Created:** 2026-05-13
**Last Updated:** 2026-05-13

**Changes:**

- 2026-05-13: Created first design system component from approved Reversible S / Future Spark logo assets.

---

## Notes

The approved logo direction came from the 2026-05-12 external exploration and subsequent vector cleanup. Treat the current SVG assets as the design-system source references unless Sue approves a later replacement.
