import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Select: {
      baseStyle: {
        field: {
          color: "pink.100",
        },
      },
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  fontSizes: {
    base: "62.5%", // 16px = 1.6rem
  },
  colors: {
    white: "#ffffff",
    black: "#000000",
    error: "#dc3a3a",
    surface: "#f6f8ff",

    pink: {
      100: "#F76388",
      200: "#d44f70",
      300: "#ad2c4d",
      400: "#912c45",
    },

    beige: {
      100: "#fff0d6",
      200: "#ffe2ad",
      300: "#ffc583",
      400: "#ffae65",
      500: "#ff8832",
    },

    blue: {
      100: "#e2f5ff",
      200: "#b1e4ff",
      300: "#7cd2ff",
      400: "#34b9ff",
      500: "#00a2fe",
    },

    green: {
      100: "#e4fbdc",
      200: "#d0f5c3",
      300: "#9be282",
      400: "#60cf37",
      500: "#2ba600",
    },

    gray: {
      100: "#f6f6f6",
      200: "#eeeeee",
      300: "#cccccc",
      400: "#999999",
      500: "#555555",
      600: "#4a4a4a",
      700: "#3a3a3a",
      800: "#2b2b2b",
      900: "#181818",
    },
  },
  styles: {
    global: {
      html: {
        fontSize: "62.5%",
      },
      body: {
        bg: "#0f0f0f",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
      },
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        listStyle: "none",
        textDecoration: "none",
      },
      a: {
        color: "#222",
        textDecoration: "none",
      },
      "::-webkit-scrollbar": {
        width: "9px",
        height: "9px",
      },
      "::-webkit-scrollbar-track": {
        bg: "pink.100",
      },
      "::-webkit-scrollbar-thumb": {
        bg: "pink.300",
        borderRadius: "12px",
        _hover: {
          bg: "pink.400",
        },
      },
      "h1, h2, h3, h4, h5, h6": {
        fontSize: "14px",
        fontWeight: "normal",
      },
      "img, fieldset": {
        border: "0 none",
      },
      button: {
        border: 0,
        bg: "none",
      },
      "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  },
});

export default theme;
