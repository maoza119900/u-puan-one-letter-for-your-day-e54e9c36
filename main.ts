import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Letter for Your Day: the entry is a single letter, K, for "knackered".
// The gate requires /output/entry.txt to be exactly 1 character, so the file
// holds the letter alone — no word, no gloss, no punctuation, no newline.
const LETTER = "K";

// The letter must be a single A–Z character: anything else fails the gate
// (1 to 1 characters, not only white space) and is never judged.
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error(`entry letter must be a single A-Z character, got ${JSON.stringify(LETTER)}`);
}

// The grader sets MAKEFUN_OUTPUT_DIR; an empty value counts as unset.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "./out";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LETTER, "utf8");

// Self-check: the file on disk must be exactly the one letter, one byte.
const written = readFileSync(outPath, "utf8");
if (written !== LETTER || Buffer.byteLength(written, "utf8") !== 1) {
  throw new Error(`entry.txt must hold exactly one letter, got ${JSON.stringify(written)}`);
}
