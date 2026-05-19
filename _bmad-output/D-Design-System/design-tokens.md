# Design Tokens

**Status:** Started
**Last Updated:** 2026-05-13

Design tokens are extracted as components are added to the design system.

## Token Categories

### Colors

```yaml
brand:
  icon-background: "#111111"
  icon-mark: "#FAFAF7"
  spark-light: "#9D7AFF"
  spark-core: "#6D3DF7"
  spark-deep: "#7B52FA"
```

Additional color scales will be defined as product UI components are specified.

### Typography

- Font families
- Font sizes
- Font weights
- Line heights
- Letter spacing

### Spacing

- Spacing scale
- Padding values
- Margin values
- Gap values

### Layout

```yaml
app-icon-source-size: 1024
app-icon-safe-area: platform mask safe area
```

Product layout tokens will be defined as screens and reusable layout components are specified.

### Effects

```yaml
app-icon-corner-radius: platform-applied
```

Shadow, radius, transition, and animation tokens will be defined as product UI components are specified.

---

## Component-Specific Tokens

### Style AI App Icon System [icn-001]

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
  app-icon-safe-area: platform mask safe area

effects:
  app-icon-corner-radius: platform-applied
```

**Tokens will continue to be populated as components are specified.**
