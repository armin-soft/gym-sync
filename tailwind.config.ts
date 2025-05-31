
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
        '2xl': '3.5rem',
        '3xl': '4rem',
        '4xl': '4.5rem',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
    },
    extend: {
      screens: {
        'xs': '375px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      fontSize: {
        '3xs': ['0.5rem', { lineHeight: '0.75rem' }],
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // رنگ‌های اصلی برند: مشکی، نارنجی و طلایی
        brand: {
          black: "var(--color-brand-black)",
          orange: "var(--color-brand-orange)",
          gold: "var(--color-brand-gold)",
        },
        // طیف کامل رنگ‌های مشکی
        black: {
          50: "var(--color-black-50)",
          100: "var(--color-black-100)",
          200: "var(--color-black-200)",
          300: "var(--color-black-300)",
          400: "var(--color-black-400)",
          500: "var(--color-black-500)",
          600: "var(--color-black-600)",
          700: "var(--color-black-700)",
          800: "var(--color-black-800)",
          900: "var(--color-black-900)",
          950: "var(--color-black-950)",
        },
        // طیف کامل رنگ‌های نارنجی
        orange: {
          50: "var(--color-orange-50)",
          100: "var(--color-orange-100)",
          200: "var(--color-orange-200)",
          300: "var(--color-orange-300)",
          400: "var(--color-orange-400)",
          500: "var(--color-orange-500)",
          600: "var(--color-orange-600)",
          700: "var(--color-orange-700)",
          800: "var(--color-orange-800)",
          900: "var(--color-orange-900)",
          950: "var(--color-orange-950)",
        },
        // طیف کامل رنگ‌های طلایی
        gold: {
          50: "var(--color-gold-50)",
          100: "var(--color-gold-100)",
          200: "var(--color-gold-200)",
          300: "var(--color-gold-300)",
          400: "var(--color-gold-400)",
          500: "var(--color-gold-500)",
          600: "var(--color-gold-600)",
          700: "var(--color-gold-700)",
          800: "var(--color-gold-800)",
          900: "var(--color-gold-900)",
          950: "var(--color-gold-950)",
        },
        // رنگ‌های وضعیت
        success: {
          50: "#eefbf3",
          100: "#d6f5e1",
          200: "#b1eac8",
          300: "#7cd8a4",
          400: "#47bf7a",
          500: "#36b366",
          600: "#198346",
          700: "#176839",
          800: "#155230",
          900: "#124428",
          950: "#09271a",
        },
        warning: {
          50: "var(--color-gold-50)",
          100: "var(--color-gold-100)",
          200: "var(--color-gold-200)",
          300: "var(--color-gold-300)",
          400: "var(--color-gold-400)",
          500: "var(--color-gold-500)",
          600: "var(--color-gold-600)",
          700: "var(--color-gold-700)",
          800: "var(--color-gold-800)",
          900: "var(--color-gold-900)",
          950: "var(--color-gold-950)",
        },
        info: {
          50: "#f0f7ff",
          100: "#e1eefe",
          200: "#cae0fd",
          300: "#a6cbfc",
          400: "#7aadfd",
          500: "#3b82f6",
          600: "#2662ea",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      fontFamily: {
        sans: ["Vazir", "sans-serif"],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        // انیمیشن‌های جدید با رنگ‌های برند
        brandGlow: {
          "0%, 100%": { 
            boxShadow: "0 0 20px var(--color-brand-orange)" 
          },
          "50%": { 
            boxShadow: "0 0 30px var(--color-brand-gold), 0 0 40px var(--color-brand-orange)" 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        slideIn: "slideIn 0.5s ease-out",
        brandGlow: "brandGlow 2s ease-in-out infinite",
      },
      // گرادیان‌های از پیش تعریف شده
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, var(--color-brand-orange), var(--color-brand-gold))',
        'brand-gradient-dark': 'linear-gradient(135deg, var(--color-brand-black), var(--color-brand-orange))',
        'brand-gradient-warm': 'linear-gradient(135deg, var(--color-gold-400), var(--color-orange-500))',
        'brand-gradient-radial': 'radial-gradient(circle, var(--color-brand-gold), var(--color-brand-orange), var(--color-brand-black))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
