
export const ModernSidebarBackground = () => {
  return (
    <>
      {/* گرادیان پس‌زمینه */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* اشکال تزیینی */}
      <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 rounded-full blur-xl pointer-events-none" />
    </>
  );
};
