// A Day of One-Line Pitches — entry program.
//
// Writes ONE sentence (at most 240 characters) to /output/entry.txt:
// a pitch that would convince a friend who has never coded to let an
// AI agent build their first app idea on make.fun.
//
// The pitch is a fixed string: the program is fully deterministic and
// writes the exact same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "Just describe the app you've always wanted in plain words, and an AI agent will build a working version you can try today — if it's not quite right, tell it what's wrong in plain words and it fixes it, no code required.";

// The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 240
// characters, not only white space, in a single line. Fail loudly here
// instead of submitting an entry the gate would refuse.
if (PITCH.length < 1 || PITCH.length > 240) {
  throw new Error(`pitch is ${PITCH.length} characters, gate allows 1-240`);
}
if (PITCH.trim().length === 0 || PITCH.includes("\n")) {
  throw new Error("pitch must be one non-blank line");
}

// The harness runs the program in a sandbox whose output directory is
// /output; honour an explicit override if one is ever provided, so the
// same file also works when the grader mounts a different directory.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, PITCH, "utf8");
