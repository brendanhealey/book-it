import React from "react";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { Text, Text2 } from "component-lib";
import { ColorContext } from "./ColourContext";
import { SwitchModeButton } from "./components/SwitchModeButton";
import { lightTheme } from "themes/light";
import { darkTheme } from "themes/dark";

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = React.useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <SwitchModeButton />
        <Text>Hello text1</Text>
        <Text2>Hello text2</Text2>
      </ThemeProvider>
    </ColorContext.Provider>
  );
}

export default App;
