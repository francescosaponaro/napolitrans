"use client";

import { Fuel } from "lucide-react";
import { useMemo } from "react";

interface RefuellingInProgressProps {
  pumpId: number;
  qrValue: string;
  startTime: string;
  onEnd: () => void;
}

function deriveVehicleType(qrValue: string): "MATRIX" | "TRAILER" {
  if (qrValue.toUpperCase().includes("MATRIX")) {
    return "MATRIX";
  }
  return "TRAILER";
}

function formatStartTime(isoString: string): string {
  const date = new Date(isoString);
  const time = date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const day = date.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${time} ${day}`;
}

export default function RefuellingInProgress({
  pumpId,
  qrValue,
  startTime,
  onEnd,
}: RefuellingInProgressProps) {
  const vehicleType = useMemo(() => deriveVehicleType(qrValue), [qrValue]);

  return (
    <div className="w-full max-w-lg mx-auto px-4 flex flex-col items-center text-center animate-fadeInUp">
      {/* Animated fuel icon */}
      <div className="mb-6">
        <Fuel className="w-24 h-24 text-[#D32F2F] animate-fuel-pulse" />
      </div>

      {/* Status text */}
      <h2 className="text-2xl font-bold text-[#333333] mb-2">
        Rifornimento in corso...
      </h2>
      <p className="text-base text-[#666666] mb-6">
        Non rimuovere l&apos;ugello durante il rifornimento.
      </p>

      {/* Vehicle type badge */}
      <div className="mb-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#D32F2F] text-[#f4f4f4] font-bold text-sm tracking-wide">
          {vehicleType}
        </span>
      </div>

      {/* Pump info */}
      <div className="mb-8 space-y-1 text-[#333333]">
        <p className="text-sm">
          <span className="font-medium">Pompa:</span> {pumpId}
        </p>
        <p className="text-sm">
          <span className="font-medium">Inizio:</span>{" "}
          {formatStartTime(startTime)}
        </p>
      </div>

      {/* End button */}
      <button
        onClick={onEnd}
        className="px-10 py-4 bg-[#333333] text-[#f4f4f4] font-bold rounded-2xl
                   transition-all duration-200
                   hover:bg-[#111111] hover:scale-105 active:scale-95 shadow-lg"
      >
        FINE RIFORNIMENTO
      </button>
    </div>
  );
}
