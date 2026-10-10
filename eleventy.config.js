const prettier = require("prettier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/favicon": "favicon" });
  eleventyConfig.addPassthroughCopy({ "node_modules/lucide/dist/umd/lucide.min.js": "js/lucide.min.js" });

  eleventyConfig.addGlobalData("permalink", () => (pageData) => `${pageData.page.fileSlug}.html`);

  eleventyConfig.addTransform("format-built-html", async function (builtHtml) {
    if (!this.page.outputPath?.endsWith(".html")) return builtHtml;

    const prettierOptions = await prettier.resolveConfig(this.page.outputPath);
    return prettier.format(builtHtml, { ...prettierOptions, parser: "html" });
  });

  eleventyConfig.setServerOptions({ watch: ["dist/css/kuina.css"] });

  return {
    dir: {
      input: "src",
      layouts: "layouts",
      includes: "partials",
      output: "dist",
    },
    templateFormats: ["html"],
    htmlTemplateEngine: "njk",
  };
};
