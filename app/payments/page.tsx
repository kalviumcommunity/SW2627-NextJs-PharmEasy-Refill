"use client";

import React, { useState } from "react";
import { useRefill } from "@/context/RefillContext";

export default function PaymentsPage() {
  const { paymentState, retryPayment, updatePaymentMethods } = useRefill();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [primary, setPrimary] = useState(paymentState.primaryMethod);
  const [backup, setBackup] = useState(paymentState.backupMethod);

  const isFailed = paymentState.status === "Payment Failed";

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePaymentMethods(primary, backup);
    setShowUpdateModal(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl font-bold text-[#1F2937]">Payments</h1>

      {/* Main Payment Section (12px radius, soft shadow) */}
      <div className="border border-[#E5E7EB] rounded-[12px] p-6 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4 text-xs">
        <div className="space-y-2">
          <div className="text-[#6B7280]">
            Order: <span className="font-mono font-bold text-[#1F2937]">{paymentState.orderId}</span>
          </div>
          <div className="text-[#6B7280]">
            Amount: <span className="font-bold text-[#1F2937]">₹{paymentState.amount}</span>
          </div>
          <div className="text-[#6B7280] flex items-center gap-2">
            <span>Status:</span>
            <span
              className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-[8px] border ${
                isFailed
                  ? "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]/60"
                  : "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]/60"
              }`}
            >
              {paymentState.status}
            </span>
          </div>
          {isFailed && (
            <>
              <div className="text-[#6B7280]">
                Retry: <span className="font-medium text-[#1F2937]">{paymentState.retryCount} of {paymentState.maxRetries}</span>
              </div>
              <div className="text-[#6B7280]">
                Grace Period: <span className="font-medium text-[#1F2937]">{paymentState.gracePeriod}</span>
              </div>
            </>
          )}
        </div>

        {/* Simple Flow Line */}
        <div className="pt-3 border-t border-[#E5E7EB] text-[#1F2937] font-medium">
          Payment Attempt → Failed → Retry → Backup Payment → Successful
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center gap-3">
          {isFailed ? (
            <button
              onClick={retryPayment}
              className="bg-[#C94F6D] hover:bg-[#B33D5B] text-white font-medium px-4 py-2 rounded-[10px] text-xs transition cursor-pointer"
            >
              Retry Now
            </button>
          ) : (
            <div className="text-xs text-[#065F46] font-medium py-1">
              Payment resolved successfully.
            </div>
          )}

          <button
            onClick={() => setShowUpdateModal(true)}
            className="border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-[#374151] font-medium px-4 py-2 rounded-[10px] text-xs transition cursor-pointer"
          >
            Update Payment
          </button>
        </div>
      </div>

      {/* Payment Methods Config (12px radius) */}
      <div className="border border-[#E5E7EB] rounded-[12px] p-5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-2 text-xs">
        <div className="font-bold text-[#1F2937]">Configured Methods</div>
        <div className="text-[#6B7280]">Primary: <span className="font-medium text-[#1F2937]">{paymentState.primaryMethod}</span></div>
        <div className="text-[#6B7280]">Backup: <span className="font-medium text-[#1F2937]">{paymentState.backupMethod}</span></div>
      </div>

      {/* Simple Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 max-w-sm w-full space-y-4 text-xs shadow-lg">
            <h3 className="text-sm font-bold text-[#1F2937]">Update Payment Methods</h3>
            <form onSubmit={handleUpdate} className="space-y-3.5">
              <div>
                <label className="block text-[#6B7280] font-medium mb-1">Primary Payment</label>
                <select
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-[10px] px-3 py-2 bg-white text-[#1F2937] text-xs focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition cursor-pointer"
                >
                  <option value="UPI AutoPay">UPI AutoPay</option>
                  <option value="NetBanking">NetBanking</option>
                  <option value="Debit Card">Debit Card</option>
                </select>
              </div>

              <div>
                <label className="block text-[#6B7280] font-medium mb-1">Backup Payment</label>
                <select
                  value={backup}
                  onChange={(e) => setBackup(e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-[10px] px-3 py-2 bg-white text-[#1F2937] text-xs focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition cursor-pointer"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Secondary UPI">Secondary UPI</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-3.5 py-1.5 text-[#6B7280] hover:bg-[#F9FAFB] rounded-[10px] text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#C94F6D] hover:bg-[#B33D5B] text-white rounded-[10px] font-medium text-xs transition cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
