
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { 
  FolderPlus, 
  Save,
  X,
  Tag,
  Sparkles
} from "lucide-react";

const categoryFormSchema = z.object({
  name: z.string().min(2, "نام دسته‌بندی باید حداقل ۲ کاراکتر باشد"),
});

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  defaultValue?: string;
  mode: "add" | "edit";
}

export const CategoryDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValue,
  mode,
}: CategoryDialogProps) => {
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: defaultValue || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: defaultValue || "",
      });
      // Focus the input after a short delay
      setTimeout(() => {
        const input = document.querySelector('input[name="name"]') as HTMLInputElement;
        if (input) input.focus();
      }, 100);
    }
  }, [defaultValue, form, open]);

  const handleSubmit = (data: z.infer<typeof categoryFormSchema>) => {
    onSubmit(data.name);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 opacity-50" />
            <motion.div
              animate={{
                x: [-100, 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
            />
            
            <DialogTitle className="relative flex items-center gap-3 text-xl font-bold" dir="rtl">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg"
              >
                {mode === "edit" ? (
                  <Tag className="h-5 w-5 text-white" />
                ) : (
                  <FolderPlus className="h-5 w-5 text-white" />
                )}
              </motion.div>
              <span>
                {mode === "edit" ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
              </span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-purple-500 opacity-60" />
              </motion.div>
            </DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-semibold" dir="rtl">
                        <Tag className="h-4 w-4 text-purple-500" />
                        نام دسته‌بندی
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Input 
                            placeholder="مثال: پروتئین، کراتین، ویتامین‌های گروه B"
                            className="text-right border-2 border-purple-200 focus-visible:ring-purple-500 focus-visible:border-purple-500 rounded-xl py-3 text-base font-medium"
                            dir="rtl"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-right" dir="rtl" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-4" dir="rtl">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                      className="gap-2 hover:border-purple-200 hover:bg-purple-50 rounded-xl font-semibold"
                    >
                      <X className="h-4 w-4" />
                      انصراف
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit"
                      className="gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-xl font-bold shadow-lg"
                    >
                      <Save className="h-4 w-4" />
                      {mode === "edit" ? "ویرایش" : "افزودن"}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
