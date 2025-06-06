
import React from "react";

export const ModernSidebarBackground = () => {
  return (
    <>
      {/* پس‌زمینه گرادیان */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5 pointer-events-none" />
      
      {/* عناصر تزیینی */}
      <div className="absolute top-20 left-4 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-4 w-24 h-24 bg-gradient-to-br from-sky-400/10 to-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
    </>
  );
};
