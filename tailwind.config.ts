import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin-slow 10s linear infinite',
        'slide-up': 'slide-up 10s infinite',
      },
      keyframes: {
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '25%': { transform: 'translateY(0)' },
          '75%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        'xl': '24px',
        '2xl': '40px',
      },
      dropShadow: {
        'glow': '0 0 10px rgba(6,182,212,0.3)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-custom": {
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(104, 34, 34, 0.1)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundImage: "linear-gradient(to bottom, #06b6d4, #3b82f6)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundImage: "linear-gradient(to bottom, #0891b2, #2563eb)",
          },
          // Firefox
          "scrollbar-width": "thin",
          "scrollbar-color": "#06b6d4 rgba(255, 255, 255, 0.1)",
        },
      });
    },
  ],
} satisfies Config;