import type { Metadata } from "next";
import { Mulish, Ovo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });
const ovo = Ovo({ weight: "400", subsets: ["latin"], variable: "--font-ovo" });

export const metadata: Metadata = {
  title: "ElectionGuide AI",
  description: "Intelligent Election Education Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${mulish.variable} ${ovo.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
