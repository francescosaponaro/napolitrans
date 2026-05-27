"use client";

import { useState, useCallback } from "react";
import { Fuel } from "lucide-react";
import PumpSelector from "@/components/PumpSelector";
import QRScanner from "@/components/QRScanner";
import RefuellingInProgress from "@/components/RefuellingInProgress";
import StepHeader from "@/components/StepHeader";
import { addSession } from "@/lib/storage";

type Step = "STEP_1_HOME" | "STEP_2_SELECT_PUMP" | "STEP_3_SCAN_QR" | "STEP_4_IN_PROGRESS";

export default function Home() {
  const [step, setStep] = useState<Step>("STEP_1_HOME");
  const [selectedPump, setSelectedPump] = useState<number | null>(null);
  const [scannedQR, setScannedQR] = useState<string | null>(null);
  const [sessionStart, setSessionStart] = useState<string | null>(null);

  const handleStartRefuelling = () => {
    setStep("STEP_2_SELECT_PUMP");
  };

  const handlePumpSelect = useCallback((pumpId: number) => {
    setSelectedPump(pumpId);
    setStep("STEP_3_SCAN_QR");
  }, []);

  const handleQRScan = useCallback((qrValue: string) => {
    setScannedQR(qrValue);
    const now = new Date().toISOString();
    setSessionStart(now);
    setStep("STEP_4_IN_PROGRESS");
  }, []);

  const handleEndRefuelling = useCallback(() => {
    if (selectedPump === null || scannedQR === null || sessionStart === null) {
      setStep("STEP_1_HOME");
      setSelectedPump(null);
      setScannedQR(null);
      setSessionStart(null);
      return;
    }

    const vehicleType: "MATRIX" | "TRAILER" = scannedQR.toUpperCase().includes("MATRIX")
      ? "MATRIX"
      : "TRAILER";

    const endTime = new Date().toISOString();

    addSession({
      pumpId: selectedPump,
      qrIdentifier: scannedQR,
      vehicleType,
      startTime: sessionStart,
      endTime,
    });

    setStep("STEP_1_HOME");
    setSelectedPump(null);
    setScannedQR(null);
    setSessionStart(null);
  }, [selectedPump, scannedQR, sessionStart]);

  const goBackToHome = () => {
    setStep("STEP_1_HOME");
    setSelectedPump(null);
  };

  const goBackToPump = () => {
    setStep("STEP_2_SELECT_PUMP");
    setScannedQR(null);
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f9f9f9] flex flex-col items-center justify-center px-4 py-6 sm:py-10">
      {step === "STEP_1_HOME" && (
        <div key="STEP_1_HOME" className="flex flex-col items-center text-center animate-fadeInUp">
          <h1 className="text-3xl font-bold text-[#333333] mb-2">
            NapoliTrans
          </h1>
          <p className="text-base text-[#333333] mb-10 opacity-80">
            Gestione rifornimento carburante
          </p>

          <button
            onClick={handleStartRefuelling}
            className="flex items-center gap-3 px-12 py-5 bg-[#D32F2F] text-[#f4f4f4] font-bold text-lg rounded-2xl shadow-lg
                       transition-all duration-200
                       hover:bg-[#B71C1C] hover:scale-105 active:scale-95"
          >
            <Fuel className="w-6 h-6" />
            AVVIA RIFORNIMENTO
          </button>
        </div>
      )}

      {step === "STEP_2_SELECT_PUMP" && (
        <div key="STEP_2_SELECT_PUMP" className="w-full max-w-2xl mx-auto animate-fadeInUp">
          <StepHeader
            currentStep={2}
            title="Seleziona la pompa"
            onBack={goBackToHome}
          />
          <PumpSelector onSelect={handlePumpSelect} />
        </div>
      )}

      {step === "STEP_3_SCAN_QR" && (
        <div key="STEP_3_SCAN_QR" className="w-full max-w-2xl mx-auto animate-fadeInUp">
          <StepHeader
            currentStep={3}
            title="Scansiona il QR"
            onBack={goBackToPump}
          />
          <QRScanner onScan={handleQRScan} />
        </div>
      )}

      {step === "STEP_4_IN_PROGRESS" && selectedPump !== null && scannedQR !== null && sessionStart !== null && (
        <div key="STEP_4_IN_PROGRESS" className="w-full max-w-2xl mx-auto animate-fadeInUp">
          <StepHeader
            currentStep={4}
            title="Rifornimento in corso"
            onBack={goBackToPump}
            showBack={false}
          />
          <RefuellingInProgress
            pumpId={selectedPump}
            qrValue={scannedQR}
            startTime={sessionStart}
            onEnd={handleEndRefuelling}
          />
        </div>
      )}
    </div>
  );
}
