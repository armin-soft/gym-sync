
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  icon: Icon,
  actions,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex w-full sm:w-auto justify-end">{actions}</div>}
    </div>
  );
};
