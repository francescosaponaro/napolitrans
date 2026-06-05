import { FileText, Download, CheckCircle, Clock } from "lucide-react";

const invoices = [
  { id: "INV-2024-001", client: "Acme Corp", amount: 5400.00, status: "Paid", date: "2024-05-01", due: "2024-05-15" },
  { id: "INV-2024-002", client: "Globex Inc", amount: 3200.00, status: "Paid", date: "2024-05-03", due: "2024-05-17" },
  { id: "INV-2024-003", client: "Soylent Corp", amount: 8750.00, status: "Pending", date: "2024-05-05", due: "2024-05-19" },
  { id: "INV-2024-004", client: "Initech", amount: 2100.00, status: "Overdue", date: "2024-04-20", due: "2024-05-04" },
  { id: "INV-2024-005", client: "Umbrella LLC", amount: 12900.00, status: "Paid", date: "2024-05-10", due: "2024-05-24" },
];

const statusIcon = {
  Paid: <CheckCircle size={16} className="text-emerald-600" />,
  Pending: <Clock size={16} className="text-amber-600" />,
  Overdue: <Clock size={16} className="text-red-600" />,
};

const statusClass = {
  Paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  Overdue: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
};

export default function InvoicesPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Invoices</h1>
        <p className="text-[#64748b] mt-1">Manage billing and invoice records.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#e2e8f0] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#0f172a]">Recent Invoices</h2>
            <p className="text-sm text-[#64748b] mt-0.5">Download or view invoice details</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <FileText size={16} />
            New Invoice
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                <th className="text-left px-6 py-3.5 font-semibold text-[#475569]">Invoice ID</th>
                <th className="text-left px-6 py-3.5 font-semibold text-[#475569]">Client</th>
                <th className="text-left px-6 py-3.5 font-semibold text-[#475569]">Amount</th>
                <th className="text-left px-6 py-3.5 font-semibold text-[#475569]">Status</th>
                <th className="text-left px-6 py-3.5 font-semibold text-[#475569]">Due Date</th>
                <th className="text-left px-6 py-3.5 font-semibold text-[#475569]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc] transition-colors">
                  <td className="px-6 py-3.5 font-medium text-[#0f172a]">{inv.id}</td>
                  <td className="px-6 py-3.5 text-[#334155]">{inv.client}</td>
                  <td className="px-6 py-3.5 font-medium text-[#0f172a]">${inv.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusClass[inv.status as keyof typeof statusClass]}`}>
                      {statusIcon[inv.status as keyof typeof statusIcon]}
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-[#64748b]">{inv.due}</td>
                  <td className="px-6 py-3.5">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <Download size={14} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
