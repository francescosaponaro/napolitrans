"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { resolveVehicleCode } from "@/lib/scanner/suggestions";
import { normalizeScanRaw } from "@/lib/scanner/parseScanInput";

interface PhoneQRScannerProps {
  onScan: (value: string) => void;
}

type LoaderPhase = "starting" | "scanning" | "processing";

export default function PhoneQRScanner({ onScan }: PhoneQRScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<LoaderPhase>("starting");
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<import("html5-qrcode").Html5Qrcode | null>(null);
  const hasScannedRef = useRef(false);
  const isRunningRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function initScanner() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (!mounted || !scannerRef.current) return;

        const html5QrCode = new Html5Qrcode("phone-qr-reader");
        html5QrCodeRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (hasScannedRef.current || !mounted) return;
            hasScannedRef.current = true;
            setPhase("processing");

            const parsed = normalizeScanRaw(decodedText);
            if (!parsed) {
              hasScannedRef.current = false;
              setPhase("scanning");
              return;
            }

            const resolved = resolveVehicleCode(parsed);

            const stopScanner = async () => {
              if (isRunningRef.current && html5QrCodeRef.current) {
                isRunningRef.current = false;
                try {
                  await html5QrCodeRef.current.stop();
                  html5QrCodeRef.current.clear();
                } catch {
                  // ignore
                }
              }
            };

            void stopScanner().then(() => {
              if (mounted) onScan(resolved);
            });
          },
          () => {
            // no QR in frame
          }
        );

        isRunningRef.current = true;
        if (mounted) setPhase("scanning");
      } catch {
        if (mounted) {
          setError(
            "Impossibile accedere alla fotocamera. Controlla i permessi."
          );
          setPhase("starting");
        }
      }
    }

    initScanner();

    return () => {
      mounted = false;
      if (isRunningRef.current && html5QrCodeRef.current) {
        isRunningRef.current = false;
        const scanner = html5QrCodeRef.current;
        scanner
          .stop()
          .then(() => scanner.clear())
          .catch(() => {
            // ignore
          });
      }
    };
  }, [onScan]);

  const loaderLabel =
    phase === "starting"
      ? "Avvio fotocamera…"
      : phase === "processing"
        ? "Lettura codice…"
        : "Inquadra il QR del veicolo";

  return (
    <div className="w-full flex flex-col items-center">
      {error && (
        <div className="mb-4 w-full text-[#D32F2F] font-medium text-center bg-red-50 px-4 py-3 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      <div className="relative">
        <div
          id="phone-qr-reader"
          ref={scannerRef}
          className="w-[300px] h-[300px] rounded-xl overflow-hidden border-2 border-[#D32F2F]"
        />
        {!error && phase !== "scanning" && (
          <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col items-center justify-center gap-3 pointer-events-none">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
            <p className="text-white text-sm font-medium text-center px-4">
              {loaderLabel}
            </p>
          </div>
        )}
        {!error && phase === "scanning" && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
            <div className="flex items-center gap-2 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <Loader2 className="w-4 h-4 animate-spin" />
              Ricerca codice…
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-[#666666] text-center">
        Usa la fotocamera del telefono per leggere il QR
      </p>
    </div>
  );
}
