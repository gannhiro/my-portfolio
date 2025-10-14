export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: "480px", // overrides the default sm (640px)
        "3xl": "1140px", // adds a new 3xl breakpoint
      },
    },
  },
  plugins: [],
};
