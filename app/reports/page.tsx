import { BarChart3, TrendingUp, PieChart } from "lucide-react";

const reportCards = [
  {
    title: "Sales Overview",
    description: "Monthly revenue breakdown across all channels",
    icon: BarChart3,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Growth Trends",
    description: "Year-over-year growth by product category",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Market Share",
    description: "Distribution of sales across regions",
    icon: PieChart,
    color: "bg-purple-50 text-purple-600",
  },
];

const monthlyData = [
  { month: "Jan", revenue: 32400, orders: 245 },
  { month: "Feb", revenue: 28900, orders: 198 },
  { month: "Mar", revenue: 42100, orders: 312 },
  { month: "Apr", revenue: 38500, orders: 278 },
  { month: "May", revenue: 45231, orders: 345 },
];

export default function ReportsPage() {
  const maxRev = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Reports</h1>
        <p className="text-[#64748b] mt-1">Analytics and insights for your business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {reportCards.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className={`w-10 h-10 rounded-lg ${r.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-[#0f172a]">{r.title}</h3>
              <p className="text-sm text-[#64748b] mt-1">{r.description}</p>
            </div>
          );
        })}
      </div>

      {/* Simple bar chart */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0f172a] mb-6">Monthly Revenue</h2>
        <div className="flex items-end gap-6 h-64">
          {monthlyData.map((d) => {
            const heightPct = (d.revenue / maxRev) * 100;
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs font-medium text-[#475569]">${(d.revenue / 1000).toFixed(1)}k</div>
                <div className="w-full max-w-[80px] bg-blue-100 rounded-t-md relative overflow-hidden" style={{ height: `${heightPct}%` }}>
                  <div className="absolute inset-0 bg-blue-500/80 rounded-t-md" />
                </div>
                <div className="text-sm font-medium text-[#475569]">{d.month}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
