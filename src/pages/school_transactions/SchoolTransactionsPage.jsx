import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  CircularProgress,
  Button,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SchoolTransactionsTable from "../../components/school_transactions/SchoolTransactionsTable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import schoolTransactionsStyles from "./SchoolTransactionsPageStyles";
import commonStyles from "../../styles/common";
import { delay } from "../../utils/FunctionsUtils";
import useDebounce from "../../hooks/useDebounce";
import { getTransactionsBySchool } from "../../api/transactions";
import dashboardStyles from "../dashboard/DashboardPageStyles";
import CustomPaginationWithSlide from "../../components/dashboard/CustomPaginationWithSlide";

const SchoolTransactionsPage = () => {
  const theme = useTheme();
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schoolId, setSchoolId] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateError, setDateError] = useState(null);
  const debouncedSchoolId = useDebounce(schoolId, 500);
  const isExtraSmall = useMediaQuery("(max-width:320px)");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const validateDates = (startDate, endDate) => {
    if (startDate && endDate && startDate > endDate) {
      setDateError("End date cannot be earlier than start date");
      return false;
    }
    setDateError(null);
    return true;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchTransactions = async () => {
      if (debouncedSchoolId && !dateError) {
        setLoading(true);
        setError(null);
        setAllTransactions([]);
        try {
          const startDate = dateRange[0] ? dateRange[0].toISOString() : "";
          const endDate = dateRange[1] ? dateRange[1].toISOString() : "";
          const [{ data, error }] = await Promise.all([
            getTransactionsBySchool(debouncedSchoolId, startDate, endDate),
            delay(2000),
          ]);

          if (!isMounted) return;

          if (error) {
            setAllTransactions([]);
            setError(error.message);
          } else {
            setAllTransactions(data || []);
            setError(null);
          }
        } catch (err) {
          if (isMounted) {
            setAllTransactions([]);
            setError(
              err.message ||
                `Failed to fetch transactions for school ${debouncedSchoolId}.`
            );
          }
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        setAllTransactions([]);
        setLoading(false);
        setError(null);
      }
    };

    fetchTransactions();
    setPage(1);

    return () => {
      isMounted = false;
    };
  }, [debouncedSchoolId, dateRange, dateError]);

  const paginatedTransactions = allTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.max(
    1,
    Math.ceil(allTransactions.length / rowsPerPage)
  );

  const handleSchoolIdChange = (event) => setSchoolId(event.target.value);
  const handleStartDateChange = (newValue) => {
    const newDateRange = [newValue, dateRange[1]];
    if (validateDates(newValue, dateRange[1])) setDateRange(newDateRange);
  };
  const handleEndDateChange = (newValue) => {
    const newDateRange = [dateRange[0], newValue];
    if (validateDates(dateRange[0], newValue)) setDateRange(newDateRange);
  };
  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleReset = () => {
    setSchoolId("");
    setDateRange([null, null]);
    setDateError(null);
    setPage(1);
  };

  const hasTransactions =
    paginatedTransactions && paginatedTransactions.length > 0;

  return (
    <Box sx={commonStyles.container}>
      <Typography sx={commonStyles.title} mb={3}>
        Specific School Transactions
      </Typography>
      <Box sx={schoolTransactionsStyles.formContainer}>
        <TextField
          label="Enter School ID"
          value={schoolId}
          onChange={handleSchoolIdChange}
          fullWidth
          size="small"
          sx={commonStyles.textfieldStyleTheme(theme)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={handleStartDateChange}
            slotProps={{
              textField: {
                size: "large",
                sx: { ...commonStyles.DatePicker, flexGrow: 1 },
              },
            }}
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={handleEndDateChange}
            slotProps={{
              textField: {
                size: "large",
                sx: { ...commonStyles.DatePicker, flexGrow: 1 },
              },
            }}
            sx={{ ...commonStyles.DatePicker, flexGrow: 1 }}
          />
        </LocalizationProvider>
      </Box>
      {dateError && (
        <Alert severity="error" sx={schoolTransactionsStyles.dateError}>
          {dateError}
        </Alert>
      )}
      <Box mt={5}>
        {loading ? (
          <Box sx={commonStyles.loadingCont}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={commonStyles.errorCont}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : hasTransactions ? (
          <Box sx={commonStyles.tablePageContainer}>
            <SchoolTransactionsTable
              transactions={paginatedTransactions}
              loading={loading}
              error={error}
            />
            <Box sx={dashboardStyles.widthCont}>
              <Box sx={dashboardStyles.paginationContainer}>
                <CustomPaginationWithSlide
                  page={page}
                  count={totalPages}
                  onChange={handlePageChange}
                  style={dashboardStyles.pagination(isExtraSmall)}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={schoolTransactionsStyles.noDataContainer}>
            <Typography
              sx={{
                ...schoolTransactionsStyles.noDataText,
                color: theme.palette.text.primary,
              }}
            >
              {debouncedSchoolId && !dateError
                ? "No transactions found for this school."
                : "Enter a school ID to view transactions."}
            </Typography>
            {debouncedSchoolId && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleReset}
                sx={schoolTransactionsStyles.backButton}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Reset"
                )}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SchoolTransactionsPage;
