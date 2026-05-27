import HistoryTable from "@/components/HistoryTable";

export default function HistoryPage() {
  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#f9f9f9] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#333333] mb-6">
          Storico Rifornimenti
        </h1>
        <HistoryTable />
      </div>
    </div>
  );
}
