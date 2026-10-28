// Regression tests for frontend bugs confirmed in eval/FINAL_REPORT.md.
//
// These are STATIC source checks. Since Phase E the same behaviour is also
// checked in a real browser by the Playwright tests in tests/e2e/.
//
// Unfixed bugs are marked `todo`: node reports them as "# TODO" and they do not
// fail the run. When a phase fixes the bug, remove the `todo` option so the test
// guards against the bug coming back.
//
// Run: npm run test:regressions

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(
  new URL("../src/app/dashboard/storyboards/[id]/page.tsx", import.meta.url),
  "utf8",
);

function repurposeTab(src) {
  const start = src.indexOf('activeTab === "repurpose"');
  assert.ok(start > -1, "repurpose tab not found");
  return src.slice(start);
}

test(
  "FE-03: music card shows the API field why_fits, not the non-existent reason",
  () => {
    assert.ok(!/\bm\.reason\b/.test(page), "page reads m.reason, which the API never returns");
    assert.ok(/\bm\.why_fits\b/.test(page), "page never reads m.why_fits");
  },
);

test(
  "FE-01: repurpose tab renders storyboard.repurpose from the API, not hardcoded copy",
  () => {
    const tab = repurposeTab(page);
    assert.ok(/storyboard\.repurpose\b/.test(page), "page never reads storyboard.repurpose");
    assert.ok(/repurpose\[f\.key\]/.test(tab), "repurpose tab does not render the API fields");
    for (const mock of [
      "Most creators overcomplicate their pre-production",
      "Batch production into focused sprints",
      "Deliver 3 core actionable steps",
    ]) {
      assert.ok(!tab.includes(mock), `hardcoded mock copy still present: "${mock}"`);
    }
  },
);

// Phase E: creator-facing screens must not show plumbing words. This scans the
// string literals and JSX text of the dashboard and auth screens.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const JARGON = /\bjob id\b|\bqueue[ds]?\b|\bworker\b|enqueue|\buuid\b|\bpipeline\b|\bLLM\b|AI Director|langgraph|langchain|openai|gemini|redis|celery/i;
const SCREENS = ["src/app/dashboard", "src/app/(auth)", "src/components/create", "src/components/layout", "src/components/auth"];

function files(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : p.endsWith(".tsx") ? [p] : [];
  });
}

/** Visible text: JSX text between tags plus quoted string literals. Code identifiers are skipped. */
function visibleStrings(src) {
  const out = [];
  for (const m of src.matchAll(/>([^<>{}]+)</g)) out.push(m[1]);
  for (const m of src.matchAll(/(["'`])((?:(?!\1)[^\\\n]|\\.)*)\1/g)) {
    const t = m[2];
    // class lists, paths and status codes are not prose
    if (/^[\w\-/:.\[\]()%#@ ]*$/.test(t) && !/\s\w+\s/.test(t)) continue;
    out.push(t);
  }
  return out;
}

test("Phase E: no jargon in creator-facing screen text", () => {
  const root = new URL("..", import.meta.url).pathname;
  const hits = [];
  for (const dir of SCREENS) {
    for (const file of files(join(root, dir))) {
      for (const text of visibleStrings(readFileSync(file, "utf8"))) {
        if (JARGON.test(text)) hits.push(`${file.replace(root, "")}: ${text.trim().slice(0, 80)}`);
      }
    }
  }
  assert.deepEqual(hits, []);
});
