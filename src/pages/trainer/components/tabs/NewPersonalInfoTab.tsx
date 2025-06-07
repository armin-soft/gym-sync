
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, CreditCard, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NewPersonalInfoTabProps {
  profileData: any;
}

export const NewPersonalInfoTab = ({ profileData }: NewPersonalInfoTabProps) => {
  const personalInfo = profileData.profileData.personalInfo;

  const formFields = [
    {
      id: "fullName",
      label: "نام و نام خانوادگی",
      icon: User,
      value: personalInfo.fullName,
      type: "input"
    },
    {
      id: "displayName", 
      label: "نام نمایشی (مربی)",
      icon: User,
      value: personalInfo.displayName,
      type: "input"
    },
    {
      id: "email",
      label: "ایمیل",
      icon: Mail,
      value: personalInfo.email,
      type: "input"
    },
    {
      id: "phone",
      label: "شماره موبایل",
      icon: Phone,
      value: personalInfo.phone,
      type: "input"
    },
    {
      id: "birthDate",
      label: "تاریخ تولد",
      icon: Calendar,
      value: personalInfo.birthDate,
      type: "input"
    },
    {
      id: "nationalId",
      label: "کد ملی",
      icon: CreditCard,
      value: personalInfo.nationalId,
      type: "input"
    },
    {
      id: "specialization",
      label: "تخصص",
      icon: GraduationCap,
      value: personalInfo.specialization,
      type: "input"
    },
    {
      id: "education",
      label: "تحصیلات",
      icon: GraduationCap,
      value: personalInfo.education,
      type: "input"
    },
    {
      id: "bio",
      label: "بیوگرافی",
      icon: User,
      value: personalInfo.bio,
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
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          اطلاعات شخصی
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          اطلاعات کامل و دقیق خود را وارد کنید
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
              <field.icon className="w-4 h-4 text-emerald-600" />
              {field.label}
            </Label>
            
            {field.type === "textarea" ? (
              <Textarea
                id={field.id}
                value={field.value}
                className="min-h-[120px] bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                placeholder={`${field.label} خود را وارد کنید`}
                dir="rtl"
              />
            ) : (
              <Input
                id={field.id}
                value={field.value}
                className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                placeholder={`${field.label} خود را وارد کنید`}
                dir="rtl"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
