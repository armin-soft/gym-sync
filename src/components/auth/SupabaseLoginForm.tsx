
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, UserPlus, LogIn, Database, Eye, EyeOff } from 'lucide-react';

export const SupabaseLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) {
          console.error('SignUp error:', error);
          throw error;
        }

        console.log('SignUp successful:', data);

        if (data?.user && !data.session) {
          toast({
            title: "ثبت‌نام موفق",
            description: "ایمیل تأیید برای شما ارسال شد. لطفاً آن را بررسی کنید.",
            className: "bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none"
          });
        } else {
          toast({
            title: "ثبت‌نام موفق",
            description: "حساب کاربری شما ایجاد شد و می‌توانید شروع کنید.",
            className: "bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none"
          });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          console.error('SignIn error:', error);
          throw error;
        }

        console.log('SignIn successful:', data);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      let errorMessage = "مشکلی در احراز هویت رخ داد";
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = isSignUp 
          ? "ایمیل یا رمز عبور نامعتبر است. لطفاً مجدداً تلاش کنید."
          : "ایمیل یا رمز عبور اشتباه است. اگر حساب کاربری ندارید، ثبت‌نام کنید.";
      } else if (error.message?.includes('User already registered')) {
        errorMessage = "این ایمیل قبلاً ثبت شده است. از بخش ورود استفاده کنید.";
      } else if (error.message?.includes('Password should be at least')) {
        errorMessage = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
      } else if (error.message?.includes('Unable to validate email address')) {
        errorMessage = "فرمت ایمیل نامعتبر است.";
      } else if (error.message?.includes('Email rate limit exceeded')) {
        errorMessage = "تعداد درخواست‌ها زیاد است. لطفاً کمی صبر کنید.";
      }

      toast({
        title: "خطا",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">
            احراز هویت Supabase
          </h2>
          <p className="text-slate-600">
            برای انتقال داده‌ها وارد شوید یا ثبت‌نام کنید
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-right">ایمیل</Label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="pr-10"
                required
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-right">رمز عبور</Label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="حداقل ۶ کاراکتر"
                className="pr-10 pl-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white"
            size="lg"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>در حال پردازش...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                <span>{isSignUp ? 'ثبت‌نام' : 'ورود'}</span>
              </div>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {isSignUp ? 'قبلاً ثبت‌نام کرده‌اید؟ وارد شوید' : 'حساب کاربری ندارید؟ ثبت‌نام کنید'}
          </button>
        </div>

        <div className="mt-6 p-4 bg-sky-50 rounded-xl">
          <p className="text-sm text-sky-700 text-center">
            💡 بعد از ورود، می‌توانید تمام داده‌های محلی خود را به Supabase منتقل کنید
          </p>
        </div>

        {/* Debug info - remove in production */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p>برای تست: اگر مشکل دارید، ابتدا ثبت‌نام کنید سپس وارد شوید</p>
        </div>
      </Card>
    </div>
  );
};
