"use client";

import { useState } from "react";
import { Bell, Shield, Palette, Globe } from "lucide-react";

const sections = [
  { id: "profile", label: "Profile Settings", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [marketing, setMarketing] = useState(true);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Settings</h1>
        <p className="text-[#64748b] mt-1">Manage your account and application preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    active === s.id
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-[#475569] hover:bg-[#f8fafc] border-l-4 border-transparent"
                  }`}
                >
                  <Icon size={18} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {active === "profile" && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-[#0f172a]">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-1">First Name</label>
                  <input type="text" defaultValue="Admin" className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-1">Last Name</label>
                  <input type="text" defaultValue="User" className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#475569] mb-1">Email</label>
                  <input type="email" defaultValue="admin@dashboard.com" className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#475569] mb-1">Bio</label>
                  <textarea rows={3} defaultValue="Dashboard administrator." className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {active === "notifications" && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-[#0f172a]">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Email Notifications", desc: "Receive updates via email", value: emailNotif, set: setEmailNotif },
                  { label: "Push Notifications", desc: "Receive push alerts in browser", value: pushNotif, set: setPushNotif },
                  { label: "Marketing Emails", desc: "Receive product updates and offers", value: marketing, set: setMarketing },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#e2e8f0] last:border-0">
                    <div>
                      <div className="font-medium text-[#0f172a]">{item.label}</div>
                      <div className="text-sm text-[#64748b]">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => item.set(!item.value)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${item.value ? "bg-blue-600" : "bg-[#cbd5e1]"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.value ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "security" && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-[#0f172a]">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-1">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {active === "appearance" && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-[#0f172a]">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Theme</label>
                  <div className="flex gap-3">
                    {["Light", "Dark", "System"].map((t) => (
                      <button key={t} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${t === "Light" ? "bg-blue-50 border-blue-600 text-blue-700" : "border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc]"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#475569] mb-2">Accent Color</label>
                  <div className="flex gap-3">
                    {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((c) => (
                      <button key={c} className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-2 ring-transparent hover:ring-[#cbd5e1]" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
