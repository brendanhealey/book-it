import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import ModeToggle from "components/ModeToggle";

export const Banner = () => (
  <>
    <ModeToggle />
    <Typography fontSize="lg" fontWeight="lg">
      You book it, we cook it!
    </Typography>
    <Badge
      badgeContent="Book it"
      size="md"
      variant="solid"
      sx={{ textAlign: "center", mr: 3 }}
    />
  </>
);

export default Banner;
