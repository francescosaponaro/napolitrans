import DataTable from "@/components/DataTable";

export default function OrdersPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Orders</h1>
        <p className="text-[#64748b] mt-1">View and manage all customer orders.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h2 className="text-lg font-semibold text-[#0f172a]">All Orders</h2>
          <p className="text-sm text-[#64748b] mt-0.5">Full order history and details</p>
        </div>
        <DataTable />
      </div>
    </div>
  );
}
