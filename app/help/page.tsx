import { HelpCircle, MessageCircle, BookOpen, Mail } from "lucide-react";

const faqs = [
  {
    question: "How do I create a new order?",
    answer: "Navigate to the Orders page and click the 'New Order' button. Fill in the customer details and product information, then submit.",
  },
  {
    question: "Can I export my reports?",
    answer: "Yes! Go to the Reports page, select the report you want, and click the download icon in the top right corner to export as PDF or CSV.",
  },
  {
    question: "How do I update my billing information?",
    answer: "Visit the Settings page, then select the 'Billing' tab from the left sidebar. You can update payment methods and billing address there.",
  },
  {
    question: "Is there a mobile app available?",
    answer: "We are currently developing mobile apps for iOS and Android. Stay tuned for updates via our newsletter.",
  },
];

export default function HelpPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Help Center</h1>
        <p className="text-[#64748b] mt-1">Find answers or get in touch with our support team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: BookOpen, title: "Documentation", desc: "Read our comprehensive guides" },
          { icon: MessageCircle, title: "Live Chat", desc: "Chat with support in real-time" },
          { icon: Mail, title: "Email Support", desc: "Get help via email within 24h" },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Icon size={20} />
              </div>
              <h3 className="font-semibold text-[#0f172a]">{c.title}</h3>
              <p className="text-sm text-[#64748b] mt-1">{c.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h2 className="text-lg font-semibold text-[#0f172a]">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-[#e2e8f0]">
          {faqs.map((faq) => (
            <div key={faq.question} className="px-6 py-5">
              <div className="flex items-start gap-3">
                <HelpCircle size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium text-[#0f172a]">{faq.question}</h3>
                  <p className="text-sm text-[#64748b] mt-1 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
