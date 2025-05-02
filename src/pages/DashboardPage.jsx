import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Button,
} from "@mui/material";
import { getAllTransactions } from "../api/transactions";
import TransactionTable from "../components/dashboard/TransactionTable";
import TransactionFilters from "../components/dashboard/TransactionFilters";
import useDebounce from "../hooks/useDebounce";
import commonStyles from "../styles/common";
import { delay } from "../utils/FunctionsUtils";

const styles = {
  container: {
    marginTop: (theme) => theme.spacing(3),
  },
  title: {
    marginBottom: (theme) => theme.spacing(2),
    fontFamily: "Roboto",
    fontSize: { xs: "24px", sm: "27px", md: "30px", lg: "35px" },
    textAlign: "center",
    fontWeight: 600,
  },
  titleTwo: {
    fontFamily: "Roboto",
    fontSize: { xs: "17px", sm: "18px", md: "22px", lg: "24px" },
    textAlign: { xs: "left", md: "center" },
    fontWeight: 600,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    mb: 5,
    mt: 3,
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
};

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setFieldErrors({});

    (async () => {
      // Start API call and delay in parallel
      const [result] = await Promise.all([
        getAllTransactions(
          page,
          statusFilter,
          dateRange[0],
          dateRange[1],
          debouncedSearchTerm,
          rowsPerPage
        ),
        delay(2000),
      ]);

      if (!isMounted) return;

      if (result.error) {
        setError(result.error.message);
        setFieldErrors(result.error.errors || {});
        setTransactions([]);
      } else {
        setTransactions(result.data.data || []);
        setError(null);
        setFieldErrors({});
      }
      setLoading(false);
    })();

    return () => {
      isMounted = false;
    };
  }, [page, statusFilter, dateRange, debouncedSearchTerm, rowsPerPage]);

  const handleClick = () => {
    setStatusFilter("");
    setDateRange([null, null]);
    setSearchTerm("");
    setPage(1);
    setError(null);
    setFieldErrors({});
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value === "All" ? "" : event.target.value);
    setPage(1);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const hasTransactions = transactions && transactions.length > 0;

  return (
    <Container sx={styles.container}>
      <Typography variant="h4" sx={commonStyles.title} mb={4}>
        Transactions Dashboard
      </Typography>
      <TransactionFilters
        statusFilter={statusFilter || "All"}
        onStatusChange={handleStatusFilterChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        fieldErrors={fieldErrors}
      />
      <Typography variant="h4" sx={styles.titleTwo} mt={4}>
        All the Schools Transactions Details Shown Below
      </Typography>
      <Box mt={4}>
        {loading ? (
          <Box sx={styles.noDataContainer}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={styles.noDataContainer}>
            <Typography color="error" sx={{ fontWeight: 500 }}>
              {error}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              sx={styles.backButton}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Back"
              )}
            </Button>
          </Box>
        ) : hasTransactions ? (
          <>
            <TransactionTable
              transactions={transactions}
              loading={loading}
              error={error}
            />
            <Box sx={styles.paginationContainer}>
              <Pagination
                count={page + 1}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="medium"
                sx={{ mt: -2 }}
              />
            </Box>
          </>
        ) : (
          <Box sx={styles.noDataContainer}>
            <Typography sx={styles.noDataText}>
              No transactions found.
            </Typography>
            <Typography sx={styles.noDataText}>
              Click back to get all the Transactions.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              sx={styles.backButton}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Back"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DashboardPage;
