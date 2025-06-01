
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ResendCodeButtonsProps {
  countdown: number;
  onChangePhone: () => void;
  onResendCode: () => void;
}

export const ResendCodeButtons = ({
  countdown,
  onChangePhone,
  onResendCode
}: ResendCodeButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        type="button" 
        variant="ghost"
        onClick={onChangePhone}
        className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
      >
        تغییر شماره
      </Button>
      
      {countdown === 0 ? (
        <Button 
          type="button" 
          variant="ghost"
          onClick={onResendCode}
          className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4 ml-1" />
          ارسال مجدد
        </Button>
      ) : (
        <Button 
          type="button" 
          variant="ghost"
          disabled
          className="flex-1 text-white/40 cursor-not-allowed"
        >
          <RefreshCw className="h-4 w-4 ml-1" />
          ارسال مجدد
        </Button>
      )}
    </div>
  );
};
