// Regression tests for frontend bugs confirmed in eval/FINAL_REPORT.md.
//
// These are STATIC source checks (the frontend has no render-test setup yet).
// Phase E replaces them with Playwright tests that render the real page.
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
  { todo: "FE-03 unfixed: fixed in Phase E" },
  () => {
    assert.ok(!/\bm\.reason\b/.test(page), "page reads m.reason, which the API never returns");
    assert.ok(/\bm\.why_fits\b/.test(page), "page never reads m.why_fits");
  },
);

test(
  "FE-01: repurpose tab renders storyboard.repurpose from the API, not hardcoded copy",
  { todo: "FE-01 unfixed: fixed in Phase E" },
  () => {
    const tab = repurposeTab(page);
    assert.ok(/storyboard\.repurpose\b/.test(tab), "repurpose tab never reads storyboard.repurpose");
    for (const mock of [
      "Most creators overcomplicate their pre-production",
      "Batch production into focused sprints",
      "Deliver 3 core actionable steps",
    ]) {
      assert.ok(!tab.includes(mock), `hardcoded mock copy still present: "${mock}"`);
    }
  },
);
