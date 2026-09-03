"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Schedule {
  id: string;
  patient: string;
  medicines: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  nextOrder: string;
  status: "Active" | "Paused";
}

export interface ScheduledOrder {
  id: string;
  patient: string;
  medicine: string;
  date: string;
  amount: number;
  status: "Scheduled" | "Completed" | "Payment Failed";
  retry?: string;
  gracePeriod?: string;
}

export interface PaymentState {
  orderId: string;
  amount: number;
  patient: string;
  status: "Payment Failed" | "Payment Successful";
  retryCount: number;
  maxRetries: number;
  gracePeriod: string;
  primaryMethod: string;
  backupMethod: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
}

interface RefillContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  schedules: Schedule[];
  orders: ScheduledOrder[];
  paymentState: PaymentState;
  notifications: NotificationItem[];
  addSchedule: (schedule: Omit<Schedule, "id">) => void;
  togglePause: (id: string) => void;
  skipSchedule: (id: string) => void;
  retryPayment: () => void;
  updatePaymentMethods: (primary: string, backup: string) => void;
}

const initialSchedules: Schedule[] = [
  {
    id: "1",
    patient: "Rajesh Chugh",
    medicines: "Glycomet-GP, Telma 40",
    frequency: "Monthly",
    nextOrder: "08 Oct 2026",
    status: "Active",
  },
  {
    id: "2",
    patient: "Kanchi Chugh",
    medicines: "Thyronorm 50mcg, Shelcal 500",
    frequency: "Monthly",
    nextOrder: "15 Oct 2026",
    status: "Active",
  },
];

const initialOrders: ScheduledOrder[] = [
  {
    id: "ORD-1001",
    patient: "Rajesh Chugh",
    medicine: "Glycomet-GP, Telma 40",
    date: "08 Oct 2026",
    amount: 520,
    status: "Scheduled",
  },
  {
    id: "ORD-1002",
    patient: "Kanchi Chugh",
    medicine: "Thyronorm 50mcg, Shelcal 500",
    date: "15 Oct 2026",
    amount: 388,
    status: "Scheduled",
  },
  {
    id: "ORD-1003",
    patient: "Kanchi Chugh",
    medicine: "Thyronorm 50mcg",
    date: "15 Sep 2026",
    amount: 388,
    status: "Payment Failed",
    retry: "1 of 3",
    gracePeriod: "72 hours",
  },
  {
    id: "ORD-1004",
    patient: "Rajesh Chugh",
    medicine: "Glycomet-GP",
    date: "08 Sep 2026",
    amount: 520,
    status: "Completed",
  },
];

const initialPaymentState: PaymentState = {
  orderId: "ORD-1003",
  amount: 388,
  patient: "Kanchi Chugh",
  status: "Payment Failed",
  retryCount: 1,
  maxRetries: 3,
  gracePeriod: "72 hours",
  primaryMethod: "UPI AutoPay",
  backupMethod: "Credit Card",
};

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Order Reminder",
    message: "Your order will be created in 48 hours.",
  },
  {
    id: "n2",
    title: "Payment Failed",
    message: "Retry 1 of 3.",
  },
  {
    id: "n3",
    title: "Order Created",
    message: "Your scheduled order has been created.",
  },
];

const RefillContext = createContext<RefillContextType | undefined>(undefined);

export function RefillProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [orders, setOrders] = useState<ScheduledOrder[]>(initialOrders);
  const [paymentState, setPaymentState] = useState<PaymentState>(initialPaymentState);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const addSchedule = (newSchedule: Omit<Schedule, "id">) => {
    const id = String(schedules.length + 1);
    setSchedules((prev) => [...prev, { ...newSchedule, id }]);

    // Add to orders as scheduled
    const newOrder: ScheduledOrder = {
      id: `ORD-${Math.floor(1005 + Math.random() * 900)}`,
      patient: newSchedule.patient,
      medicine: newSchedule.medicines,
      date: newSchedule.nextOrder,
      amount: 450,
      status: "Scheduled",
    };
    setOrders((prev) => [newOrder, ...prev]);

    setNotifications((prev) => [
      {
        id: String(Date.now()),
        title: "Order Reminder",
        message: `Your next refill for ${newSchedule.patient} is set for ${newSchedule.nextOrder}.`,
      },
      ...prev,
    ]);
  };

  const togglePause = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Paused" : "Active" }
          : s
      )
    );
  };

  const skipSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, nextOrder: "15 Nov 2026" }
          : s
      )
    );
  };

  const retryPayment = () => {
    if (paymentState.retryCount === 1) {
      setPaymentState((prev) => ({ ...prev, retryCount: 2 }));
      setOrders((prev) =>
        prev.map((o) =>
          o.id === paymentState.orderId ? { ...o, retry: "2 of 3" } : o
        )
      );
      setNotifications((prev) => [
        {
          id: String(Date.now()),
          title: "Payment Failed",
          message: "Retry 2 of 3.",
        },
        ...prev,
      ]);
    } else {
      setPaymentState((prev) => ({
        ...prev,
        status: "Payment Successful",
        retryCount: 2,
      }));
      setOrders((prev) =>
        prev.map((o) =>
          o.id === paymentState.orderId
            ? { ...o, status: "Completed", retry: undefined }
            : o
        )
      );
      setNotifications((prev) => [
        {
          id: String(Date.now()),
          title: "Payment Successful",
          message: "Backup payment completed successfully.",
        },
        ...prev,
      ]);
    }
  };

  const updatePaymentMethods = (primary: string, backup: string) => {
    setPaymentState((prev) => ({
      ...prev,
      primaryMethod: primary,
      backupMethod: backup,
    }));
  };

  return (
    <RefillContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        schedules,
        orders,
        paymentState,
        notifications,
        addSchedule,
        togglePause,
        skipSchedule,
        retryPayment,
        updatePaymentMethods,
      }}
    >
      {children}
    </RefillContext.Provider>
  );
}

export function useRefill() {
  const ctx = useContext(RefillContext);
  if (!ctx) throw new Error("useRefill must be used within RefillProvider");
  return ctx;
}
