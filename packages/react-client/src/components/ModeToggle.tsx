import { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import { useColorScheme } from "@mui/joy/styles";
import DarkIcon from "@mui/icons-material/Brightness4";
import LightIcon from "@mui/icons-material/Brightness7";
import { useIsMounted } from "component-lib";

export const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const isMounted = useIsMounted();

  // necessary for server-side rendering
  // because mode is undefined on the server
  if (!isMounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
};

export default ModeToggle;
