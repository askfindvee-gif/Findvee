/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))' },
          'to': { filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.8))' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
    borderRadius: {
      none: "0px",
      DEFAULT: "4px",
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      "2xl": "20px",
      full: "9999px"
    }
  },
  plugins: [],
};
