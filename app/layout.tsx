import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "NapoliTrans - Gestione Rifornimento",
  description: "Piattaforma di gestione rifornimento carburante NapoliTrans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full">
      <body
        className={`${roboto.variable} min-h-full flex flex-col font-sans antialiased`}
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        <NavBar />
        <main className="flex-1 pt-[60px]">{children}</main>
      </body>
    </html>
  );
}
