import type { Metadata } from "next";
import "./globals.css";
import { RefillProvider } from "@/context/RefillContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PharmEasy Auto-Refill",
  description: "Subscription system for medicine auto-refills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8F9FA] text-[#1F2937] min-h-screen flex flex-col font-sans antialiased">
        <RefillProvider>
          <Navbar />
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </main>
        </RefillProvider>
      </body>
    </html>
  );
}
