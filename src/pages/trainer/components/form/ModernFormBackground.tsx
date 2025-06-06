
export const ModernFormBackground = () => {
  return (
    <>
      {/* گرادیان پس‌زمینه */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* اشکال تزیینی */}
      <div className="absolute top-20 left-4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-4 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
    </>
  );
};
