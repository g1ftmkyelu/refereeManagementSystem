const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6B7280",
        secondary: "#38B2AC",
        tertiary: "#FF5733",
        quaternary: "#667EEA",
        quinary: "#EC4899",
        navbar_bg: "#222222",  
        nav_link_color:"#33acf9",              
        navbar_link_active_bg: "#FF5733",    
        navbar_link_active_color: "#FFFFFF", 
        navbar_link_hover_color: "#04283e",  
        navbar_link_focus_bg: "#FF5733",     
        navbar_link_focus_color: "#FFFFFF"   
        
          
        
        
        
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Courier New", "monospace"],
      },
      extend: {
        button: {
          base: "px-4 py-2 font-semibold text-white rounded-md",
          primary:
            "bg-primary-500 hover:bg-primary-600 focus:bg-primary-700 active:bg-primary-800",
          secondary:
            "bg-secondary-500 hover:bg-secondary-600 focus:bg-secondary-700 active:bg-secondary-800",
          tertiary:
            "bg-tertiary-500 hover:bg-tertiary-600 focus:bg-tertiary-700 active:bg-tertiary-800",
          quaternary:
            "bg-quaternary-500 hover:bg-quaternary-600 focus:bg-quaternary-700 active:bg-quaternary-800",
          quinary:
            "bg-quinary-500 hover:bg-quinary-600 focus:bg-quinary-700 active:bg-quinary-800",
        },
      },
      extend: {
        input: {
          base: "block w-full px-4 py-2 font-normal text-gray-800 placeholder-gray-500 border rounded-md shadow-sm focus:ring focus:ring-primary-300",

          primary: {
            base: "block w-full px-4 py-2 font-normal text-white placeholder-gray-300 bg-primary-500 border rounded-md shadow-sm focus:ring focus:ring-primary-300",
            hover: "hover:bg-primary-600",
            focus: "focus:ring-primary-500",
          },

          secondary: {
            base: "block w-full px-4 py-2 font-normal text-white placeholder-gray-300 bg-secondary-500 border rounded-md shadow-sm focus:ring focus:ring-secondary-300",
            hover: "hover:bg-secondary-600",
            focus: "focus:ring-secondary-500",
          },

          tertiary: {
            base: "block w-full px-4 py-2 font-normal text-white placeholder-gray-300 bg-tertiary-500 border rounded-md shadow-sm focus:ring focus:ring-tertiary-300",
            hover: "hover:bg-tertiary-600",
            focus: "focus:ring-tertiary-500",
          },

          quaternary: {
            base: "block w-full px-4 py-2 font-normal text-white placeholder-gray-300 bg-quaternary-500 border rounded-md shadow-sm focus:ring focus:ring-quaternary-300",
            hover: "hover:bg-quaternary-600",
            focus: "focus:ring-quaternary-500",
          },

          quinary: {
            base: "block w-full px-4 py-2 font-normal text-white placeholder-gray-300 bg-quinary-500 border rounded-md shadow-sm focus:ring focus:ring-quinary-300",
            hover: "hover:bg-quinary-600",
            focus: "focus:ring-quinary-500",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

module.exports = config;
