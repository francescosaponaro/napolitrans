import vehicleCodes from "@/data/vehicle-codes.json";
import { getSessions } from "@/lib/storage";

const MAX_SUGGESTIONS = 8;

function uniqueSorted(codes: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const code of codes) {
    const trimmed = code.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed);
  }
  return result.sort((a, b) => a.localeCompare(b, "it"));
}

export function getAllVehicleCodes(): string[] {
  const fromConfig = Array.isArray(vehicleCodes) ? vehicleCodes : [];
  const fromHistory = getSessions().map((s) => s.qrIdentifier);
  return uniqueSorted([...fromConfig, ...fromHistory]);
}

export function getVehicleSuggestions(query: string): string[] {
  const q = query.trim();
  const all = getAllVehicleCodes();
  if (!q) return all.slice(0, MAX_SUGGESTIONS);

  const lower = q.toLowerCase();
  const filtered = all.filter((code) => code.toLowerCase().includes(lower));
  const startsWith = filtered.filter((code) =>
    code.toLowerCase().startsWith(lower)
  );
  const rest = filtered.filter(
    (code) => !code.toLowerCase().startsWith(lower)
  );
  return [...startsWith, ...rest].slice(0, MAX_SUGGESTIONS);
}

export function getExactMatch(query: string): string | null {
  const q = query.trim();
  if (!q) return null;
  const lower = q.toLowerCase();
  const matches = getAllVehicleCodes().filter(
    (code) => code.toLowerCase() === lower
  );
  return matches.length === 1 ? matches[0]! : null;
}

/** Autocomplete poi valore da passare a onScan */
export function resolveVehicleCode(parsed: string): string {
  const exact = getExactMatch(parsed);
  if (exact) return exact;

  const filtered = getVehicleSuggestions(parsed);
  const singleExact =
    filtered.length === 1 &&
    filtered[0]!.toLowerCase() === parsed.toLowerCase();
  if (singleExact) return filtered[0]!;

  return parsed;
}
