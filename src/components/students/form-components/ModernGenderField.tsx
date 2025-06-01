
import React from "react";
import { motion } from "framer-motion";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Users, User, UserCheck } from "lucide-react";

interface ModernGenderFieldProps {
  control: any;
  itemVariants: any;
}

export const ModernGenderField = ({ control, itemVariants }: ModernGenderFieldProps) => {
  return (
    <motion.div variants={itemVariants}>
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-3 text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              جنسیت
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-4"
                dir="rtl"
              >
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Label 
                    htmlFor="male" 
                    className={`
                      flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${field.value === 'male' 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/25'
                      }
                    `}
                  >
                    <RadioGroupItem value="male" id="male" className="sr-only" />
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                      ${field.value === 'male' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }
                    `}>
                      <User className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">آقا</div>
                      <div className="text-xs text-muted-foreground">مرد</div>
                    </div>
                    {field.value === 'male' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 left-2"
                      >
                        <UserCheck className="h-5 w-5 text-blue-500" />
                      </motion.div>
                    )}
                  </Label>
                </motion.div>

                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Label 
                    htmlFor="female" 
                    className={`
                      flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${field.value === 'female' 
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50/50 dark:hover:bg-pink-950/25'
                      }
                    `}
                  >
                    <RadioGroupItem value="female" id="female" className="sr-only" />
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                      ${field.value === 'female' 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }
                    `}>
                      <User className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">خانم</div>
                      <div className="text-xs text-muted-foreground">زن</div>
                    </div>
                    {field.value === 'female' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 left-2"
                      >
                        <UserCheck className="h-5 w-5 text-pink-500" />
                      </motion.div>
                    )}
                  </Label>
                </motion.div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-right" />
          </FormItem>
        )}
      />
    </motion.div>
  );
};
