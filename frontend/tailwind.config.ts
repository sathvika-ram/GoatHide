import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: {
            50: "#FCF9F2",
            100: "#F7F0DF",
            200: "#ECDCBE",
            300: "#DCBF93",
            400: "#C99F6B",
            500: "#B8860B", // Dark Goldenrod
            600: "#9E7045",
            700: "#805634",
            800: "#634027",
            900: "#4D301E",
            accent: "#D4AF37", // Metallic Gold
          },
          ivory: {
            50: "#FCFAF6",
            100: "#FAF6ED",
            200: "#F3EDE0",
            300: "#EBE3CE",
            400: "#DFCFA5",
          },
          charcoal: {
            50: "#F6F6F6",
            100: "#E7E7E7",
            200: "#D1D1D1",
            300: "#B0B0B0",
            400: "#888888",
            500: "#6D6D6D",
            600: "#5D5D5D",
            700: "#4F4F4F",
            800: "#1A1A1A", // Dark Charcoal
            900: "#121212", // Pure Onyx
          }
        },
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
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Helvetica", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(184, 134, 11, 0.1)',
        'luxury-hover': '0 10px 30px -5px rgba(184, 134, 11, 0.25)',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
