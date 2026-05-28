"use client";

import { ChevronLeft } from "lucide-react";

interface StepHeaderProps {
  currentStep: number;
  totalSteps?: number;
  title: string;
  onBack: () => void;
  showBack?: boolean;
}

export default function StepHeader({
  currentStep,
  title,
  onBack,
  showBack = true,
}: StepHeaderProps) {
  const steps = [
    { label: "Home", num: 1 },
    { label: "Pompa", num: 2 },
    { label: "QR", num: 3 },
    { label: "Rifornimento", num: 4 },
  ];

  return (
    <div className="w-full mb-6 animate-fadeInUp">
      {/* Top row: back arrow + title */}
      <div className="flex items-center gap-3 mb-3">
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#e0e0e0] shadow-sm
                       text-[#333333] transition-all duration-200
                       hover:bg-[#fff5f5] hover:border-[#D32F2F] hover:text-[#D32F2F] active:scale-95"
            aria-label="Torna indietro"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-[#333333]">{title}</h2>
      </div>

      {/* Breadcrumb step indicators */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
        {steps.map((step, index) => {
          const isActive = step.num === currentStep;
          const isCompleted = step.num < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.num} className="flex items-center gap-1 sm:gap-2 shrink-0">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[#D32F2F] text-[#f4f4f4]"
                    : isCompleted
                    ? "bg-[#D32F2F]/10 text-[#D32F2F]"
                    : "bg-white text-[#999999] border border-[#e0e0e0]"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-[#f4f4f4] text-[#D32F2F]"
                      : isCompleted
                      ? "bg-[#D32F2F] text-[#f4f4f4]"
                      : "bg-[#e0e0e0] text-[#999999]"
                  }`}
                >
                  {isCompleted ? "✓" : step.num}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {!isLast && (
                <div
                  className={`w-4 sm:w-6 h-0.5 rounded-full shrink-0 ${
                    step.num < currentStep ? "bg-[#D32F2F]" : "bg-[#e0e0e0]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
