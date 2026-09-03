"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRefill } from "@/context/RefillContext";

export default function NewSchedulePage() {
  const router = useRouter();
  const { addSchedule } = useRefill();

  const [patient, setPatient] = useState("Rajesh Chugh");
  const [medicine, setMedicine] = useState("Glycomet-GP 1/500");
  const [quantity, setQuantity] = useState("1");
  const [frequency, setFrequency] = useState<"Daily" | "Weekly" | "Monthly">("Monthly");
  const [startDate, setStartDate] = useState("2026-10-08");
  const [notification] = useState("48 hours before order");
  const [primaryPayment, setPrimaryPayment] = useState("UPI AutoPay");
  const [backupPayment, setBackupPayment] = useState("Credit Card");
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format display date
    const d = new Date(startDate || "2026-10-08");
    const formattedDate = !isNaN(d.getTime())
      ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "08 Oct 2026";

    addSchedule({
      patient,
      medicines: `${medicine} (${quantity}x)`,
      frequency,
      nextOrder: formattedDate,
      status: "Active",
    });

    setIsCreated(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#1F2937]">Create Schedule</h1>
        <p className="text-xs text-[#6B7280] mt-1">
          Set up an automated refill schedule for recurring medicine orders.
        </p>
      </div>

      {isCreated && (
        <div className="p-3.5 bg-[#ECFDF5] border border-[#A7F3D0]/70 text-[#065F46] text-xs rounded-[10px] font-medium">
          Schedule created successfully. Redirecting to Dashboard...
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border border-[#E5E7EB] rounded-[12px] p-6 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-5 text-xs"
      >
        <div>
          <label className="block text-[#1F2937] font-medium mb-1.5">Patient</label>
          <input
            type="text"
            required
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="w-full border border-[#E5E7EB] rounded-[10px] px-3.5 py-2.5 text-sm text-[#1F2937] focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-[#1F2937] font-medium mb-1.5">Medicine</label>
            <input
              type="text"
              required
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-[10px] px-3.5 py-2.5 text-sm text-[#1F2937] focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[#1F2937] font-medium mb-1.5">Quantity</label>
            <input
              type="number"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-[10px] px-3.5 py-2.5 text-sm text-[#1F2937] focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#1F2937] font-medium mb-1.5">Schedule</label>
          <div className="grid grid-cols-3 gap-2.5">
            {(["Daily", "Weekly", "Monthly"] as const).map((freq) => {
              const isSelected = frequency === freq;
              return (
                <button
                  type="button"
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`py-2.5 px-3 rounded-[10px] text-xs font-medium border text-center transition cursor-pointer ${
                    isSelected
                      ? "bg-[#FCEFF2] border-[#C94F6D] text-[#C94F6D] font-semibold"
                      : "bg-white border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {freq}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#1F2937] font-medium mb-1.5">Start Date</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-[10px] px-3.5 py-2.5 text-sm text-[#1F2937] focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[#1F2937] font-medium mb-1.5">Notification</label>
            <input
              type="text"
              readOnly
              value={notification}
              className="w-full border border-[#E5E7EB] bg-[#F8F9FA] rounded-[10px] px-3.5 py-2.5 text-sm text-[#6B7280] cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-[#1F2937] font-medium mb-1.5">Primary Payment</label>
            <select
              value={primaryPayment}
              onChange={(e) => setPrimaryPayment(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-[10px] px-3.5 py-2.5 text-sm bg-white text-[#1F2937] focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition cursor-pointer"
            >
              <option value="UPI AutoPay">UPI AutoPay</option>
              <option value="NetBanking">NetBanking</option>
              <option value="Debit Card">Debit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-[#1F2937] font-medium mb-1.5">Backup Payment</label>
            <select
              value={backupPayment}
              onChange={(e) => setBackupPayment(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-[10px] px-3.5 py-2.5 text-sm bg-white text-[#1F2937] focus:border-[#C94F6D] focus:ring-2 focus:ring-[#C94F6D]/15 focus:outline-none transition cursor-pointer"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Secondary UPI">Secondary UPI</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#C94F6D] hover:bg-[#B33D5B] text-white font-medium px-5 py-2.5 rounded-[10px] text-sm transition cursor-pointer shadow-xs"
          >
            Create Schedule
          </button>
        </div>
      </form>
    </div>
  );
}
