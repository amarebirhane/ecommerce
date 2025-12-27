/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // indigo-600
          light: "#6366F1",
          dark: "#4338CA",
        },
        background: {
          DEFAULT: "#FFFFFF",
          light: "#F9FAF8",
          lighter: "#F3F4F6",
        },
        surface: {
          DEFAULT: "#F3F4F6",
          light: "#E5E7EB",
        },
        text: {
          primary: "#111827", // gray-900
          secondary: "#4B5563", // gray-600
          tertiary: "#9CA3AF", // gray-400
        },
        accent: {
          DEFAULT: "#4F46E5",
          red: "#EF4444",
          yellow: "#F59E0B",
          pink: "#EC4899",
        },
      },
    },
  },
  plugins: [],
};

