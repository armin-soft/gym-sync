
export const DecorativeElements = () => {
  return (
    <>
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-4 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
    </>
  );
};
