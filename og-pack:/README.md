# Meet The Newcomers — Locked Player OG Template

This package is the locked production blueprint for dynamic player OG images.

## Output

- Canvas: **1200 × 630 px**
- Format: PNG
- Reference: `reference/kyle-allman-og-1200x630.png`
- Fixed background: `assets/background-1200x630.png`

The reference is not a loose mood board. It defines the final composition,
spacing, color hierarchy, portrait treatment and typography.

## Non-negotiable rules

- Modify the project's existing player OG system; do not build a separate social-card generator.
- Keep the homepage OG unchanged.
- Use the fixed background asset instead of recreating it with CSS or an image model.
- Render player data dynamically with `ImageResponse`.
- Do not render the evaluation sentence, summary or any paragraph.
- Show only the current competition badge.
- Keep the player grayscale inside the circular frame.
- Crop to head, neck and shoulders; hide old-team crests, sponsors and chest branding.
- Point both `og:image` and `twitter:image` to the same player-specific image.
- Use `twitter:card = summary_large_image`.

## Included files

- `assets/background-1200x630.png` — immutable background layer.
- `assets/mtn-logo.png` — production MtN mark.
- `assets/euroleague-badge.png` — competition badge used by the Kyle reference.
- `fonts/NimbusSans-Regular.otf` — exact regular font used in the reference.
- `fonts/NimbusSans-Bold.otf` — exact bold font used in the reference.
- `reference/kyle-allman-og-1200x630.png` — visual QA target.
- `reference/kyle-source.webp` — source portrait for crop testing.
- `template/layout-spec.json` — exact pixel positions, sizes and colors.
- `template/PlayerOgLayout.tsx` — deterministic layout blueprint.
- `CLAUDE_PROMPT.txt` — first-message implementation prompt.

## BSL logo

Use the official production BSL logo already present in the MtN project. Do not
use the BSL Report brand mark. It occupies the same `leagueBadge` rectangle
defined in `layout-spec.json`.

## QA

Render Kyle Allman first and compare it with the reference at 100% scale. The
background and all fixed positions must match. Only antialiasing differences
caused by the runtime are acceptable.
