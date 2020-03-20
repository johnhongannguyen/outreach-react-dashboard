import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Open Sans !important  "].join(","),

    h1: {
      fontFamily: ["Quicksand !important"].join(","),
      fontWeight: "bold"
    },
    h2: {
      fontFamily: ["Quicksand !important  "].join(",")
    },
    h3: {
      fontFamily: ["Quicksand !important  "].join(",")
    },
    h4: {
      fontFamily: ["Quicksand !important  "].join(",")
    },
    h5: {
      fontFamily: ["Quicksand !important  "].join(",")
    },
    body1: {
      fontFamily: ["Quicksand !important  "].join(","),
      fontWeight: 400,
      fontSize: "20px !important"
    }
  },
  palette: {
    primary: {
      // Outreach Orange
      main: "#F27821"
    },
    secondary: {
      // Outreach Dark Gray/Blue
      main: "#374052"
    }
  }
});

export default theme;
