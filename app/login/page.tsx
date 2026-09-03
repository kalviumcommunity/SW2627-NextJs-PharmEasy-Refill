"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRefill } from "@/context/RefillContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useRefill();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      login();
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-[#E5E7EB] rounded-[12px] p-7 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C94F6D]"></span>
          <h1 className="text-base font-bold text-[#1F2937]">
            PharmEasy Auto-Refill
          </h1>
        </div>
        <p className="text-xs text-[#6B7280] mb-5">
          Sign in to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#1F2937] mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full border border-[#E5E7EB] rounded-[10px] px-3.5 py-2 text-sm text-[#1F2937] placeholder-[#6B7280]/60 bg-white focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1F2937] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#E5E7EB] rounded-[10px] px-3.5 py-2 text-sm text-[#1F2937] placeholder-[#6B7280]/60 bg-white focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C94F6D] hover:bg-[#B33D5B] text-white font-medium py-2.5 rounded-[10px] text-sm transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="text-[11px] text-[#6B7280] mt-4 text-center">
          Demo: Enter any email and password.
        </p>
      </div>
    </div>
  );
}
