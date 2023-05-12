import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

const colors = {
  grey: {
    100: "#d0d1d5",
    200: "#a1a4ab",
    300: "#727681",
    400: "#1F2A40",
    500: "#141b2d",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509",
  },
  black: {
    100: "#ffffff",
    200: "#fff6f0",
    300: "#fffff3",
    400: "#ffffff",
    500: "#ffffff",
    600: "#cccccc",
    700: "#999999",
    800: "#666666",
    900: "#333333",
  },

  greenAccent: {
    100: "#dbf5ee",
    200: "#b7ebde",
    300: "#94e2cd",
    400: "#70d8bd",
    500: "#4cceac",
    600: "#3da58a",
    700: "#2e7c67",
    800: "#1e5245",
    900: "#0f2922",
  },

  redAccent: {
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f",
  },

  blueAccent: {
    100: "#e1e2fe",
    200: "#c3c6fd",
    300: "#a4a9fc",
    400: "#868dfb",
    500: "#6870fa",
    600: "#535ac8",
    700: "#3e4396",
    800: "#2a2d64",
    900: "#151632",
  },
};

// mui theme settings
export const themeSettings = () => {
  return {
    palette: {
      grey: {
        ...colors.grey,
        main: colors.grey[500],
      },
      green: {
        ...colors.greenAccent,
        main: colors.greenAccent[500],
      },
      blue: {
        ...colors.blueAccent,
        main: colors.blueAccent[500],
      },
      red: {
        ...colors.redAccent,
        main: colors.redAccent[500],
      },
      black: {
        ...colors.black,
        main: colors.black[500],
      },
      background: {
        default: colors.grey[500],
        alt: colors.greenAccent[300],
        anti: colors.blueAccent[100],
        appbar: colors.blueAccent[900],
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    overrides: {
      MuiInputBase: {
        input: {
          background: "#fff",
          borderRadius: "25px",
          width: "45vw",
          paddingRight: "0",
        },
      },
    },
  };
};