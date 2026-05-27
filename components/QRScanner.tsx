"use client";

import { useEffect, useRef, useState } from "react";

interface QRScannerProps {
  onScan: (qrValue: string) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<import("html5-qrcode").Html5Qrcode | null>(null);
  const hasScannedRef = useRef(false);
  const isRunningRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initScanner() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (!mounted || !scannerRef.current) return;

        const html5QrCode = new Html5Qrcode("qr-reader");
        html5QrCodeRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (hasScannedRef.current) return;
            hasScannedRef.current = true;

            if (!mounted) return;
            setSuccess(true);

            timeoutRef.current = setTimeout(() => {
              if (isRunningRef.current && html5QrCodeRef.current) {
                isRunningRef.current = false;
                html5QrCodeRef.current
                  .stop()
                  .then(() => {
                    html5QrCodeRef.current?.clear();
                  })
                  .catch(() => {
                    // ignore
                  });
              }
              if (mounted) {
                onScan(decodedText);
              }
            }, 600);
          },
          () => {
            // ignore scan errors (no QR in frame)
          }
        );

        isRunningRef.current = true;
      } catch (err) {
        if (mounted) {
          setError(
            "Impossibile accedere alla fotocamera. Controlla i permessi."
          );
        }
      }
    }

    initScanner();

    return () => {
      mounted = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (isRunningRef.current && html5QrCodeRef.current) {
        isRunningRef.current = false;
        const scanner = html5QrCodeRef.current;
        scanner
          .stop()
          .then(() => {
            scanner.clear();
          })
          .catch(() => {
            // ignore cleanup errors — scanner may already be stopped
          });
      }
    };
  }, [onScan]);

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center animate-fadeInUp">
      {error && (
        <div className="mb-4 text-[#D32F2F] font-medium text-center bg-red-50 px-4 py-3 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      <div className="relative">
        <div
          id="qr-reader"
          ref={scannerRef}
          className={`w-[300px] h-[300px] rounded-xl overflow-hidden border-2 border-[#D32F2F] animate-pulse-border ${
            success ? "border-green-500" : ""
          }`}
        />
        {success && (
          <div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center pointer-events-none transition-opacity duration-300">
            <div className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg shadow-lg">
              Scansione riuscita!
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-[#666666] text-center">
        Inquadra il codice QR del veicolo con la fotocamera
      </p>
    </div>
  );
}
