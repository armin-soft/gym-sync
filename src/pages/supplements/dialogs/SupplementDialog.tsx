
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FlaskConical, Pill } from "lucide-react";
import type { Supplement, SupplementCategory } from "@/types/supplement";

const supplementSchema = z.object({
  name: z.string().min(2, {
    message: "نام باید حداقل ۲ حرف داشته باشد",
  }),
  category: z.string({
    required_error: "لطفاً یک دسته‌بندی انتخاب کنید",
  }),
  dosage: z.string().optional(),
  timing: z.string().optional(),
  description: z.string().optional(),
});

type SupplementFormValues = z.infer<typeof supplementSchema>;

interface SupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SupplementFormValues) => void;
  defaultValues?: Supplement;
  mode: "add" | "edit";
  categories: SupplementCategory[];
  type: "supplement" | "vitamin";
}

export const SupplementDialog: React.FC<SupplementDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode,
  categories,
  type,
}) => {
  const deviceInfo = useDeviceInfo();
  
  const form = useForm<SupplementFormValues>({
    resolver: zodResolver(supplementSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      category: defaultValues?.category || "",
      dosage: defaultValues?.dosage || "",
      timing: defaultValues?.timing || "",
      description: defaultValues?.description || "",
    },
  });
  
  function handleSubmit(data: SupplementFormValues) {
    onSubmit(data);
    form.reset();
  }
  
  // Reset form when dialog opens/closes or default values change
  React.useEffect(() => {
    if (open && defaultValues) {
      form.reset({
        name: defaultValues.name || "",
        category: defaultValues.category || "",
        dosage: defaultValues.dosage || "",
        timing: defaultValues.timing || "",
        description: defaultValues.description || "",
      });
    } else if (!open) {
      form.reset();
    }
  }, [open, defaultValues, form]);
  
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
  const Icon = type === 'supplement' ? FlaskConical : Pill;
  
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[500px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className={`px-6 py-4 -mx-6 -mt-6 mb-6 rounded-t-lg ${colorScheme.headerBg}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${colorScheme.iconBg}`}>
                    <Icon className={`h-5 w-5 ${colorScheme.iconColor}`} />
                  </div>
                  <div>
                    <DialogTitle>
                      {mode === "add" 
                        ? `افزودن ${type === "supplement" ? "مکمل" : "ویتامین"} جدید` 
                        : `ویرایش ${type === "supplement" ? "مکمل" : "ویتامین"}`
                      }
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      اطلاعات {type === "supplement" ? "مکمل" : "ویتامین"} را وارد کنید
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
                        <FormLabel>نام</FormLabel>
                        <FormControl>
                          <Input placeholder="نام را وارد کنید" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>دسته‌بندی</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="dosage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مقدار مصرف</FormLabel>
                          <FormControl>
                            <Input placeholder="مانند: یک قرص روزانه" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>زمان مصرف</FormLabel>
                          <FormControl>
                            <Input placeholder="مانند: قبل از تمرین" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>توضیحات</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="توضیحات تکمیلی..." 
                            className="resize-none min-h-[80px]" 
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
