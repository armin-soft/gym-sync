
import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { SupabaseLoginForm } from './SupabaseLoginForm';
import { useToast } from '@/hooks/use-toast';

interface SupabaseAuthWrapperProps {
  children: ReactNode;
  onAuthSuccess?: () => void;
}

export const SupabaseAuthWrapper = ({ children, onAuthSuccess }: SupabaseAuthWrapperProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          toast({
            title: "ورود موفق",
            description: "به سیستم وارد شدید و می‌توانید داده‌ها را منتقل کنید",
            className: "bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none"
          });
          onAuthSuccess?.();
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast, onAuthSuccess]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <SupabaseLoginForm />;
  }

  return <>{children}</>;
};
