"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, Smartphone } from "lucide-react";
import PhoneQRScanner from "@/components/PhoneQRScanner";
import {
  getAllVehicleCodes,
  getVehicleSuggestions,
  resolveVehicleCode,
} from "@/lib/scanner/suggestions";
import {
  isScanTerminator,
  normalizeScanRaw,
} from "@/lib/scanner/parseScanInput";

interface HardwareScanInputProps {
  onScan: (value: string) => void;
}

type ScanMode = "handheld" | "phone";

const MAX_VISIBLE_SUGGESTIONS = 8;

export default function HardwareScanInput({ onScan }: HardwareScanInputProps) {
  const [mode, setMode] = useState<ScanMode>("handheld");
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const vehicleMenu = useMemo(() => getAllVehicleCodes(), []);

  useEffect(() => {
    if (mode === "handheld") {
      inputRef.current?.focus();
    }
  }, [mode]);

  const commitScan = useCallback(
    (raw: string) => {
      const parsed = normalizeScanRaw(raw);
      if (!parsed) return;
      onScan(resolveVehicleCode(parsed));
    },
    [onScan]
  );

  const refreshSuggestions = useCallback((query: string) => {
    const next = getVehicleSuggestions(query);
    setSuggestions(next);
    setShowSuggestions(next.length > 0 && query.trim().length > 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue(next);
    refreshSuggestions(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isScanTerminator(e.key)) {
      e.preventDefault();
      commitScan(e.currentTarget.value);
    }
  };

  const handleMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    if (!next) return;
    onScan(resolveVehicleCode(next));
  };

  const handleSelectSuggestion = (code: string) => {
    onScan(resolveVehicleCode(code));
  };

  return (
    <div className="relative w-full max-w-md mx-auto px-4 animate-fadeInUp">
      <button
        type="button"
        onClick={() =>
          setMode((m) => (m === "handheld" ? "phone" : "handheld"))
        }
        className="absolute -top-1 right-0 z-20 flex items-center justify-center w-11 h-11 rounded-xl
                   bg-white border border-[#e0e0e0] shadow-sm text-[#333333]
                   transition-all duration-200 hover:bg-[#fff5f5] hover:border-[#D32F2F] hover:text-[#D32F2F] active:scale-95"
        aria-label={
          mode === "handheld"
            ? "Scansiona con fotocamera del telefono"
            : "Torna a scansione palmare"
        }
        title={
          mode === "handheld"
            ? "Modalità telefono (fotocamera)"
            : "Modalità palmare"
        }
      >
        {mode === "handheld" ? (
          <Smartphone className="w-5 h-5" />
        ) : (
          <Keyboard className="w-5 h-5" />
        )}
      </button>

      {mode === "phone" ? (
        <div className="pt-12">
          <PhoneQRScanner onScan={onScan} />
        </div>
      ) : (
        <div className="flex flex-col items-center pt-12">
          <p className="mb-4 text-sm text-[#666666] text-center">
            Scansiona con il palmare o scegli dal menu. Il rifornimento parte in
            automatico.
          </p>

          {vehicleMenu.length > 0 && (
            <div className="w-full mb-4">
              <label
                htmlFor="vehicle-menu"
                className="block text-sm font-medium text-[#333333] mb-2"
              >
                Menu veicoli
              </label>
              <select
                id="vehicle-menu"
                value={value}
                onChange={handleMenuChange}
                className="w-full px-4 py-3.5 text-base border-2 border-[#e0e0e0] rounded-xl bg-white text-[#333333]
                           focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F]"
              >
                <option value="">— Seleziona veicolo —</option>
                {vehicleMenu.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          )}

          <label
            htmlFor="vehicle-scan-input"
            className="block w-full text-sm font-medium text-[#333333] mb-2"
          >
            {vehicleMenu.length > 0
              ? "Oppure scansione / codice"
              : "Scansione / codice"}
          </label>
          <div className="relative w-full">
            <input
              id="vehicle-scan-input"
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => value.trim() && refreshSuggestions(value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="w-full px-4 py-4 text-lg border-2 border-[#D32F2F] rounded-xl bg-white text-[#333333]
                focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30"
              placeholder="Identificativo veicolo"
              aria-label="Identificativo veicolo"
              aria-autocomplete="list"
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute z-10 left-0 right-0 mt-1 bg-white border border-[#e0e0e0] rounded-xl shadow-lg overflow-hidden max-h-64 overflow-y-auto"
                role="listbox"
              >
                {suggestions
                  .slice(0, MAX_VISIBLE_SUGGESTIONS)
                  .map((code) => (
                    <li key={code} role="option" aria-selected={value === code}>
                      <button
                        type="button"
                        onClick={() => handleSelectSuggestion(code)}
                        className="w-full text-left px-4 py-3 text-[#333333] hover:bg-[#fff5f5] border-b border-[#f0f0f0] last:border-b-0"
                      >
                        {code}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
