"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRefill } from "@/context/RefillContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isLoggedIn } = useRefill();

  // Hide nav on login page and root redirect
  if (pathname === "/login" || pathname === "/" || !isLoggedIn) {
    return null;
  }

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "New Schedule", href: "/new-schedule" },
    { name: "Orders", href: "/orders" },
    { name: "Payments", href: "/payments" },
    { name: "Notifications", href: "/notifications" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="border-b border-[#E5E7EB] bg-white sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link
          href="/dashboard"
          className="font-bold text-sm text-[#1F2937] hover:text-[#C94F6D] transition flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#C94F6D]"></span>
          <span>PharmEasy Auto-Refill</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-[10px] transition ${
                  isActive
                    ? "bg-[#FCEFF2] text-[#C94F6D] font-semibold"
                    : "text-[#374151] hover:bg-[#F9FAFB] hover:text-[#C94F6D]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="text-[#6B7280] hover:text-[#991B1B] hover:bg-[#F9FAFB] px-2.5 py-1.5 rounded-[10px] transition ml-1 sm:ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
