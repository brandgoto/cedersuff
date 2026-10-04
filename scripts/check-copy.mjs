// Fails the build if banned copy appears in site source. See CLAUDE.md → Business constraints.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "lib"];
const BANNED = [
  /24\s*\/\s*7/i,
  /\bour (drivers?|staff)\b/i,
  /\bcrews?\b/i,
  /sub-?contract/i,
  /\bmark-?up\b/i,
];

const files = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : /\.(tsx?|mdx?|json)$/.test(p) ? [p] : [];
  });

const hits = ROOTS.flatMap(files).flatMap((file) =>
  readFileSync(file, "utf8")
    .split("\n")
    .flatMap((line, i) =>
      BANNED.filter((re) => re.test(line)).map((re) => `${file}:${i + 1}  ${re}  →  ${line.trim()}`)
    )
);

if (hits.length) {
  console.error("Banned copy found (see CLAUDE.md):\n" + hits.join("\n"));
  process.exit(1);
}
console.log("✔ Copy check passed");
