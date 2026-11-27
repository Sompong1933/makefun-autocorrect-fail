import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Entry for make.fun's "Funniest Autocorrect Fail" bounty: the entry is the
// one-line autocorrect fail in entry.txt. This program copies that line to
// /output/entry.txt for the judges to read.
const root = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(root, "entry.txt"), "utf8").trim();

// The gate requires 1 to 199 characters of non-whitespace UTF-8 text, on a
// single line and nothing else. Fail loudly instead of silently handing the
// judges a bad entry.
if (text.length < 1 || text.length > 199) {
  console.error(`entry.txt must be 1-199 characters, got ${text.length}`);
  process.exit(1);
}
if (/\n/.test(text)) {
  console.error("entry.txt must be a single line");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync(join("/output", "entry.txt"), text);
console.log(`Entry (${text.length} chars): ${text}`);
console.log("Wrote /output/entry.txt");
