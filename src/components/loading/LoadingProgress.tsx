
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
          className="h-3 sm:h-4 bg-white/10 overflow-hidden" 
          indicatorClassName="bg-white"
          showAnimation={progress < 100}
        />
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/70">{loadingText}</span>
          <div className="bg-white/10 px-3 py-1 rounded-full text-white font-bold">
            {toPersianNumbers(progress)}٪
          </div>
        </div>
      </div>
    </div>
  );
};
