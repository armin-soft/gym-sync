
import { motion } from "framer-motion";
import { Building, MapPin, Phone, Globe, Clock, Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface NewGymInfoTabProps {
  profileData: any;
}

export const NewGymInfoTab = ({ profileData }: NewGymInfoTabProps) => {
  const gymInfo = profileData.profileData.gymInfo;

  const formFields = [
    {
      id: "gymName",
      label: "نام باشگاه",
      icon: Building,
      value: gymInfo.gymName,
      type: "input"
    },
    {
      id: "gymAddress", 
      label: "آدرس باشگاه",
      icon: MapPin,
      value: gymInfo.gymAddress,
      type: "input"
    },
    {
      id: "gymPhone",
      label: "تلفن باشگاه",
      icon: Phone,
      value: gymInfo.gymPhone,
      type: "input"
    },
    {
      id: "gymWebsite",
      label: "وب‌سایت باشگاه",
      icon: Globe,
      value: gymInfo.gymWebsite,
      type: "input"
    },
    {
      id: "workingHours",
      label: "ساعات کاری",
      icon: Clock,
      value: gymInfo.workingHours,
      type: "input"
    },
    {
      id: "gymDescription",
      label: "توضیحات باشگاه",
      icon: Building,
      value: gymInfo.gymDescription,
      type: "textarea"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Building className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          اطلاعات باشگاه
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          مشخصات و اطلاعات باشگاه خود را وارد کنید
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.id}
            className={field.type === "textarea" ? "md:col-span-2" : ""}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Label htmlFor={field.id} className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
              <field.icon className="w-4 h-4 text-sky-600" />
              {field.label}
            </Label>
            
            {field.type === "textarea" ? (
              <Textarea
                id={field.id}
                value={field.value}
                className="min-h-[120px] bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500"
                placeholder={`${field.label} خود را وارد کنید`}
                dir="rtl"
              />
            ) : (
              <Input
                id={field.id}
                value={field.value}
                className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500"
                placeholder={`${field.label} خود را وارد کنید`}
                dir="rtl"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* امکانات باشگاه */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-4">
          <Dumbbell className="w-4 h-4 text-sky-600" />
          امکانات و تجهیزات
        </Label>
        
        <div className="flex flex-wrap gap-2">
          {gymInfo.facilities?.map((facility: string, index: number) => (
            <Badge
              key={index}
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white border-none px-3 py-1"
            >
              {facility}
            </Badge>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
