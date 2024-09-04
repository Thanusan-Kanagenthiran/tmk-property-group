"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
let theme = createTheme({
  typography: {},
  palette: {
    mode: "dark",
    primary: {
      main: "#4f46e5"
    },
    secondary: {
      main: "#14b8a6"
    },
    background: {
      default: "#0f172a",
      paper: "#020617"
    },
  },
  components: {
   
  },
  shape: {
    borderRadius: 6
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 750,
      lg: 1200,
      xl: 1536
    }
  }
});

export default theme = responsiveFontSizes(theme);
