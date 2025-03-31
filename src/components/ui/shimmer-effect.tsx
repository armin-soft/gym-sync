
import { cn } from "@/lib/utils";

interface ShimmerEffectProps {
  className?: string;
}

export const ShimmerEffect = ({ className }: ShimmerEffectProps) => {
  return (
    <div className={cn(
      "absolute inset-0 -z-10 overflow-hidden",
      "before:absolute before:inset-0 before:-translate-x-full",
      "before:animate-[shimmer_2s_infinite]",
      "before:border-t before:border-slate-100 dark:before:border-slate-800/50",
      "before:bg-gradient-to-r before:from-transparent",
      "before:via-slate-200/60 dark:before:via-slate-700/30",
      "before:to-transparent",
      className
    )} />
  );
};

export const NeoGlow = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      "absolute inset-0 -z-10 overflow-hidden rounded-2xl opacity-70",
      "bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50",
      "dark:from-indigo-950/20 dark:to-purple-950/20",
      "blur-xl",
      className
    )} />
  );
};

export const NeoBorder = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      "absolute inset-0 -z-10 rounded-2xl",
      "bg-gradient-to-br from-white/10 via-transparent to-white/5",
      "dark:from-white/5 dark:to-transparent",
      "p-[1px]",
      className
    )}>
      <div className="absolute inset-0 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md" />
    </div>
  );
};
