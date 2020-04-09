import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        background: "#F27821 !important",
        color: "white !important",
        fontWeight: "bold",
      },
      outlined: {
        // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        height: 36,
        padding: "0 30px !important",
        "&:hover": {
          background: "#F27821 !important",
          color: "white !important",
          fontWeight: "bold",
        },
      },
    },
    MuiTableContainer: {
      root: {
        minHeight: 600,
        maxHeight: "70vh",
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: "Quicksand !important",
      },
    },
    MuiTextField: {
      root: {
        fontFamily: "Open Sans !important",
      },
    },
  },

  shape: {
    borderRadius: 12.5,
  },
  // Typography
  typography: {
    // Buttons with text Transform (Material Design suggests otherwise)
    button: {
      textTransform: "none",
    },

    // By Default - Open Sans
    fontFamily: ["Open Sans !important  "].join(","),

    // Headers: Quicksand
    h1: {
      fontFamily: ["Quicksand !important"].join(","),
      fontWeight: "bold",
    },
    h2: {
      fontFamily: ["Quicksand !important  "].join(","),
    },
    h3: {
      fontFamily: ["Quicksand !important  "].join(","),
    },
    h4: {
      fontFamily: ["Quicksand !important  "].join(","),
      fontSize: "22px !important",
    },
    h5: {
      fontFamily: ["Quicksand !important  "].join(","),
      fontSize: "18px !important",
    },
    h6: {
      fontFamily: ["Quicksand !important  "].join(","),
      fontSize: "16px !important",
    },

    // Body Fonts: Open Sans
    body1: {
      fontFamily: ["Open Sans !important  "].join(","),
      fontWeight: 400,
      fontSize: "18px !important",
    },
    body2: {
      fontFamily: ["Open Sans !important  "].join(","),
      // color: "#374052",
      fontWeight: 300,
      // fontWeight: 400
      fontSize: "14px !important",
    },
  },
  // Colors
  palette: {
    primary: {
      // Outreach Orange
      main: "#F27821",
    },
    secondary: {
      // Outreach Dark Gray/Blue
      main: "#374052",
    },
  },
  table: {},
});

export default theme;
