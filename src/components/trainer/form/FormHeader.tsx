
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Edit3, Sparkles, CheckCircle2 } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";

interface SectionConfig {
  title: string;
  description: string;
  gradient: string;
}

interface FormHeaderProps {
  sectionConfig: SectionConfig;
  completionPercentage: number;
  progressColor: string;
}

export const FormHeader = ({ sectionConfig, completionPercentage, progressColor }: FormHeaderProps) => {
  return (
    <div className={cn("relative z-10 bg-gradient-to-r", sectionConfig.gradient, "p-6 text-white border-b border-white/20")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            <Edit3 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {sectionConfig.title}
              <Sparkles className="h-5 w-5 text-yellow-300" />
            </h2>
            <p className="text-white/80 mt-1">{sectionConfig.description}</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
          <CheckCircle2 className="h-4 w-4 text-green-300" />
          <span className="text-sm font-medium">فعال</span>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        completionPercentage={completionPercentage}
        progressColor={progressColor}
      />
    </div>
  );
};
