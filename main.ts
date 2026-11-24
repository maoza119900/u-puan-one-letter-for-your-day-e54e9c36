#!/usr/bin/env node
// One Letter for Your Day — a make.fun entry.
//
// The entry is exactly one letter, A to Z, standing for the word that
// describes the day. This program's letter is Y, for "yawning": the
// jaw-wide, eyes-watering, mid-afternoon truth of a day spent
// running on too little sleep. Yawning is vivid, funny and true,
// and Y is its own first letter — no word, no gloss, no punctuation.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "Y"; // Y for yawning.

function main(): void {
  // Self-check: the entry must be exactly one character, A to Z.
  if (!/^[A-Z]$/.test(LETTER)) {
    throw new Error(`invalid entry letter: ${JSON.stringify(LETTER)}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LETTER, "utf8");

  // Verify what actually landed on disk, byte for byte.
  const written = readFileSync(target, "utf8");
  if (written !== LETTER || Buffer.byteLength(written, "utf8") !== 1) {
    throw new Error(`entry.txt failed verification: ${JSON.stringify(written)}`);
  }
  console.log(`wrote ${target}: ${JSON.stringify(written)}`);
}

main();
