# peptidepricelab.com — Marketing Site

Static marketing and content site for [Peptide Price Lab](https://peptidepricelab.com).

The tool itself lives at [app.peptidepricelab.com](https://app.peptidepricelab.com) (separate repo).

## Structure

```
/                        → Landing page (index.html)
/sources/                → Vendor directory
/peptides/               → Peptide Research Notes index
/peptides/bpc-157/       → Individual peptide pages (add as written)
/css/style.css           → Shared stylesheet
/assets/                 → Images, OG image, icons
robots.txt               → Allow all, points to sitemap
sitemap.xml              → Update as pages are added
CNAME                    → peptidepricelab.com (GitHub Pages)
```

## Hosting

GitHub Pages. Push to `main` branch → auto-deploys to `peptidepricelab.com`.

## Adding a peptide page

1. Create `/peptides/[slug]/index.html` using an existing page as a template.
2. Add a `<url>` block to `sitemap.xml`.
3. Add a link card to `/peptides/index.html` and the homepage peptide grid.

## Adding a vendor to /sources

1. Add a source card to `/sources/index.html`.
2. Add affiliate promo code link if applicable.

## SEO checklist (per new page)

- [ ] Unique `<title>` and `<meta name="description">`
- [ ] `<link rel="canonical">` set
- [ ] Added to `sitemap.xml`
- [ ] Internal links from homepage and `/peptides/` index
# peptidepricelab-site
