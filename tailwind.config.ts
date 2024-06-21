import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: { 
        dark:{
          1: '#152238',
          2: '#161925',
        },
         blue:{
            1: '#000000'
         },
        sky:{
          1: '#C9DDFF',
          2: '#ECF0FF',
          3: '#F5FCFF',
        },
        yellow:{
          1: '#F9A90E',
        },
      },
      backgroundImage: {
        hero: "url('https://t3.ftcdn.net/jpg/05/14/95/12/360_F_514951224_2dxMLbIw5qNRdPGD003chpbVcxWtcp7K.jpg')",
        'orange-bg': "url('https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80')",
        'blue-bg': "url('https://i0.wp.com/picjumbo.com/wp-content/uploads/magical-spring-forest-scenery-during-morning-breeze-free-photo.jpg?w=600&quality=80')",
        'purple-bg': "url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg')",
         'yellow-bg': "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuwgzpR24JOKgc_NHwUhdF834xP2tsGekEZre8cBAJdrcHhHL_oJC0RK-8gRpiv1Osn-g&usqp=CAU')"
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
