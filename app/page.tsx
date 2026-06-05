import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import DataTable from "@/components/DataTable";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,345",
    change: "+15.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "12,234",
    change: "-3.5%",
    trend: "down",
    icon: ShoppingCart,
  },
  {
    title: "Growth Rate",
    value: "8.4%",
    change: "+1.2%",
    trend: "up",
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
        <p className="text-[#64748b] mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your business.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
          const trendColor =
            stat.trend === "up" ? "text-emerald-600" : "text-red-500";
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[#64748b]">{stat.title}</span>
                <div className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center">
                  <Icon size={18} className="text-[#475569]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#0f172a]">
                {stat.value}
              </div>
              <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${trendColor}`}>
                <TrendIcon size={14} />
                <span>{stat.change}</span>
                <span className="text-[#94a3b8] font-normal ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm p-5 mb-8">
        <h2 className="text-sm font-semibold text-[#0f172a] mb-4 uppercase tracking-wide">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] text-sm font-medium transition-colors">
            <Plus size={16} />
            New Order
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] text-sm font-medium transition-colors">
            <Plus size={16} />
            New Customer
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] text-sm font-medium transition-colors">
            <Plus size={16} />
            New Product
          </button>
        </div>
      </div>

      {/* Table section */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h2 className="text-lg font-semibold text-[#0f172a]">Recent Orders</h2>
          <p className="text-sm text-[#64748b] mt-0.5">
            You have 24 orders this month
          </p>
        </div>
        <DataTable />
      </div>
    </div>
  );
}
