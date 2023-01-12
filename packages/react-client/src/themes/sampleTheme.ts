import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface TypographySystemOverrides {
    // h5: undefined; // removing this also see below
  }
}

const sampleTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#319795",
          solidHoverBg: "#2C7A7B",
          solidActiveBg: "#285E61",
          outlinedColor: "#2C7A7B",
          outlinedBorder: "#2C7A7B",
          outlinedHoverBorder: undefined,
          outlinedHoverBg: "#E6FFFA",
          outlinedActiveBg: "#B2F5EA",
        },
        focusVisible: "rgba(66, 153, 225, 0.6)",
      },
    },
  },
  focus: {
    default: {
      outlineWidth: "3px",
    },
  },
  fontFamily: {
    body: "Inter, var(--chakra-fontFamily-fallback)",
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          "&:focus": theme.focus.default,
          fontWeight: 600,
          ...(ownerState.size === "md" && {
            borderRadius: "0.375rem",
            paddingInline: "1rem",
          }),
        }),
      },
    },
    JoyTypography: {
      defaultProps: {
        levelMapping: {
          display1: "h1",
          display2: "h1",
          h1: "h2",
          h2: "h2",
          h3: "h3",
          h4: "h3",
          h5: "h3", // removing this see also declare module - removal method doesn't work
          h6: "h3",
          body1: "p",
          body2: "span",
          body3: "span",
          body4: "span",
          body5: "span",
        },
      },
    },
  },
});
