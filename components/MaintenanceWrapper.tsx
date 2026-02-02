"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function MaintenanceWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMaintenance = pathname !== "/maintenance";
  return (
    <>
      {/* Meta tag para noindex */}
      <meta name="robots" content="noindex, nofollow" />
      {isMaintenance ? (
        <iframe src="/maintenance" style={{ border: "none", width: "100vw", height: "100vh" }} />
      ) : (
        children
      )}
    </>
  );
}
