import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Pagination,
  CircularProgress,
  Button,
  Container,
  Alert,
} from "@mui/material";
import { getTransactionsBySchool } from "../api/transactions";
import SchoolTransactionsTable from "../components/school_transactions/SchoolTransactionsTable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import commonStyles from "../styles/common";
import useDebounce from "../hooks/useDebounce";
import { delay } from "../utils/FunctionsUtils";


const styles = {
  container: {
    marginTop: (theme) => theme.spacing(3),
  },
  formContainer: {
    margin: { sm: "auto" },
    marginBottom: (theme) => theme.spacing(2),
    marginTop: { xs: 1, sm: 1.5, md: 2, lg: "4" },
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    justifyContent: "space-between",
    gap: (theme) => theme.spacing(2),
    width: { xs: "100%", sm: "70%", md: "61%", lg: "55%", xl: "45%" },
    flexWrap: "wrap",
  },
  paginationContainer: {
    marginTop: (theme) => theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  noDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    justifyContent: "center",
  },
  noDataText: {
    fontSize: { xs: "1rem", sm: "1.2rem" },
    color: "grey",
    textAlign: "center",
  },
  backButton: {
    width: "100px",
    "&:hover": {
      backgroundColor: "lightblue !important",
      color: "#fff",
    },
  },
  dateError: {
    margin: "auto",
    marginTop: (theme) => theme.spacing(2.6),
    width: { xs: "100%", sm: "75%", md: "50%", lg: "45%" },
  },
};

const SchoolTransactionsPage = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schoolId, setSchoolId] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateError, setDateError] = useState(null);
  const debouncedSchoolId = useDebounce(schoolId, 500);
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
    // eslint-disable-next-line
  }, [debouncedSchoolId, dateRange, dateError]);

  const paginatedTransactions = allTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSchoolIdChange = (event) => {
    setSchoolId(event.target.value);
  };
  const handleStartDateChange = (newValue) => {
    const newDateRange = [newValue, dateRange[1]];
    if (validateDates(newValue, dateRange[1])) {
      setDateRange(newDateRange);
    }
  };

  const handleEndDateChange = (newValue) => {
    const newDateRange = [dateRange[0], newValue];
    if (validateDates(dateRange[0], newValue)) {
      setDateRange(newDateRange);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleReset = () => {
    setSchoolId("");
    setDateRange([null, null]);
    setDateError(null);
    setPage(1);
  };

  const hasTransactions =
    paginatedTransactions && paginatedTransactions.length > 0;

  return (
    <Container sx={styles.container} mt={2}>
      <Typography
        variant="h4"
        sx={{
          ...commonStyles.title,
          textAlign: { xs: "left", sm: "center" },
          fontSize: { xs: "21px", sm: "30px", md: "31px" },
        }}
        mb={4}
      >
        Specific School Transactions
      </Typography>
      <Box sx={styles.formContainer}>
        <TextField
          label="Enter School ID"
          value={schoolId}
          onChange={handleSchoolIdChange}
          fullWidth
          size="small"
          sx={commonStyles.textfieldStyle}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} size="small" />}
            sx={{ ...commonStyles.DatePicker, flexGrow: 1 }}
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} size="small" />}
            sx={{ ...commonStyles.DatePicker, flexGrow: 1 }}
          />
        </LocalizationProvider>
      </Box>
      {dateError && (
        <Alert severity="error" sx={styles.dateError}>
          {dateError}
        </Alert>
      )}
      <Box mt={5}>
        {loading ? (
          <Box sx={styles.noDataContainer}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={styles.noDataContainer}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : hasTransactions ? (
          <>
            <SchoolTransactionsTable
              transactions={paginatedTransactions}
              loading={loading}
              error={error}
            />
            <Box sx={styles.paginationContainer}>
              <Pagination
                count={Math.ceil(allTransactions.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="medium"
              />
            </Box>
          </>
        ) : (
          <Box sx={styles.noDataContainer}>
            <Typography sx={styles.noDataText}>
              {debouncedSchoolId && !dateError
                ? "No transactions found for this school."
                : "Enter a school ID to view transactions."}
            </Typography>
            {debouncedSchoolId && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleReset}
                sx={styles.backButton}
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
    </Container>
  );
};

export default SchoolTransactionsPage;
