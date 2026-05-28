# Research-Note Template — How to fit your content in

This is the **target**: the research-note layout now produces the canvas design
(oversized serif title + "Per-mg this week" price card + tag pills + sectioned
editorial body + quick-reference grid). Your agents/Cowork map existing notes
into it.

**You do NOT rewrite article prose.** The markdown body is rendered untouched.
You add a few frontmatter fields and the template + CSS do the layout.

## Files in this update
```
src/_includes/layouts/research-note.njk   REPLACE — the new template (hero + price card)
css/components.css                          REPLACE — all the matching styles (§11b)
```

## Frontmatter contract

```yaml
---
layout: layouts/research-note.njk
peptideName: "Tirzepatide"          # hero title (or use h1)
category: "GLP-1 · Metabolic"        # hero eyebrow (right of folio)
folio: 7                             # optional folio number in the eyebrow
lede: "Tirzepatide targets two…"     # one-sentence italic standfirst
tags:                                # rendered as pills + /tags/ links
  - FDA-Approved                     #   "FDA-Approved" auto-styles green
  - GLP-1
  - Metabolic Health
price:                               # drives the oxblood "Per-mg this week" card
  median: "$9/mg"                    #   the big number
  low: "$4"
  high: "$15"
  vendors: 12                        #   "Median across N vendors"
stats:                               # → the Quick-reference grid (you already have this)
  - { label: "Class",        value: "Dual GIP/GLP-1 agonist" }
  - { label: "Common vial",  value: "5 mg, 10 mg" }
  - { label: "Median /mg",   value: "$9" }
  - { label: "Spread",       value: "$4 — $15" }
---

<!-- BODY: leave exactly as you have it -->
<section class="content-section">
  <h2>What it is</h2>
  <p>…</p>
</section>
<section class="content-section">
  <h2>What researchers study it for</h2>
  <ul class="research-list"><li><strong>Term</strong><span>Detail.</span></li></ul>
</section>
<!-- params table, price-cta, references, related — all keep working -->
```

## What maps from your existing notes (no rewrite)
- `h1` / `peptideName`, `lede`, `tags`, `stats` — **already present** in your notes; reused as-is.
- Body `<section class="content-section">`, `.research-list`, `.params-table`,
  `.bibliography`, `.related-links` — **all already styled**; nothing to change.

## The ONE new thing to add per note
The **`price:` block** (median / low / high / vendors) — that's what renders the
hero price card you've been missing. Pull the numbers from the app's current
per-mg data for each compound. If `price:` is omitted, the card simply doesn't
render (the rest of the page is unaffected), so you can roll it out gradually.

## How each piece renders
| Frontmatter | Renders as |
|---|---|
| `peptideName` + `category` + `folio` | Hero: eyebrow + giant serif title |
| `lede` | Italic standfirst under the title |
| `price.*` | Oxblood "Per-mg this week" card (right of title) |
| `tags` | Pill row under the hero, linking to `/tags/<slug>/` |
| body sections | Left-rail §-numbered marker + reading column |
| first body section | Lighter panel + serif lead + drop-cap |
| `stats` | "Quick reference" grid near the foot |

## Apply
Drop both files in at the paths above, rebuild, push. Then for each note, add the
`price:` block (and `category`/`folio` if you want the folio eyebrow). Everything
else is automatic.
