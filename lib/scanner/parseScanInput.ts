const CONFIGURED_SUFFIX =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_SCAN_SUFFIX?.trim() ?? ""
    : "";

/** Caratteri di controllo spesso inviati dal wedge a fine scansione */
const TRAILING_CONTROL_CHARS = /[\r\n\t]+$/;

export function getConfiguredScanSuffix(): string {
  return CONFIGURED_SUFFIX;
}

export function isScanTerminator(key: string): boolean {
  return key === "Enter";
}

export function toCharCodes(raw: string): number[] {
  return Array.from(raw).map((c) => c.charCodeAt(0));
}

/**
 * Normalizza il testo grezzo dal palmare (wedge): trim, rimuove suffisso env e CR/LF/Tab finali.
 */
export function normalizeScanRaw(raw: string): string {
  let value = raw;

  if (CONFIGURED_SUFFIX && value.endsWith(CONFIGURED_SUFFIX)) {
    value = value.slice(0, -CONFIGURED_SUFFIX.length);
  }

  value = value.replace(TRAILING_CONTROL_CHARS, "").trim();
  return value;
}

export interface ScanDiagnostic {
  displayValue: string;
  parsedValue: string;
  charCodes: number[];
  lastKey: string | null;
  length: number;
}

export function buildScanDiagnostic(
  displayValue: string,
  lastKey: string | null
): ScanDiagnostic {
  const parsedValue = normalizeScanRaw(displayValue);
  return {
    displayValue,
    parsedValue,
    charCodes: toCharCodes(displayValue),
    lastKey,
    length: displayValue.length,
  };
}
