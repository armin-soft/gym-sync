
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlaskConical, Pill, Tag } from "lucide-react";

const categorySchema = z.object({
  name: z.string().min(2, {
    message: "نام دسته‌بندی باید حداقل ۲ حرف داشته باشد",
  }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  defaultValue?: string;
  mode: "add" | "edit";
  type: "supplement" | "vitamin";
}

export const CategoryDialog: React.FC<CategoryDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValue,
  mode,
  type,
}) => {
  const deviceInfo = useDeviceInfo();
  
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValue || "",
    },
  });
  
  function handleSubmit(data: CategoryFormValues) {
    onSubmit(data.name);
    form.reset();
  }
  
  // Reset form when dialog opens/closes or default values change
  React.useEffect(() => {
    if (open && defaultValue) {
      form.reset({
        name: defaultValue,
      });
    } else if (!open) {
      form.reset();
    }
  }, [open, defaultValue, form]);
  
  // Get color scheme based on type
  const getColorScheme = () => {
    if (type === 'supplement') {
      return {
        iconBg: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
        headerBg: 'bg-purple-50 dark:bg-purple-900/20',
        buttonBg: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-600/20',
      };
    } else {
      return {
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        headerBg: 'bg-blue-50 dark:bg-blue-900/20',
        buttonBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600/20',
      };
    }
  };
  
  const colorScheme = getColorScheme();
  
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[400px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className={`px-6 py-4 -mx-6 -mt-6 mb-6 rounded-t-lg ${colorScheme.headerBg}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${colorScheme.iconBg}`}>
                    <Tag className={`h-5 w-5 ${colorScheme.iconColor}`} />
                  </div>
                  <div>
                    <DialogTitle>
                      {mode === "add" 
                        ? "افزودن دسته‌بندی جدید" 
                        : "ویرایش دسته‌بندی"
                      }
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      دسته‌بندی‌های {type === "supplement" ? "مکمل" : "ویتامین"} را مدیریت کنید
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام دسته‌بندی</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="نام دسته‌بندی را وارد کنید" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => onOpenChange(false)}
                    >
                      انصراف
                    </Button>
                    <Button type="submit" className={`${colorScheme.buttonBg}`}>
                      {mode === "add" ? "افزودن" : "ذخیره تغییرات"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
