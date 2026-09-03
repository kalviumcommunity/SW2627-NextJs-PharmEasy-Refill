"use client";

import React, { useState } from "react";
import { useRefill, ScheduledOrder } from "@/context/RefillContext";

export default function OrdersPage() {
  const { orders } = useRefill();
  const [filter, setFilter] = useState<"All" | "Scheduled" | "Completed" | "Payment Failed">("All");
  const [selectedOrder, setSelectedOrder] = useState<ScheduledOrder | null>(null);

  const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  // Auto select first failed order if available, or first order
  const activeDetailOrder = selectedOrder || filteredOrders[0] || null;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#1F2937]">Orders</h1>

      {/* Filters */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[#6B7280] font-medium mr-1">Filter:</span>
        {(["All", "Scheduled", "Completed", "Payment Failed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilter(status);
              setSelectedOrder(null);
            }}
            className={`px-3 py-1.5 rounded-[10px] border transition cursor-pointer ${
              filter === status
                ? "bg-[#C94F6D] text-white border-[#C94F6D] font-medium"
                : "bg-white text-[#374151] border-[#E5E7EB] hover:bg-[#F9FAFB]"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table (12px radius, soft shadow, subtle borders) */}
      <div className="border border-[#E5E7EB] rounded-[12px] overflow-x-auto bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB] text-[#6B7280] font-semibold">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Medicine</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filteredOrders.map((order) => {
              const isSelected = activeDetailOrder?.id === order.id;
              return (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`cursor-pointer hover:bg-[#F8F9FA] transition ${
                    isSelected ? "bg-[#FCEFF2]/40" : ""
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-medium text-[#1F2937]">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-[#1F2937] font-medium">{order.patient}</td>
                  <td className="py-3 px-4 text-[#6B7280]">{order.medicine}</td>
                  <td className="py-3 px-4 text-[#6B7280]">{order.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-[8px] border ${
                        order.status === "Completed"
                          ? "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]/60"
                          : order.status === "Payment Failed"
                          ? "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]/60"
                          : "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Order Details (12px card) */}
      {activeDetailOrder && (
        <div className="border border-[#E5E7EB] rounded-[12px] p-5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3.5 text-xs">
          <div className="font-bold text-sm text-[#1F2937]">
            Order Details: {activeDetailOrder.id}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[#6B7280]">
            <div>Patient: <span className="font-medium text-[#1F2937]">{activeDetailOrder.patient}</span></div>
            <div>Amount: <span className="font-medium text-[#1F2937]">₹{activeDetailOrder.amount}</span></div>
            <div>Date: <span className="font-medium text-[#1F2937]">{activeDetailOrder.date}</span></div>
            <div>
              Status:{" "}
              <span
                className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-[8px] border ${
                  activeDetailOrder.status === "Completed"
                    ? "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]/60"
                    : activeDetailOrder.status === "Payment Failed"
                    ? "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]/60"
                    : "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]"
                }`}
              >
                {activeDetailOrder.status}
              </span>
            </div>
          </div>

          {activeDetailOrder.status === "Payment Failed" ? (
            <div className="pt-3 border-t border-[#E5E7EB] space-y-1.5">
              <div className="text-[#991B1B] font-semibold">Payment Failed</div>
              <div className="text-[#6B7280]">Retry: {activeDetailOrder.retry || "1 of 3"}</div>
              <div className="text-[#6B7280]">Grace Period: {activeDetailOrder.gracePeriod || "72 hours"}</div>
              <div className="text-[#1F2937] font-medium pt-1">
                Notification Sent → Order Created → Payment Failed → Retry
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-[#E5E7EB] text-[#1F2937] font-medium">
              Notification Sent → Order Created → Payment Successful → Completed
            </div>
          )}
        </div>
      )}
    </div>
  );
}
