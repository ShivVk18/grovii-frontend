// Fails when ESLint finds more errors than ci/eslint-baseline.json allows
// (known debt in pages not yet cleaned up). Lower the number when you fix some.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const allowed = JSON.parse(readFileSync(new URL("../ci/eslint-baseline.json", import.meta.url))).errors;
let out;
try {
  out = execFileSync("npx", ["eslint", "src", "-f", "json"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
} catch (e) {
  out = e.stdout; // eslint exits 1 when it finds errors
}
const results = JSON.parse(out);
const errors = results.flatMap((f) => f.messages.filter((m) => m.severity === 2).map((m) => `${f.filePath.split("/src/")[1]}:${m.line} ${m.ruleId}`));
console.log(`eslint errors: ${errors.length} (baseline ${allowed})`);
if (errors.length > allowed) {
  console.log(errors.join("\n"));
  process.exit(1);
}
if (errors.length < allowed) console.log(`improved: lower ci/eslint-baseline.json to ${errors.length}`);
