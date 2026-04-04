/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#f3e8ff",
          100: "#edf2fc",
          200: "#e1e7ff",
          300: "#7875cd",
          400: "#6a65bd",
          500: "#635adc",
          600: "#5147e4",
          700: "#5b23ff",
          800: "#4c1d99",
          900: "#3d0f7f",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        gray: {
          100: "#a4a9b0",
          200: "#717580",
          300: "#838691",
        },
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        sm: "4px",
        md: "12px",
        lg: "24px",
      },
    },
  },
  plugins: [],
};
