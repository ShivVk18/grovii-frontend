// A small on-device copy of recently opened shoot plans, so a plan still opens
// on location with poor signal. Holds only the creator's own plans; cleared on
// sign-out. Storage can be full or blocked, so every access is best effort.

const PREFIX = "grovii_saved_plan:";
const INDEX = "grovii_saved_plans";
const KEEP = 5;

type Saved<T> = { savedAt: string; plan: T };

function readIndex(): string[] {
  try {
    const raw = localStorage.getItem(INDEX);
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function savePlan<T>(id: string, plan: T): void {
  try {
    localStorage.setItem(PREFIX + id, JSON.stringify({ savedAt: new Date().toISOString(), plan }));
    const ids = [id, ...readIndex().filter((x) => x !== id)];
    for (const old of ids.slice(KEEP)) localStorage.removeItem(PREFIX + old);
    localStorage.setItem(INDEX, JSON.stringify(ids.slice(0, KEEP)));
  } catch {
    /* storage full or blocked: offline copy is optional */
  }
}

export function loadPlan<T>(id: string): Saved<T> | null {
  try {
    const raw = localStorage.getItem(PREFIX + id);
    return raw ? (JSON.parse(raw) as Saved<T>) : null;
  } catch {
    return null;
  }
}

export function forgetPlan(id: string): void {
  try {
    localStorage.removeItem(PREFIX + id);
    localStorage.setItem(INDEX, JSON.stringify(readIndex().filter((x) => x !== id)));
  } catch {
    /* ignore */
  }
}

export function clearSavedPlans(): void {
  try {
    for (const id of readIndex()) localStorage.removeItem(PREFIX + id);
    localStorage.removeItem(INDEX);
  } catch {
    /* ignore */
  }
}
