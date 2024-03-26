/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    height: {
      scroll: "calc(100vh - 100px)",
    },
    keyframes: {
      popOut: {
        "0%": { transform: "scale(0)" },
        "100%": { transform: "scale(1)" },
      },
      flip: {
        "0%": { transform: "rotateY(0deg)" },
        "100%": { transform: "rotateY(180deg)" },
      },
      slide: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0%)" },
      },
    },
    animation: {
      popOut: "popOut 0.3s ease-in-out",
      flip: "flip 0.5s ease-in-out",
      slide: "slide 0.3s ease-in-out",
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      pattern: "url('/img/chat.jpg')",
    },
  },
};
export const plugins = [];
