
import React from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CountdownTimerProps {
  countdown: number;
}

export const CountdownTimer = ({ countdown }: CountdownTimerProps) => {
  if (countdown <= 0) return null;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  
  return (
    <p className="text-white/60 text-sm">
      ارسال مجدد کد تا {toPersianNumbers(`${minutes}:${seconds.toString().padStart(2, '0')}`)} دیگر
    </p>
  );
};
