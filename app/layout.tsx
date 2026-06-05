import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dashboard - Sample App",
  description: "A sample dashboard application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${roboto.variable} h-full font-sans antialiased`}
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
