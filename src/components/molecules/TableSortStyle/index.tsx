import { styled, TableSortLabel } from "@mui/material";

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  "&.MuiTableSortLabel-root": {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
    "&.MuiTableSortLabel-active": {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
    "&:hover": {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

export default StyledTableSortLabel;
