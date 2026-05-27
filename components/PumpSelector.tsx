"use client";

import { Fuel } from "lucide-react";

interface PumpSelectorProps {
  onSelect: (pumpId: number) => void;
}

const pumps = [1, 2, 3, 4];

export default function PumpSelector({ onSelect }: PumpSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fadeInUp">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-items-center">
        {pumps.map((pumpId) => (
          <button
            key={pumpId}
            onClick={() => onSelect(pumpId)}
            className="group w-full max-w-[200px] h-[200px] bg-white rounded-2xl shadow-md border-2 border-[#e0e0e0]
                       flex flex-col items-center justify-center gap-3
                       transition-all duration-200
                       hover:border-[#D32F2F] hover:bg-[#fff5f5] hover:scale-[1.03]
                       active:bg-[#D32F2F] active:border-[#D32F2F] active:text-[#f4f4f4]
                       active:shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-[#fff5f5] flex items-center justify-center transition-colors group-active:bg-[#D32F2F] group-active:shadow-inner">
              <Fuel className="w-10 h-10 text-[#D32F2F] transition-colors group-active:text-[#f4f4f4]" />
            </div>
            <span className="text-lg font-bold text-[#333333] transition-colors group-active:text-[#f4f4f4]">
              Pompa {pumpId}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
