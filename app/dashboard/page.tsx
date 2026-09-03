"use client";

import React from "react";
import { useRefill } from "@/context/RefillContext";

export default function DashboardPage() {
  const { schedules, paymentState, togglePause, skipSchedule } = useRefill();

  const activeCount = schedules.filter((s) => s.status === "Active").length;
  const nextOrder = schedules.length > 0 ? schedules[0].nextOrder : "None";
  const isFailed = paymentState.status === "Payment Failed";
  const paymentStatus = isFailed ? "Retry in Progress" : "Up to date";

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#1F2937]">Dashboard</h1>

      {/* 3 Summary Cards (Compact, 11px radius, soft shadow) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="border border-[#E5E7EB] rounded-[11px] p-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="text-xs font-medium text-[#6B7280]">Active Schedules</div>
          <div className="text-xl font-bold text-[#1F2937] mt-1">{activeCount}</div>
        </div>

        <div className="border border-[#E5E7EB] rounded-[11px] p-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="text-xs font-medium text-[#6B7280]">Next Order</div>
          <div className="text-xl font-bold text-[#1F2937] mt-1">{nextOrder}</div>
        </div>

        <div className="border border-[#E5E7EB] rounded-[11px] p-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="text-xs font-medium text-[#6B7280]">Payment Status</div>
          <div className="mt-1 flex items-center">
            <span
              className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-[8px] border ${
                isFailed
                  ? "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]/60"
                  : "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]/60"
              }`}
            >
              {paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* My Schedules Section */}
      <div className="space-y-3.5 pt-1">
        <h2 className="text-base font-bold text-[#1F2937]">My Schedules</h2>

        <div className="space-y-3">
          {schedules.map((item) => (
            <div
              key={item.id}
              className="border border-[#E5E7EB] rounded-[12px] p-5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-[#D1D5DB] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1F2937]">
                    {item.patient}
                  </span>
                  <span
                    className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-[8px] border ${
                      item.status === "Active"
                        ? "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]/60"
                        : "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-[#6B7280]">
                  Medicines: <span className="font-medium text-[#1F2937]">{item.medicines}</span>
                </div>
                <div className="text-[#6B7280]">
                  Schedule: <span className="font-medium text-[#1F2937]">{item.frequency}</span>
                </div>
                <div className="text-[#6B7280]">
                  Next Order: <span className="font-medium text-[#1F2937]">{item.nextOrder}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-start sm:self-center pt-2 sm:pt-0">
                <button
                  onClick={() => togglePause(item.id)}
                  className="px-3.5 py-1.5 border border-[#E5E7EB] rounded-[10px] bg-white hover:bg-[#F9FAFB] hover:text-[#C94F6D] font-medium text-[#374151] text-xs transition cursor-pointer"
                >
                  {item.status === "Active" ? "Pause" : "Resume"}
                </button>
                <button
                  onClick={() => skipSchedule(item.id)}
                  className="px-3.5 py-1.5 border border-[#E5E7EB] rounded-[10px] bg-white hover:bg-[#F9FAFB] hover:text-[#C94F6D] font-medium text-[#374151] text-xs transition cursor-pointer"
                >
                  Skip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
