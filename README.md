# peptidepricelab.com - Marketing Site

Static marketing and content site for [Peptide Price Lab](https://peptidepricelab.com).

The tool itself lives at [app.peptidepricelab.com](https://app.peptidepricelab.com) in a separate repo.

## Structure

```text
/                        -> Current live landing page
/sources/                -> Current live vendor directory
/peptides/               -> Current live research notes index
/peptides/[slug]/        -> Current live generated/static research notes
/blog/[slug]/            -> Current live generated/static blog posts
/css/style.css           -> Current landing-page stylesheet
/css/content.css         -> Shared generated-content stylesheet
/src/                    -> Eleventy source files and layouts
/src/_includes/          -> Shared layouts and partials
/templates/agent/        -> Templates for content-writing agents
/assets/                 -> Images, logos, fonts, icons
robots.txt               -> Allow all, points to sitemap
sitemap.xml              -> Sitemap, to be generated after migration
CNAME                    -> peptidepricelab.com for GitHub Pages
```

## Build System

New content should be authored as Markdown under `src/` and rendered with Eleventy.

```bash
npm install
npm run build
npm run serve
```

Eleventy writes generated static output to `_site/`.

The existing root HTML pages remain live while the site is migrated. Do not create new full-page HTML from scratch unless there is a specific reason; create Markdown content files using the shared layouts instead.

## Adding a Research Note

1. Create `src/peptides/[slug]/index.md` using `templates/agent/research-note.md`.
2. Write only front matter plus article body content.
3. Run `npm run build`.
4. During the migration phase, add the page to any old static indexes or `sitemap.xml` that have not yet been converted.

## Adding a Blog Post

1. Create `src/blog/[slug]/index.md` using `templates/agent/blog-post.md`.
2. Write only front matter plus article body content.
3. Run `npm run build`.
4. During the migration phase, add the page to any old static indexes or `sitemap.xml` that have not yet been converted.

## Writing Agent Contract

See [docs/AGENT_CONTENT_WORKFLOW.md](docs/AGENT_CONTENT_WORKFLOW.md).

The short version:

- Output Markdown source files, not complete HTML documents.
- Do not include header, nav, footer, global styles, canonical tags, Open Graph tags, or JSON-LD.
- Use root-relative internal links, such as `/peptides/` and `/assets/...`.
- Use the shared logo path `/assets/logos/peptide-price-lab-logo-default.svg`.

## Adding a Vendor to /sources

This page has not been migrated yet.

1. Add a source card to `/sources/index.html`.
2. Add affiliate promo code link if applicable.

## SEO Checklist

- Unique `title`
- Unique `description`
- Strong `h1`
- Canonical URL handled by layout
- Open Graph tags handled by layout
- Internal links added from relevant index pages during migration
