# PPL Site Update — Round 2 + Logo Suite

## NEW: Logo suite (the bead system)The old logo image is retired in favor of a typed monogram + bead marks:

```
assets/logos/ppl-icon.svg       NEW  → app icon (512, strand on ink tile)
assets/logos/ppl-favicon.svg    NEW  → favicon (32, simplifies to 16)
assets/logos/ppl-lockup.svg     NEW  → horizontal lockup image (email/external use)
src/_includes/partials/header.njk  REPLACE → inline P·P·L bead monogram + wordmark (no <img>)
src/_includes/layouts/base.njk     REPLACE → adds favicon + apple-touch-icon <link>s
css/components.css                 REPLACE → §11 masthead-logo styles (bead dots)
```

The header now renders **P·P·L** with the interpunct dots as amino-acid beads
(last one oxblood) beside the "Peptide Price Lab" wordmark — all live HTML/CSS
in Instrument Serif, so it's crisp at any size and needs no image. The app icon
and favicon use the matching bead-chain "strand." `site.json → logo` is no
longer required by the header (the old `logo.default` image is hidden via CSS if
still referenced anywhere).

---

## NEW: Taglines (two movements)

Two brand lines, placed by register:

- **Door / intro** — *"We ran the numbers. You run the research."* → the default
  dateline tagline (`dateline.njk`), shown at the top of the main pages.
- **Resolution / end cap** — *"Research clearly. Source confidently."* → the
  footer sign-off (`footer.njk`) and the sub-mark beneath the logo lockup
  (`ppl-lockup.svg`).

The old "The Honest Milligram" line is fully retired. Note: the live site does
not currently render the dateline strip; if you want the door line at the top
of pages, include `partials/dateline.njk` in the layouts (or ask me to wire it
in + add it to the home hero).

---

# PPL Site Update — Round 2

Fixes the remaining design conflicts and adds the **Dispatch** section + a
working **News** index. Everything here matches the live repo structure
(`calypso254/peptidepricelab-site`, Eleventy → `_site` → GitHub Pages).

The earlier round (content.css, fonts.css, header/footer/pledge partials) is
already live — this bundle does **not** re-ship those.

────────────────────────────────────────────────────────────────────────
## Why pages were "fighting" the design

The index/listing templates (`news`, `sources`, the homepage `src/index.njk`,
the guide listings, the FDA news article) use component classes — `.guide-card`,
`.article-card`, `.step-card`, `.vendor-meta`, `.timeline`, `.peptide-list-card`,
`.price-cta`, `.related-reading`, etc. — that lived in the OLD `style.css` but
were never ported into `content.css`. So those pages rendered half-styled.

**`css/components.css`** fills every one of those gaps in the editorial
(parchment / Instrument Serif) language. It reuses the tokens already declared
in `content.css` and is loaded right after it.

> The stale root files `/index.html` and `/css/style.css` are NOT deployed
> (the build only outputs `src/` → `_site/`). They're leftover from the
> pre-Eleventy site. Safe to delete from the repo whenever you like — they are
> not the homepage. The real homepage is `src/index.njk`.

────────────────────────────────────────────────────────────────────────
## File map — drop into the repo at these exact paths

```
css/components.css                                   NEW  → css/components.css
eleventy.config.js                                   REPLACE (adds news + dispatch collections)
src/_includes/layouts/base.njk                       REPLACE (adds <link> to components.css)
src/_includes/layouts/dispatch-issue.njk             NEW
src/dispatch/index.njk                               NEW  (the Dispatch hub)
src/dispatch/no-01-reading-a-coa/index.md            NEW  (seed issue)
src/dispatch/no-02-retatrutide-three-indexes/index.md NEW (seed issue)
src/dispatch/no-03-ghk-cu-price-cuts/index.md        NEW  (seed issue)
src/news/index.njk                                   REPLACE (auto-lists the news collection)
src/sources/index.njk                                REPLACE (honest affiliate copy)
```

Then build:

```bash
npm run build      # or: npm run serve
```

