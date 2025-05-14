import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Users,
  Settings,
  Book,
  Dumbbell,
  Plus,
  LogOut,
  Menu,
  Mic
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { signOut, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/sign-in");
      toast({
        title: "خروج موفقیت آمیز",
        description: "شما با موفقیت از حساب کاربری خود خارج شدید.",
      });
    } catch (error) {
      console.error("Failed to sign out:", error);
      toast({
        title: "خطا در خروج",
        description: "متاسفانه در هنگام خروج مشکلی پیش آمده است.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      title: "داشبورد",
      path: "/",
    },
    {
      icon: <Users size={20} />,
      title: "هنرجویان",
      path: "/students",
    },
    {
      icon: <Dumbbell size={20} />,
      title: "تمرینات",
      path: "/exercises",
    },
    {
      icon: <Book size={20} />,
      title: "مکمل ها",
      path: "/supplements",
    },
    {
      icon: <Mic size={20} />,
      title: "گفتار به نوشتار",
      path: "/speech-to-text",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="منو"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[300px] border-l-width-thin border-l-border"
      >
        <SheetHeader className="text-right">
          <SheetTitle>منو</SheetTitle>
          <SheetDescription>
            دسترسی آسان به بخش‌های مختلف برنامه.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Button
                  variant="ghost"
                  className={cn(
                    "justify-start px-4 py-2 w-full font-medium text-sm",
                    pathname === item.path
                      ? "bg-secondary hover:bg-secondary/80"
                      : "hover:bg-secondary/50"
                  )}
                  onClick={() => router.push(item.path)}
                >
                  {item.icon}
                  <span className="mr-2">{item.title}</span>
                </Button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center gap-2">
            {user ? (
              <Avatar>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="h-9 w-9 rounded-full" />
            )}
            <div className="flex flex-col text-right">
              <span className="font-bold text-sm">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
          <Button
            variant="destructive"
            className="justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            خروج
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
