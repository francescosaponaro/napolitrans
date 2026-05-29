"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  SCAN_TEST_PAYLOAD_ABC,
  SCAN_TEST_PAYLOAD_MATRIX,
  SCAN_TEST_PAYLOADS,
} from "@/lib/scanner/constants";
import {
  buildScanDiagnostic,
  getConfiguredScanSuffix,
  isScanTerminator,
  type ScanDiagnostic,
} from "@/lib/scanner/parseScanInput";

function QrImage({ payload }: { payload: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(payload, { width: 200, margin: 2 })
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setSrc(null);
      });
    return () => {
      cancelled = true;
    };
  }, [payload]);

  if (!src) {
    return (
      <div className="w-[200px] h-[200px] bg-white border border-[#e0e0e0] rounded-lg flex items-center justify-center text-sm text-[#666666]">
        Caricamento QR…
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`QR: ${payload}`}
      width={200}
      height={200}
      className="rounded-lg border border-[#e0e0e0] bg-white"
    />
  );
}

export default function ScanTestPage() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastKeyRef = useRef<string | null>(null);
  const [captureValue, setCaptureValue] = useState("");
  const [diagnostic, setDiagnostic] = useState<ScanDiagnostic | null>(null);

  useEffect(() => {
    console.log(
      `[NapoliTrans scan-test] QR atteso: "${SCAN_TEST_PAYLOAD_ABC}"`
    );
    console.log(
      `[NapoliTrans scan-test] QR MATRIX test: "${SCAN_TEST_PAYLOAD_MATRIX}"`
    );
    console.log(
      "[NapoliTrans scan-test] Apri questa pagina sul palmare, focus sul campo, scansiona."
    );
    const suffix = getConfiguredScanSuffix();
    if (suffix) {
      console.log(
        `[NapoliTrans scan-test] NEXT_PUBLIC_SCAN_SUFFIX configurato: "${suffix}"`
      );
    }
    inputRef.current?.focus();
  }, []);

  const commitScan = useCallback((raw: string, lastKey: string | null) => {
    const diag = buildScanDiagnostic(raw, lastKey);
    setDiagnostic(diag);
    console.log("[NapoliTrans scan-test] Risultato scansione:", diag);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    lastKeyRef.current = `${e.key} (${e.code})`;
    if (isScanTerminator(e.key)) {
      e.preventDefault();
      commitScan(e.currentTarget.value, lastKeyRef.current);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaptureValue(e.target.value);
  };

  const handleClear = () => {
    setCaptureValue("");
    setDiagnostic(null);
    lastKeyRef.current = null;
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f9f9f9] py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[#333333] mb-2">
          Test scanner palmare
        </h1>
        <p className="text-sm text-[#666666] mb-8">
          Scansiona uno dei QR qui sotto con il palmare Datalogic. Il campo deve
          avere il focus. I dettagli compaiono sotto e in console (DevTools).
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {SCAN_TEST_PAYLOADS.map((payload) => (
            <div
              key={payload}
              className="flex flex-col items-center bg-white rounded-xl p-4 border border-[#e0e0e0] shadow-sm"
            >
              <QrImage payload={payload} />
              <p className="mt-3 text-xs text-[#666666] font-mono text-center break-all">
                {payload}
              </p>
            </div>
          ))}
        </div>

        <label
          htmlFor="scan-test-capture"
          className="block text-sm font-medium text-[#333333] mb-2"
        >
          Campo di cattura (focus automatico)
        </label>
        <textarea
          id="scan-test-capture"
          ref={inputRef}
          value={captureValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          rows={3}
          className="w-full px-4 py-3 text-lg border-2 border-[#D32F2F] rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 bg-white text-[#333333]"
          placeholder="Scansiona qui…"
        />

        <button
          type="button"
          onClick={handleClear}
          className="mt-4 px-6 py-2.5 bg-[#333333] text-[#f4f4f4] font-medium rounded-xl
                     hover:bg-[#111111] transition-colors"
        >
          Svuota / nuova prova
        </button>

        {diagnostic && (
          <div className="mt-8 p-4 bg-white rounded-xl border border-[#e0e0e0] shadow-sm">
            <h2 className="text-lg font-bold text-[#333333] mb-3">
              Ultima scansione
            </h2>
            <dl className="space-y-2 text-sm font-mono">
              <div>
                <dt className="text-[#666666]">displayValue</dt>
                <dd className="text-[#333333] break-all">
                  {JSON.stringify(diagnostic.displayValue)}
                </dd>
              </div>
              <div>
                <dt className="text-[#666666]">parsedValue</dt>
                <dd className="text-[#D32F2F] font-bold break-all">
                  {diagnostic.parsedValue || "(vuoto)"}
                </dd>
              </div>
              <div>
                <dt className="text-[#666666]">charCodes</dt>
                <dd className="text-[#333333] break-all">
                  [{diagnostic.charCodes.join(", ")}]
                </dd>
              </div>
              <div>
                <dt className="text-[#666666]">lastKey</dt>
                <dd className="text-[#333333]">
                  {diagnostic.lastKey ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-[#666666]">length</dt>
                <dd className="text-[#333333]">{diagnostic.length}</dd>
              </div>
            </dl>
            {diagnostic.parsedValue === SCAN_TEST_PAYLOAD_ABC && (
              <p className="mt-3 text-green-700 text-sm font-medium">
                Match corretto con QR ABC123.
              </p>
            )}
            {diagnostic.parsedValue === SCAN_TEST_PAYLOAD_MATRIX && (
              <p className="mt-3 text-green-700 text-sm font-medium">
                Match corretto con QR MATRIX (veicolo MATRIX in produzione).
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
