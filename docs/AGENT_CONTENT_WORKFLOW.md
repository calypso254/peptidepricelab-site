# Agent Content Workflow

Peptide Price Lab is moving from hand-authored full HTML pages to generated static pages.

The published output will still be static HTML with clean URLs such as:

```text
/blog/how-to-calculate-peptide-price-per-mg/index.html
/peptides/bpc-157/index.html
```

The source files should now be Markdown files with front matter under `src/`.

## Blog Posts

Create blog posts here:

```text
src/blog/[slug]/index.md
```

Use this layout:

```yaml
layout: layouts/blog-post.njk
```

Required front matter:

```yaml
---
layout: layouts/blog-post.njk
title: "How to Calculate Peptide Price Per Mg"
h1: "How to Calculate Peptide Price Per Mg (And Why Vial Price Misleads)"
description: "Vial price is meaningless without knowing the mg count. Learn how to calculate real peptide cost per mg."
ogTitle: "How to Calculate Peptide Price Per Mg | Peptide Price Lab"
ogDescription: "The formula, a worked example, and why per-mg pricing matters."
date: "2026-05-24"
readingTime: "5 min read"
lede: "Two vendors. Two prices. Same peptide. Without knowing what you are paying per milligram, there is no way to know which is actually cheaper."
---
```

Then write only the article body in Markdown or HTML. Do not include:

- `<!DOCTYPE html>`
- `<html>`, `<head>`, or `<body>`
- Header, nav, footer, logo, or global CSS
- Canonical, Open Graph, or JSON-LD tags

Those are handled by shared layouts.

## Research Notes

Create research notes here:

```text
src/peptides/[slug]/index.md
```

Use this layout:

```yaml
layout: layouts/research-note.njk
```

Required front matter:

```yaml
---
layout: layouts/research-note.njk
title: "BPC-157 Research Notes"
peptideName: "BPC-157"
h1: "BPC-157 Research Notes"
description: "BPC-157 research overview, common study themes, and price-per-mg context."
ogTitle: "BPC-157 Research Notes | Peptide Price Lab"
ogDescription: "A research-use overview of BPC-157 with pricing context."
date: "2026-05-24"
lede: "BPC-157 is a synthetic peptide commonly discussed in tissue repair and wound healing research contexts."
tags:
  - Tissue Repair
  - Wound Healing
stats:
  - label: "Common research focus"
    value: "Tissue repair"
    note: "Short supporting detail shown below the stat value."
  - label: "Typical listing unit"
    value: "5 mg"
    note: "Optional; omit this field if no subtext is needed."
  - label: "Comparison metric"
    value: "Price per mg"
    note: "Optional; keep it concise."
---
```

Then write only the research note body in Markdown or HTML.

## Linking Rules

Use root-relative links for internal site paths:

```text
/peptides/
/sources/
/assets/logos/peptide-price-lab-logo-default.svg
```

Do not hard-code `https://peptidepricelab.com` for internal links or assets.

## Logo Rules

Do not use the old WebP logo:

```text
Peptide_Price_Lab_Logo_Default_Standardized.webp
```

The shared header uses:

```text
/assets/logos/peptide-price-lab-logo-default.svg
```

Skin-specific logos are available at:

```text
/assets/logos/peptide-price-lab-logo-default.svg
/assets/logos/peptide-price-lab-logo-cyber-noir.svg
/assets/logos/peptide-price-lab-logo-malibu.svg
/assets/logos/peptide-price-lab-logo-rosewood.svg
```

## Build Commands

Install dependencies:

```bash
npm install
```

Build static output:

```bash
npm run build
```

Run local preview:

```bash
npm run serve
```
