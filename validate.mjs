import fs from "fs";
import babel from "@babel/core";

const html = fs.readFileSync("index.html", "utf8");
const start = html.indexOf('<script type="text/babel"');
const open = html.indexOf(">", start) + 1;
const end = html.lastIndexOf("</script>");
const code = html.slice(open, end);

try {
  babel.transformSync(code, {
    presets: ["@babel/preset-react"],
    filename: "poc.jsx",
  });
  console.log("Babel OK —", Math.round(code.length / 1024), "KB script");
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
