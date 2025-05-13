
export const ReportsUpdateStatus = () => {
  return (
    <div className="flex flex-row gap-1 sm:gap-2 items-center bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></div>
        <div className="rounded-full w-2 h-2 bg-green-500 relative"></div>
      </div>
      <span className="text-xs">بروزرسانی: همین الان</span>
    </div>
  );
};
