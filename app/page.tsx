"use client";

import { useState } from "react";

type Frequency = "Daily" | "Weekly" | "Monthly";

type Refill = {
  id: number;
  medicineName: string;
  quantity: string;
  frequency: Frequency;
  nextRefillDate: string;
};

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const [refills, setRefills] = useState<Refill[]>([
    {
      id: 1,
      medicineName: "Paracetamol",
      quantity: "2 packs",
      frequency: "Monthly",
      nextRefillDate: "15 September 2026",
    },
  ]);

  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("Daily");
  const [nextRefillDate, setNextRefillDate] = useState("");

  function handleCreateRefill() {
    if (!medicineName || !quantity || !nextRefillDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newRefill: Refill = {
      id: Date.now(),
      medicineName,
      quantity,
      frequency,
      nextRefillDate,
    };

    setRefills([...refills, newRefill]);

    setMedicineName("");
    setQuantity("");
    setFrequency("Daily");
    setNextRefillDate("");
    setShowForm(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-blue-600">
          PharmEasy Refill
        </h1>

        <p className="mt-2 text-gray-700">
          Manage your medicine auto-refills easily.
        </p>

        {/* Refill Section */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Auto-Refills
            </h2>

            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {showForm ? "Cancel" : "+ Create New Refill"}
            </button>
          </div>

          {/* Existing Refills */}
          <div className="mt-6 space-y-4">
            {refills.map((refill) => (
              <div
                key={refill.id}
                className="rounded-lg border border-gray-300 bg-white p-4"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {refill.medicineName}
                </h3>

                <p className="mt-2 text-gray-700">
                  Quantity: {refill.quantity}
                </p>

                <p className="text-gray-700">
                  Frequency: {refill.frequency}
                </p>

                <p className="text-gray-700">
                  Next refill: {refill.nextRefillDate}
                </p>
              </div>
            ))}
          </div>

          {/* Create Refill Form */}
          {showForm && (
            <div className="mt-6 rounded-lg border border-gray-300 bg-gray-50 p-6 text-gray-900">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Refill
              </h2>

              {/* Medicine Name */}
              <div className="mt-4">
                <label className="block font-medium text-gray-800">
                  Medicine Name
                </label>

                <input
                  type="text"
                  placeholder="Enter medicine name"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Quantity */}
              <div className="mt-4">
                <label className="block font-medium text-gray-800">
                  Quantity
                </label>

                <input
                  type="text"
                  placeholder="e.g. 2 packs"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Frequency */}
              <div className="mt-4">
                <label className="block font-medium text-gray-800">
                  Refill Frequency
                </label>

                <select
                  value={frequency}
                  onChange={(e) =>
                    setFrequency(e.target.value as Frequency)
                  }
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              {/* Next Refill Date */}
              <div className="mt-4">
                <label className="block font-medium text-gray-800">
                  Next Refill Date
                </label>

                <input
                  type="date"
                  value={nextRefillDate}
                  onChange={(e) => setNextRefillDate(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900"
                />
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreateRefill}
                className="mt-6 rounded-lg bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
              >
                Create Refill
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}