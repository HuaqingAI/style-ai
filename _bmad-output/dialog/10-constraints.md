# Step 10: Constraints

## Opening Frame

Saga framed constraints as design parameters rather than blockers.

## Proposed Constraints

Saga proposed the following based on prior discussion:

- MVP should be built quickly for seed-user testing, not as a large complete product.
- Main costs come from image generation, storage, login/payment, and API access.
- The product depends on high-quality image generation and must support login, credits, upload, history, and result storage.
- Privacy/trust requires clear separation between one-time photo use and saved personal profile.
- The user-facing Style AI brand should feel lighter and more lifestyle-oriented than a corporate backend product.
- MVP scope should focus on personal image generation and universal try-on / try-style; no B2B, no human stylist service, no complex community.

## User Corrections / Additions

Sue added two hard constraints:

- 国内要可以访问。
- MVP 只考虑 image2 模型。

## Final Constraints

### Timeline

MVP should prioritize fast seed-user validation over broad feature completeness.

### Budget / Cost

Image generation is the primary variable cost. Free credits must be enough to show value but controlled enough to avoid runaway cost.

### Technical

- MVP must use image2 as the only image generation model.
- All AI capability must be wrapped by the product backend so users do not handle model/API complexity.
- No multi-model routing or model selection in MVP.
- Generation quality, identity resemblance, style stability, and failure handling are key technical validation areas.

### Domestic Access

- The product must be accessible in mainland China user environments.
- Login, image upload, generation, credits/payment, and result viewing must not depend on users solving network/API access themselves.
- Image upload, processing, result storage, and delivery should consider domestic access speed and reliability.

### Privacy / Trust

- Login is required.
- Personal image profile is optional.
- Product copy and UX must clearly distinguish one-time generation photos from saved reusable personal profiles.
- Users must be able to understand whether a photo is only used for the current generation or saved for future use.

### Scope

- MVP includes personal image generation and universal try-on / try-style.
- MVP excludes B2B merchant tools, human stylist services, complex social/community systems, and multi-model selection.

## Reflection Checkpoint

Saga summarized the constraint set. Sue confirmed: 可以.
