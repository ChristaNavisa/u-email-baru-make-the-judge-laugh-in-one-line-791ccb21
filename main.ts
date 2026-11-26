// Custody of the Bowl — the hand-in program.
//
// Writes the chosen one-liner to /output/entry.txt. Standard library only;
// deterministic, so two runs write the same bytes.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// Never delete the output directory itself — only its contents.
mkdirSync(outDir, { recursive: true });
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

const line = 'My goldfish filed for custody of the bowl.';

// Gate: entry.txt must be UTF-8 text of 1 to 200 characters.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry line is ${line.length} chars, outside the 1-200 gate`);
}
writeFileSync(join(outDir, 'entry.txt'), line, 'utf8');

console.log(`wrote entry.txt (${line.length} chars)`);
