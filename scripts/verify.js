const fs = require("node:fs");

const html = fs.readFileSync("index.html", "utf8");
const scriptStart = html.lastIndexOf("<script>") + "<script>".length;
const scriptEnd = html.lastIndexOf("</script>");

if (scriptStart < "<script>".length || scriptEnd <= scriptStart) {
  throw new Error("Expected one inline application script.");
}

new Function(html.slice(scriptStart, scriptEnd));

const dataStart = html.indexOf("const DATA = ") + "const DATA = ".length;
const dataEnd = html.indexOf(";\n\n/*", dataStart);
const data = new Function(`return (${html.slice(dataStart, dataEnd)})`)();

if (!Array.isArray(data.projects) || data.projects.length < 6) {
  throw new Error("Expected at least six portfolio projects.");
}

if (!data.projects.some((project) => project.title === "Relay Flags")) {
  throw new Error("Expected Relay Flags in the featured projects.");
}

console.log(`Verified inline script and ${data.projects.length} project entries.`);
