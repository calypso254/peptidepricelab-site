export default function (eleventyConfig) {
  const tagDescriptions = {
    "Anti-Aging": "Compounds studied in cellular aging, age-related decline, or longevity mechanisms.",
    "Cardiovascular": "Compounds with research in cardiac protection, blood pressure, vascular function, or circulatory health.",
    "Cognitive Research": "Compounds studied in memory, focus, neuroplasticity, neuroprotection, or mood regulation.",
    "FDA-Approved": "Compounds with at least one FDA-approved pharmaceutical form. Research notes describe the compound class as studied in published literature.",
    "GLP-1": "GLP-1 receptor agonists and compounds studied primarily through the glucagon-like peptide-1 pathway.",
    "Gut Health": "Compounds studied in gut lining integrity, mucosal repair, or gastrointestinal function.",
    "Hormonal Health": "Compounds studied in hormonal signaling, HPA axis regulation, growth hormone, or reproductive hormones.",
    "Immune Research": "Compounds studied in immune modulation, inflammation regulation, or immune cell activity.",
    "Joint Research": "Compounds studied in cartilage repair, synovial health, or joint-related injury models.",
    "Libido Research": "Compounds studied in sexual function, arousal, or desire, distinct from general hormonal health.",
    "Longevity": "Compounds studied in lifespan extension, senescence pathways, telomere biology, or healthspan markers.",
    "Metabolic Health": "Compounds studied in glucose metabolism, insulin sensitivity, lipid profiles, or body composition.",
    "Neuroprotection": "Compounds studied in neuronal resilience, neuroinflammation, ischemic injury, or mitochondrial brain function.",
    "Skin & Collagen": "Compounds studied in collagen synthesis, skin elasticity, wound healing at the dermal level, or cosmetic applications.",
    "Sleep Research": "Compounds studied in sleep quality, sleep architecture, or slow-wave sleep.",
    "Tissue Repair": "Compounds studied in recovery from injury, cellular regeneration, or structural tissue healing beyond skin and joints.",
    "Weight Research": "Compounds studied in body weight reduction, adipose tissue loss, or obesity treatment.",
    "Wound Healing": "Compounds studied specifically in wound closure, ulcer healing, or post-surgical recovery."
  };

  const slugify = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/&/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");

  eleventyConfig.addFilter("slugify", slugify);

  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date);
  });

  eleventyConfig.addFilter("sitemapDate", (value) => value || "2026-05-24");

  eleventyConfig.addFilter("jsonLd", (value) =>
    JSON.stringify(value, null, 2)
  );

  eleventyConfig.addTransform("cleanListParagraphs", function (content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) {
      return content;
    }

    return content
      .replace(/(<(?:ul|ol)\b[^>]*>)\s*<p>/g, "$1")
      .replace(/<p>\s*(<\/(?:ul|ol)>)/g, "$1")
      .replace(/<\/p>\s*(<\/(?:ul|ol)>)/g, "$1")
      .replace(/(<\/(?:ul|ol)>)\s*<\/p>/g, "$1")
      .replace(/<\/li>\s*<\/p>\s*<p>\s*<li/g, "</li>\n<li")
      .replace(/<p>\s*(<li\b)/g, "$1")
      .replace(/(<\/li>)\s*<\/p>/g, "$1")
      .replace(/<p>\s*(<div\b[^>]*>)/g, "$1")
      .replace(/(<\/div>)\s*<\/p>/g, "$1");
  });

  eleventyConfig.addCollection("startHereBasics", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/start-here/**/*.md")
      .filter(item => item.data.section === "basics")
      .sort((a, b) => String(a.data.title || "").localeCompare(String(b.data.title || "")))
  );

  eleventyConfig.addCollection("startHereCommonQuestions", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/start-here/**/*.md")
      .filter(item => item.data.section === "common-questions")
      .sort((a, b) => String(a.data.title || "").localeCompare(String(b.data.title || "")))
  );

    eleventyConfig.addCollection("blogPosts", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/blog/**/*.md").sort((a, b) =>
      String(b.data.date || "").localeCompare(String(a.data.date || ""))
    )
  );

  eleventyConfig.addCollection("researchNotes", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/peptides/**/*.md").sort((a, b) =>
      String(a.data.title || "").localeCompare(String(b.data.title || ""))
    )
  );

  eleventyConfig.addCollection("noteTags", (collectionApi) => {
    const groups = new Map();
    for (const note of collectionApi.getFilteredByGlob("src/peptides/**/*.md")) {
      for (const tag of note.data.tags || []) {
        if (!groups.has(tag)) {
          groups.set(tag, {
            name: tag,
            slug: slugify(tag),
            description: tagDescriptions[tag] || `Research notes tagged ${tag}.`,
            items: []
          });
        }
        groups.get(tag).items.push(note);
      }
    }

    return Array.from(groups.values())
      .map((group) => ({
        ...group,
        items: group.items.sort((a, b) =>
          String(a.data.peptideName || a.data.title || "").localeCompare(String(b.data.peptideName || b.data.title || ""))
        )
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
}
