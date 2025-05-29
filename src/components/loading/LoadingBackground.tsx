
export const LoadingBackground = () => {
  return (
    <>
      {/* پس‌زمینه گرادیان برند */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/90 to-brand-700/90">
        {/* افکت نقاط ساده */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px] opacity-40" />
      </div>
    </>
  );
};
