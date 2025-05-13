
import React from "react";
import { ReportsHeader } from "../reports-header";
import { ReportsLoading } from "../loading";

interface ReportsLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function ReportsLayout({ children, isLoading = false }: ReportsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {isLoading ? (
        <ReportsLoading />
      ) : (
        <>
          <ReportsHeader />
          <main className="mt-6">{children}</main>
        </>
      )}
    </div>
  );
}
