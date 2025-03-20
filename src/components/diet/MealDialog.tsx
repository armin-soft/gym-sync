
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
import { useEffect } from "react";
import { UtensilsCrossed, Type, Clock, CalendarDays, Save, X } from "lucide-react";

type MealFormData = z.infer<typeof mealFormSchema>;

const mealFormSchema = z.object({
  name: z.string().min(2, "نام غذا باید حداقل ۲ کاراکتر باشد"),
  type: z.string().min(1, "نوع وعده غذایی الزامی است"),
  day: z.string().min(1, "روز هفته الزامی است"),
  description: z.string(),
}).required();

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
      name: meal?.name || "",
      type: meal?.type || "",
      day: meal?.day || "",
      description: meal?.description || "",
    },
  });

  useEffect(() => {
    if (meal && open) {
      form.reset({
        name: meal.name,
        type: meal.type,
        day: meal.day,
        description: meal.description,
      });
    } else if (!meal && open) {
      form.reset({
        name: "",
        type: "",
        day: "",
        description: "",
      });
    }
  }, [meal, open, form]);

  const onSubmit = (data: MealFormData) => {
    onSave({
      name: data.name,
      type: data.type as MealType,
      day: data.day as WeekDay,
      description: data.description
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0" dir="rtl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-b from-muted/50 to-transparent">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <UtensilsCrossed className="w-5 h-5 text-primary" />
            {meal ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="p-6 pt-2 space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel className="flex items-center gap-2">
                      <Type className="w-4 h-4 text-muted-foreground" />
                      نام غذا
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="نام غذا را وارد کنید" 
                        className="bg-muted/50 focus:bg-background transition-colors duration-300 text-right"
                        {...field} 
                        dir="rtl"
                      />
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
                    <FormItem className="text-right">
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        نوع وعده
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-muted/50 focus:bg-background transition-colors duration-300 text-right">
                            <SelectValue placeholder="نوع وعده را انتخاب کنید" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent dir="rtl">
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
                    <FormItem className="text-right">
                      <FormLabel className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-muted-foreground" />
                        روز هفته
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-muted/50 focus:bg-background transition-colors duration-300 text-right">
                            <SelectValue placeholder="روز هفته را انتخاب کنید" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent dir="rtl">
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
            </div>

            <div className="p-4 bg-gradient-to-t from-muted/50 via-muted/30 to-transparent flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="gap-2 hover:bg-red-500/10 hover:text-red-500"
              >
                <X className="w-4 h-4" />
                انصراف
              </Button>
              <Button 
                type="submit"
                className="gap-2 bg-gradient-to-l from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                <Save className="w-4 h-4" />
                {meal ? "ویرایش" : "افزودن"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
