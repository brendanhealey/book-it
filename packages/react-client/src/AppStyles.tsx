import Sheet, { SheetProps } from "@mui/joy/Sheet";
import { styled } from "@mui/joy/styles";

export const LayoutWrapper = styled(Sheet)<SheetProps>(({ theme }) => ({}));

export const LayoutHeader = styled(Sheet)<SheetProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: 0,
  padding: 4,
}));

LayoutHeader.defaultProps = {
  ...LayoutHeader.defaultProps,
  variant: "soft",
  color: "primary",
};

export const LayoutMain = styled(Sheet)<SheetProps>(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
}));

export const LayoutSidebar = styled(Sheet)<SheetProps>(({ theme }) => ({
  width: "10%",
  display: "flex",
}));

LayoutSidebar.defaultProps = {
  ...LayoutHeader.defaultProps,
  variant: "solid",
  color: "primary",
};

export const LayoutContent = styled(Sheet)<SheetProps>(({ theme }) => ({
  display: "flex",
  flex: 1,
  width: "100%",
  justifyContent: "center",
}));

export const LayoutFooter = styled(Sheet)<SheetProps>(({ theme }) => ({}));
