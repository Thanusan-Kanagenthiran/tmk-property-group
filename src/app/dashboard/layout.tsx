// components/DashboardLayout.tsx
import React from "react";
import ClientDashboardLayout from "./ClientDashboardLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
}
