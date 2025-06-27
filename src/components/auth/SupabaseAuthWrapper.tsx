
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
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in successfully');
          toast({
            title: "ورود موفق",
            description: "به سیستم وارد شدید و می‌توانید داده‌ها را منتقل کنید",
            className: "bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none"
          });
          onAuthSuccess?.();
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          toast({
            title: "خروج موفق",
            description: "از سیستم خارج شدید",
          });
        }
      }
    );

    // Check for existing session
    const getSession = async () => {
      try {
        console.log('Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('Initial session check:', session?.user?.email || 'No session');
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error in getSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [toast, onAuthSuccess]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بررسی احراز هویت...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, showing login form');
    return <SupabaseLoginForm />;
  }

  console.log('User authenticated:', user.email);
  return <>{children}</>;
};
