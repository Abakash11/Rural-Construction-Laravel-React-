/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        moveCrane: 'moveCrane 15s linear infinite',
        moveTruck: 'moveTruck 20s linear infinite',
        moveTruckReverse: 'moveTruckReverse 25s linear infinite',
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        moveCrane: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        moveTruck: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        moveTruckReverse: {
          '0%': { transform: 'translateX(calc(100vw + 100px))' },
          '100%': { transform: 'translateX(-100px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    }
  },
  plugins: [],
  
  
}


