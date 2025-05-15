
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface OfflineSpeechDownloadIndicatorProps {
  isModelLoaded: boolean;
  isModelLoading: boolean;
  downloadProgress: number;
  onStartDownload: () => void;
  className?: string;
}

export function OfflineSpeechDownloadIndicator({
  isModelLoaded,
  isModelLoading,
  downloadProgress,
  onStartDownload,
  className
}: OfflineSpeechDownloadIndicatorProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {/* وضعیت دانلود */}
      {!isModelLoaded && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {isModelLoading ? "در حال دانلود مدل..." : "مدل دانلود نشده"}
          </span>
          <span>{isModelLoading ? `${downloadProgress}%` : ""}</span>
        </div>
      )}
      
      {/* نوار پیشرفت دانلود */}
      {isModelLoading && (
        <Progress 
          value={downloadProgress} 
          className="h-2" 
        />
      )}
      
      {/* دکمه دانلود یا نمایش وضعیت */}
      {!isModelLoaded ? (
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "w-full flex items-center justify-center gap-2",
            isModelLoading && "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
          )}
          disabled={isModelLoading}
          onClick={onStartDownload}
        >
          {isModelLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
              دانلود مدل ({downloadProgress}%)
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-1" />
              دانلود مدل تشخیص گفتار آفلاین
            </>
          )}
        </Button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs flex items-center justify-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 rounded-md py-1.5"
        >
          <Check className="h-3.5 w-3.5 mr-1" />
          مدل آفلاین آماده استفاده است
        </motion.div>
      )}
    </div>
  );
}
