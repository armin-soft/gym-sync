
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface LoadingProgressProps {
  progress: number;
  loadingText: string;
}

export const LoadingProgress = ({ progress, loadingText }: LoadingProgressProps) => {
  return (
    <div className="w-full">
      <div className="space-y-3">
        <Progress 
          value={progress} 
          className="h-3 sm:h-4 bg-black-900/20 overflow-hidden" 
          indicatorClassName="bg-gradient-to-r from-orange-500 to-gold-500"
          showAnimation={progress < 100}
        />
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/70">{loadingText}</span>
          <div className="bg-gradient-to-r from-orange-500/20 to-gold-500/20 px-3 py-1 rounded-full text-white font-bold border border-orange-500/30">
            {toPersianNumbers(progress)}٪
          </div>
        </div>
      </div>
    </div>
  );
};
