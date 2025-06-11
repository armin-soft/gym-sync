
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, User, MapPin } from "lucide-react";
import { Student } from "../StudentTypes";

interface PersonalInfoSectionProps {
  form: UseFormReturn<Student>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 mb-4 border-b border-emerald-100 dark:border-emerald-800">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
          <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">اطلاعات شخصی</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-emerald-700 dark:text-emerald-300 font-medium">
            نام و نام خانوادگی <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            {...register("name", { required: "نام الزامی است" })}
            placeholder="نام کامل شاگرد را وارد کنید"
            className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-emerald-700 dark:text-emerald-300 font-medium">
            شماره تماس
          </Label>
          <div className="relative">
            <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
            <Input
              id="phone"
              {...register("phone")}
              placeholder="09xxxxxxxxx"
              className="pr-10 border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-emerald-700 dark:text-emerald-300 font-medium">
            تاریخ تولد
          </Label>
          <div className="relative">
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
            <Input
              id="birthDate"
              type="date"
              {...register("birthDate")}
              className="pr-10 border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-emerald-700 dark:text-emerald-300 font-medium">
            آدرس
          </Label>
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
            <Input
              id="address"
              {...register("address")}
              placeholder="آدرس محل سکونت"
              className="pr-10 border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
