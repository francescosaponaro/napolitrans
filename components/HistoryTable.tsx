"use client";

import { useEffect, useState } from "react";
import { Fuel } from "lucide-react";
import { FuelSession, VehicleType } from "@/lib/types";
import { getSessions, clearSessions } from "@/lib/storage";

function formatDateTime(isoString: string): string {
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
  return `${time} - ${day}`;
}

function calculateDuration(startIso: string, endIso: string): string {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  const diffMs = end - start;
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) {
    const seconds = Math.round(diffMs / 1000);
    return `${seconds} sec`;
  }
  return `${minutes} min`;
}

function truncateQr(qr: string, maxLength = 30): string {
  if (qr.length <= maxLength) return qr;
  return qr.slice(0, maxLength) + "…";
}

function VehicleBadge({ type }: { type: VehicleType }) {
  const isMatrix = type === "MATRIX";
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${
        isMatrix ? "bg-[#D32F2F]" : "bg-[#333333]"
      }`}
    >
      {type}
    </span>
  );
}

export default function HistoryTable() {
  const [sessions, setSessions] = useState<FuelSession[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSessions(getSessions());
  }, []);

  const handleClear = () => {
    if (window.confirm("Sei sicuro di voler cancellare tutto lo storico?")) {
      clearSessions();
      setSessions([]);
    }
  };

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  if (!mounted) {
    return null;
  }

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Fuel className="w-16 h-16 text-[#999999] mb-4" />
        <p className="text-lg text-[#999999] font-medium">
          Nessun rifornimento registrato.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm font-medium text-[#D32F2F] border border-[#D32F2F] rounded-lg
                     transition-colors hover:bg-[#fff5f5] active:bg-[#D32F2F] active:text-white"
        >
          Cancella storico
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md border border-[#e0e0e0]">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[#D32F2F] text-[#f4f4f4]">
              <th className="px-4 py-3 text-left font-bold text-sm">Pompa</th>
              <th className="px-4 py-3 text-left font-bold text-sm">
                Tipo Veicolo
              </th>
              <th className="px-4 py-3 text-left font-bold text-sm">
                Identificativo QR
              </th>
              <th className="px-4 py-3 text-left font-bold text-sm">Inizio</th>
              <th className="px-4 py-3 text-left font-bold text-sm">Fine</th>
              <th className="px-4 py-3 text-left font-bold text-sm">Durata</th>
            </tr>
          </thead>
          <tbody>
            {sortedSessions.map((session, index) => (
              <tr
                key={session.id}
                className={`border-b border-[#e0e0e0] transition-colors hover:bg-[#fff5f5] ${
                  index % 2 === 1 ? "bg-[#fafafa]" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-sm text-[#333333]">
                  Pompa {session.pumpId}
                </td>
                <td className="px-4 py-3">
                  <VehicleBadge type={session.vehicleType} />
                </td>
                <td
                  className="px-4 py-3 text-sm text-[#333333] font-mono"
                  title={session.qrIdentifier}
                >
                  {truncateQr(session.qrIdentifier)}
                </td>
                <td className="px-4 py-3 text-sm text-[#333333]">
                  {formatDateTime(session.startTime)}
                </td>
                <td className="px-4 py-3 text-sm text-[#333333]">
                  {formatDateTime(session.endTime)}
                </td>
                <td className="px-4 py-3 text-sm text-[#333333] font-medium">
                  {calculateDuration(session.startTime, session.endTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
