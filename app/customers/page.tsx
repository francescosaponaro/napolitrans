import { Users, Mail, Phone, MapPin, Calendar } from "lucide-react";

const customers = [
  { name: "John Smith", email: "john@example.com", phone: "+1 555-0123", location: "New York, NY", joined: "2023-01-15", orders: 24 },
  { name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 555-0124", location: "Los Angeles, CA", joined: "2023-02-20", orders: 18 },
  { name: "Michael Brown", email: "michael@example.com", phone: "+1 555-0125", location: "Chicago, IL", joined: "2023-03-10", orders: 31 },
  { name: "Emily Davis", email: "emily@example.com", phone: "+1 555-0126", location: "Houston, TX", joined: "2023-04-05", orders: 12 },
  { name: "Robert Wilson", email: "robert@example.com", phone: "+1 555-0127", location: "Phoenix, AZ", joined: "2023-05-18", orders: 45 },
  { name: "Lisa Anderson", email: "lisa@example.com", phone: "+1 555-0128", location: "Seattle, WA", joined: "2023-06-22", orders: 9 },
];

export default function CustomersPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Customers</h1>
        <p className="text-[#64748b] mt-1">Manage your customer base and view their details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((c) => (
          <div key={c.email} className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {c.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-semibold text-[#0f172a]">{c.name}</div>
                <div className="text-xs text-[#64748b]">{c.orders} orders</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[#475569]">
                <Mail size={14} className="text-[#94a3b8]" />
                {c.email}
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Phone size={14} className="text-[#94a3b8]" />
                {c.phone}
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <MapPin size={14} className="text-[#94a3b8]" />
                {c.location}
              </div>
              <div className="flex items-center gap-2 text-[#475569]">
                <Calendar size={14} className="text-[#94a3b8]" />
                Joined {c.joined}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
