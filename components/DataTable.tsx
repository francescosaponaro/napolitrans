"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

type OrderStatus = "Completed" | "Pending" | "Processing" | "Cancelled";

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

const orders: Order[] = [
  { id: "#ORD-7523", customer: "John Smith", email: "john@example.com", product: "MacBook Pro 16\"", amount: 2499.00, status: "Completed", date: "2024-05-28" },
  { id: "#ORD-7522", customer: "Sarah Johnson", email: "sarah@example.com", product: "iPhone 15 Pro", amount: 1199.00, status: "Completed", date: "2024-05-28" },
  { id: "#ORD-7521", customer: "Michael Brown", email: "michael@example.com", product: "AirPods Pro 2", amount: 249.00, status: "Completed", date: "2024-05-27" },
  { id: "#ORD-7520", customer: "Emily Davis", email: "emily@example.com", product: "iPad Air", amount: 799.00, status: "Pending", date: "2024-05-27" },
  { id: "#ORD-7519", customer: "Robert Wilson", email: "robert@example.com", product: "Apple Watch Ultra", amount: 799.00, status: "Completed", date: "2024-05-26" },
  { id: "#ORD-7518", customer: "Lisa Anderson", email: "lisa@example.com", product: "Magic Keyboard", amount: 299.00, status: "Cancelled", date: "2024-05-26" },
  { id: "#ORD-7517", customer: "David Martinez", email: "david@example.com", product: "Studio Display", amount: 1599.00, status: "Processing", date: "2024-05-25" },
  { id: "#ORD-7516", customer: "Jennifer Taylor", email: "jen@example.com", product: "Mac Studio", amount: 1999.00, status: "Completed", date: "2024-05-25" },
  { id: "#ORD-7515", customer: "James Thomas", email: "james@example.com", product: "HomePod Mini", amount: 99.00, status: "Pending", date: "2024-05-24" },
  { id: "#ORD-7514", customer: "Amanda White", email: "amanda@example.com", product: "AirTag 4-Pack", amount: 99.00, status: "Completed", date: "2024-05-24" },
  { id: "#ORD-7513", customer: "Christopher Lee", email: "chris@example.com", product: "Mac mini M2", amount: 599.00, status: "Processing", date: "2024-05-23" },
  { id: "#ORD-7512", customer: "Michelle Garcia", email: "michelle@example.com", product: "Apple TV 4K", amount: 149.00, status: "Completed", date: "2024-05-23" },
];

type SortKey = keyof Order;
type SortDir = "asc" | "desc";

const statusStyles: Record<OrderStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  Processing: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20",
  Cancelled: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
};

export default function DataTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = orders.filter((o) =>
    Object.values(o).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const headers: { key: SortKey; label: string; width?: string }[] = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "product", label: "Product" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  return (
    <div>
      {/* Search */}
      <div className="px-6 py-4 border-b border-[#e2e8f0]">
        <div className="relative max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
          />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
              {headers.map((h) => (
                <th
                  key={h.key}
                  className="text-left px-6 py-3.5 font-semibold text-[#475569] cursor-pointer select-none whitespace-nowrap"
                  onClick={() => handleSort(h.key)}
                >
                  <div className="flex items-center gap-1">
                    {h.label}
                    {sortKey === h.key && (
                      sortDir === "asc" ? (
                        <ChevronUp size={14} className="text-blue-500" />
                      ) : (
                        <ChevronDown size={14} className="text-blue-500" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((order, i) => (
              <tr
                key={order.id}
                className={`border-b border-[#e2e8f0] transition-colors hover:bg-[#f8fafc] ${
                  i % 2 === 1 ? "bg-[#fafafa]" : "bg-white"
                }`}
              >
                <td className="px-6 py-3.5 font-medium text-[#0f172a] whitespace-nowrap">
                  {order.id}
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap">
                  <div>
                    <div className="font-medium text-[#0f172a]">{order.customer}</div>
                    <div className="text-[#94a3b8] text-xs">{order.email}</div>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-[#334155] whitespace-nowrap">
                  {order.product}
                </td>
                <td className="px-6 py-3.5 font-medium text-[#0f172a] whitespace-nowrap">
                  ${order.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-3.5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-[#64748b] whitespace-nowrap">
                  {order.date}
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#94a3b8]">
                  No orders found matching &quot;{search}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-[#e2e8f0] flex items-center justify-between text-sm text-[#64748b]">
        <span>Showing {sorted.length} of {orders.length} orders</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] bg-white hover:bg-[#f8fafc] disabled:opacity-40" disabled>
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] bg-white hover:bg-[#f8fafc] disabled:opacity-40" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
