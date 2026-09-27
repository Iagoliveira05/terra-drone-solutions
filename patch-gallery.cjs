const fs = require("fs");
const path = require("path");

const manifest = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "public", "galeria", "manifest.json"),
    "utf8",
  ),
);
const file = path.join(__dirname, "src", "data", "gallery.ts");
let src = fs.readFileSync(file, "utf8");

let changed = 0;
src = src.replace(
  /g\("([a-z0-9-]+)", (\d+), "(?:retrato|paisagem|quadrada)", \{/g,
  (_m, name, width) => {
    const entry = manifest.find((x) => x.name === name);
    if (!entry) {
      throw new Error("sem entrada no manifest: " + name);
    }
    changed++;
    return `g("${name}", ${width}, ${entry.ratio}, {`;
  },
);

fs.writeFileSync(file, src);
console.log("entradas atualizadas:", changed);
