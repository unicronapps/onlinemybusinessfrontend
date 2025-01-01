module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Custom blue for buttons, headers
        secondary: "#9333EA", // Custom purple for highlights
        accent: "#F59E0B", // Custom yellow for CTAs
        background: "#F9FAFB", // Soft background color
        textPrimary: "#1F2937", // Default text color
        textSecondary: "#4B5563", // Muted text color
      },
      fontSize: {
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
