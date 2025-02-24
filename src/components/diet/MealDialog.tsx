
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
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mealFormSchema = z.object({
  name: z.string().min(2, "نام غذا باید حداقل ۲ کاراکتر باشد"),
  type: z.string().min(1, "نوع وعده غذایی الزامی است"),
  day: z.string().min(1, "روز هفته الزامی است"),
  calories: z.number().nonnegative("میزان کالری نمی‌تواند منفی باشد"),
  protein: z.number().nonnegative("میزان پروتئین نمی‌تواند منفی باشد"),
  carbs: z.number().nonnegative("میزان کربوهیدرات نمی‌تواند منفی باشد"),
  fat: z.number().nonnegative("میزان چربی نمی‌تواند منفی باشد"),
  description: z.string(),
}).required();

type MealFormData = z.infer<typeof mealFormSchema>;

interface MealDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Meal, "id">) => void;
  meal?: Meal;
  mealTypes: MealType[];
  weekDays: WeekDay[];
}

export const MealDialog = ({
  open,
  onClose,
  onSave,
  meal,
  mealTypes,
  weekDays,
}: MealDialogProps) => {
  const form = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      name: meal?.name ?? "",
      type: meal?.type ?? "",
      day: meal?.day ?? "",
      calories: meal?.calories ?? 0,
      protein: meal?.protein ?? 0,
      carbs: meal?.carbs ?? 0,
      fat: meal?.fat ?? 0,
      description: meal?.description ?? "",
    },
  });

  const onSubmit = (data: MealFormData) => {
    onSave(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {meal ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
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

            <div className="grid grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>روز هفته</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="روز هفته را انتخاب کنید" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {weekDays.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کالری</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="مثال: ۳۰۰" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                      <Input 
                        type="number" 
                        placeholder="مثال: ۲۵"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                      <Input 
                        type="number" 
                        placeholder="مثال: ۵۰"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                      <Input 
                        type="number" 
                        placeholder="مثال: ۱۵"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
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
                    <Input placeholder="توضیحات وعده غذایی را وارد کنید" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                انصراف
              </Button>
              <Button type="submit">
                {meal ? "ویرایش" : "افزودن"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
