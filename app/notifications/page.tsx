"use client";

import React from "react";
import { useRefill } from "@/context/RefillContext";

export default function NotificationsPage() {
  const { notifications } = useRefill();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-bold text-[#1F2937]">Notifications</h1>

      {/* List of rows inside a 12px rounded card with soft shadow */}
      <div className="border border-[#E5E7EB] rounded-[12px] overflow-hidden divide-y divide-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        {notifications.map((item) => (
          <div key={item.id} className="p-4.5 text-xs space-y-1 hover:bg-[#F8F9FA] transition">
            <div className="font-bold text-[#1F2937] text-sm">{item.title}</div>
            <div className="text-[#6B7280]">{item.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
