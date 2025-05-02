import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import commonStyles from "../../styles/common";

const styles = {
  filterContainer: {
    margin: { sm: "auto" },
    marginBottom: (theme) => theme.spacing(2),
    marginTop: { xs: 1, sm: 1.5, md: 2, lg: "4" },
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    gap: (theme) => theme.spacing(2),
    width: { xs: "100%", sm: "76%", md: "90%", lg: "75%", xl: "70%" },
    flexWrap: "wrap",
  },
  innerContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 2,
    width: "100%",
  },
  statusFormControl: {
    width: { xs: "100%", md: "30%" },
    minWidth: { md: "120px" },
  },
  searchTextField: {
    ...commonStyles.textfieldStyle,
    width: "100%",
    flexBasis: "100%",
  },
};

const TransactionFilters = ({
  statusFilter,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  searchTerm,
  onSearchChange,
  fieldErrors = {},
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={styles.filterContainer}>
        <TextField
          label="Enter Collect ID / Customer Order ID"
          value={searchTerm}
          onChange={onSearchChange}
          size="small"
          sx={styles.searchTextField}
          error={!!fieldErrors.searchTerm}
          helperText={fieldErrors.searchTerm}
        />
        <Box sx={styles.innerContainer}>
          <FormControl
            sx={styles.statusFormControl}
            size="small"
            error={!!fieldErrors.status}
          >
            <InputLabel
              id="status-filter-label"
              sx={commonStyles.statusLabelStyle}
            >
              Status
            </InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Status"
              onChange={onStatusChange}
              size="small"
              sx={commonStyles.statusSelectStyle}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Success">Success</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
            {!!fieldErrors.status && (
              <FormHelperText>{fieldErrors.status}</FormHelperText>
            )}
          </FormControl>
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={(newValue) => onDateRangeChange([newValue, dateRange[1]])}
            sx={{ ...commonStyles.DatePicker, flexGrow: 1 }}
            slotProps={{
              textField: {
                error: !!fieldErrors.startDate,
                helperText: fieldErrors.startDate,
              },
            }}
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={(newValue) => onDateRangeChange([dateRange[0], newValue])}
            sx={{ ...commonStyles.DatePicker, flexGrow: 1 }}
            slotProps={{
              textField: {
                error: !!fieldErrors.endDate,
                helperText: fieldErrors.endDate,
              },
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TransactionFilters;