Check: `/`, `/news/`, `/dispatch/`, `/sources/`, `/start-here/`,
`/plain-language/`, `/notes/`, `/peptides/`, and the FDA news article.

────────────────────────────────────────────────────────────────────────
## What each change does

### 1. `css/components.css` (the big fix)
Styles every listing + article component the templates already use:
- **Homepage** — `.home-hero`, `.content-section`, `.section-heading`, `.steps-grid`/`.step-card`, `.peptide-cards`, `.faq-list`/`.faq-item`
- **Guide listings** (start-here / plain-language / notes) — `.start-page`, `.guide-grid`/`.guide-card`, `.intro-note`, `.section-label`, `.section-see-all`, `.reading-time`
- **Peptide index** — `.peptides-page`, `.peptide-section-heading`, `.microcopy`
- **News index** — `.article-list`, `.article-card`(+`-with-image`), `.card-meta`, `.card-tag`, `.read-more`
- **News article** — `.article-hero-image`, `.peptide-list-card`, `.timeline`, `.sources-section`/`.sources-list`, `.related-section`
- **Sources** — `.vendor-grid`, `.vendor-meta`, `.vendor-link`, `.price-cta`
- **Related reading** — `.related-reading` (used by every article layout)
- **Dispatch** — `.dispatch-page`, `.dispatch-lead`, archive rows
- Plus a `@container app (max-width:760px)` block so all of the above stack on mobile.

### 2. Dispatch section (new)
- **Collection** `dispatch` added to `eleventy.config.js` (globs `src/dispatch/*/index.md`, newest first).
- **Hub** `src/dispatch/index.njk` — editorial hero, featured latest issue + subscribe form, archive feed.
- **Layout** `src/_includes/layouts/dispatch-issue.njk` — per-issue page with issue number, date, body, end-of-issue subscribe prompt, and the Pledge.
- **3 seed issues** (No. 01–03) so the hub isn't empty. Replace/extend with real letters — same front-matter shape (`issueNumber`, `date`, `title`, `lede`, `readingTime`).
- The subscribe forms POST to `site.newsletterAction` if you add that key to `src/_data/site.json`; otherwise they're inert placeholders.

### 3. News index (fixed)
- **Collection** `news` added to `eleventy.config.js` (globs `src/news/*/index.{njk,md}`, so the hub itself is excluded).
- `src/news/index.njk` now **auto-lists the collection** instead of a hard-coded card. Your existing FDA article appears automatically — no edit required (it falls back to `description` for the blurb and `schema.datePublished` for the date).
- *Optional polish:* add `category: "Regulation"`, `cardDek: "…"`, and `readingTime: "7 min read"` to the FDA article's front-matter to control its card exactly. Without them it still renders (tagged "News").

### 4. Sources affiliate copy (fixed)
The directory callout previously read *"receives no affiliate fees from any
vendor listed here."* It now states the real policy: no paid placements, but we
do hold affiliate codes and surface them only when they beat the live sale —
which is what keeps the Lab free and ad-free.

────────────────────────────────────────────────────────────────────────
## Adding a new Dispatch issue later

1. Create `src/dispatch/no-04-some-slug/index.md`.
2. Front-matter:
   ```yaml
   ---
   layout: layouts/dispatch-issue.njk
   issueNumber: "No. 04"
   date: 2026-05-30
   readingTime: "4 min read"
   title: "Your headline"
   h1: "Your headline"
   lede: "One-sentence summary for the archive list."
   ---
   ```
3. Write the letter in Markdown. `npm run build`. It auto-appears as the
   featured issue on `/dispatch/` and drops older issues into the archive.

────────────────────────────────────────────────────────────────────────
## Rollback
- Delete `css/components.css` and remove its `<link>` from `base.njk`.
- Revert `eleventy.config.js`, `src/news/index.njk`, `src/sources/index.njk`.
- Delete `src/dispatch/` and `src/_includes/layouts/dispatch-issue.njk`.
Nothing else references these files.
