const fs = require("node:fs");
const path = require("node:path");

const themeStylesheetPath = path.join(__dirname, "../styles/theme.css");

const colorTokenDocumentation = {
  primary: { utilityExample: "text-primary", usage: "Brand color for links, focus states and accents" },
  canvas: { utilityExample: "bg-canvas", usage: "Page background" },
  widget: { utilityExample: "bg-widget", usage: "Cards and panels" },
  field: { utilityExample: "bg-field", usage: "Form field background" },
  line: { utilityExample: "border-line", usage: "Borders and separators" },
  muted: { utilityExample: "text-muted", usage: "Subdued text" },
  overlay: { utilityExample: "bg-overlay", usage: "Backdrop behind modals and drawers" },
};

/** Returns the body of the `@theme` block, matching braces so a nested block cannot end it early. */
function readThemeBlockBody(stylesheetSource) {
  const themeBlockStart = stylesheetSource.search(/@theme\b[^{]*\{/);
  if (themeBlockStart === -1) return "";

  const bodyStart = stylesheetSource.indexOf("{", themeBlockStart) + 1;
  let braceDepth = 1;
  for (let characterIndex = bodyStart; characterIndex < stylesheetSource.length; characterIndex++) {
    if (stylesheetSource[characterIndex] === "{") braceDepth++;
    if (stylesheetSource[characterIndex] === "}") braceDepth--;
    if (braceDepth === 0) return stylesheetSource.slice(bodyStart, characterIndex);
  }
  return "";
}

function parseTokenDeclarations(themeBlockBody) {
  return themeBlockBody
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split(";")
    .map((declaration) => declaration.trim())
    .filter((declaration) => declaration.startsWith("--"))
    .map((declaration) => {
      const separatorIndex = declaration.indexOf(":");
      const variable = declaration.slice(0, separatorIndex).trim();
      const value = declaration
        .slice(separatorIndex + 1)
        .replace(/\s+/g, " ")
        .replace(/\(\s/g, "(")
        .replace(/\s\)/g, ")")
        .trim();
      const [, namespace = variable.slice(2), name = ""] = variable.match(/^--([a-z]+)-(.+)$/) ?? [];
      return { variable, namespace, name, value };
    });
}

/** Splits a CSS argument list on top-level commas, so commas inside `color-mix()` or `var()` stay in their argument. */
function splitTopLevelArguments(argumentList) {
  const topLevelArguments = [];
  let parenthesisDepth = 0;
  let currentArgument = "";
  for (const character of argumentList) {
    if (character === "(") parenthesisDepth++;
    if (character === ")") parenthesisDepth--;
    if (character === "," && parenthesisDepth === 0) {
      topLevelArguments.push(currentArgument.trim());
      currentArgument = "";
    } else {
      currentArgument += character;
    }
  }
  topLevelArguments.push(currentArgument.trim());
  return topLevelArguments;
}

function shortenColorReferences(colorValue) {
  return colorValue.replace(/var\(--color-([^)]+)\)/g, "$1");
}

function splitLightDarkValue(colorValue) {
  const lightDarkMatch = colorValue.match(/^light-dark\((.*)\)$/);
  if (!lightDarkMatch) return { lightValue: colorValue, darkValue: colorValue };

  const [lightValue, darkValue] = splitTopLevelArguments(lightDarkMatch[1]).map(shortenColorReferences);
  return { lightValue, darkValue };
}

function convertRemToPixels(lengthValue) {
  const remMatch = lengthValue.match(/^(-?[\d.]+)rem$/);
  return remMatch ? `${Number(remMatch[1]) * 16}px` : null;
}

module.exports = function () {
  const themeStylesheetSource = fs.readFileSync(themeStylesheetPath, "utf8");
  const themeTokens = parseTokenDeclarations(readThemeBlockBody(themeStylesheetSource));
  const documentedNamespaces = ["color", "spacing", "breakpoint"];

  return {
    colorTokens: themeTokens
      .filter((token) => token.namespace === "color")
      .map((token) => ({ ...token, ...splitLightDarkValue(token.value), ...colorTokenDocumentation[token.name] })),
    spacingTokens: themeTokens
      .filter((token) => token.namespace === "spacing")
      .map((token) => ({ ...token, pixelValue: convertRemToPixels(token.value) })),
    breakpointTokens: themeTokens
      .filter((token) => token.namespace === "breakpoint")
      .map((token) => ({ ...token, pixelValue: convertRemToPixels(token.value) })),
    otherTokens: themeTokens.filter((token) => !documentedNamespaces.includes(token.namespace)),
  };
};
