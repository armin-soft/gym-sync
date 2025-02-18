
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const mealFormSchema = z.object({
  name: z.string().min(2, "نام غذا باید حداقل ۲ کاراکتر باشد"),
  type: z.string().min(1, "انتخاب نوع وعده غذایی الزامی است"),
  calories: z.string().min(1, "میزان کالری نمی‌تواند خالی باشد"),
  protein: z.string().min(1, "میزان پروتئین نمی‌تواند خالی باشد"),
  carbs: z.string().min(1, "میزان کربوهیدرات نمی‌تواند خالی باشد"),
  fat: z.string().min(1, "میزان چربی نمی‌تواند خالی باشد"),
});

export const mealTypes = ["صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام"];

interface MealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof mealFormSchema>) => void;
  defaultValues?: z.infer<typeof mealFormSchema>;
  mode: "add" | "edit";
}

export const MealDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode,
}: MealDialogProps) => {
  const form = useForm<z.infer<typeof mealFormSchema>>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: defaultValues || {
      name: "",
      type: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام غذا</FormLabel>
                  <FormControl>
                    <Input placeholder="نام غذا را وارد کنید" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع وعده</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="نوع وعده را انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mealTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کالری</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: ۳۰۰" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>پروتئین (گرم)</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: ۲۵" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="carbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کربوهیدرات (گرم)</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: ۵۰" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>چربی (گرم)</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: ۱۵" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                انصراف
              </Button>
              <Button type="submit">
                {mode === "edit" ? "ویرایش" : "افزودن"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
