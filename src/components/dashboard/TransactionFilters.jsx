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
import { transactionFilterStyles } from "./TransactionFiterStyles";

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
      <Box sx={transactionFilterStyles.filterContainer}>
        <TextField
          label="Enter Collect ID / Customer Order ID"
          value={searchTerm}
          onChange={onSearchChange}
          size="small"
          sx={transactionFilterStyles.searchTextField}
          error={!!fieldErrors.searchTerm}
          helperText={fieldErrors.searchTerm}
        />
        <Box sx={transactionFilterStyles.innerContainer}>
          <FormControl
            sx={transactionFilterStyles.statusFormControl}
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
