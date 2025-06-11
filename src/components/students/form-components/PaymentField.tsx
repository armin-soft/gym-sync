
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { Student } from "../StudentTypes";

interface PaymentFieldProps {
  form: UseFormReturn<Student>;
}

export const PaymentField: React.FC<PaymentFieldProps> = ({ form }) => {
  const { register } = form;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 mb-4 border-b border-emerald-100 dark:border-emerald-800">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
          <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">اطلاعات مالی</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="payment" className="text-emerald-700 dark:text-emerald-300 font-medium">
          مبلغ شهریه (تومان)
        </Label>
        <div className="relative">
          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
          <Input
            id="payment"
            type="text"
            {...register("payment")}
            placeholder="1000000"
            className="pr-10 border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
          />
        </div>
      </div>
    </div>
  );
};
