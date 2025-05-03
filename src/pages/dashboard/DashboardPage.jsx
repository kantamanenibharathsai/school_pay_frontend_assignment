import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Button,
  useMediaQuery,
} from "@mui/material";
import { getAllTransactions } from "../../api/transactions";
import TransactionTable from "../../components/dashboard/TransactionTable";
import TransactionFilters from "../../components/dashboard/TransactionFilters";
import useDebounce from "../../hooks/useDebounce";
import { delay } from "../../utils/FunctionsUtils";
import dashboardStyles from "./DashboardPageStyles";
import commonStyles from "../../styles/common";

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
  const isExtraSmall = useMediaQuery("(max-width:320px)");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setFieldErrors({});

    (async () => {
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

  const handlePageChange = (_, newPage) => {
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
    <Box sx={commonStyles.container}>
      <Typography sx={commonStyles.title} mb={3}>
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
      {!error && !loading && (
        <Typography variant="h4" sx={commonStyles.titleTwo}>
          All the Schools Transactions Details Shown Below
        </Typography>
      )}
      <Box mt={4}>
        {loading ? (
          <Box sx={commonStyles.loadingCont}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={commonStyles.errorCont}>
            <Typography color="error" sx={commonStyles.errorText}>
              {error}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              sx={dashboardStyles.backButton}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Back"
              )}
            </Button>
          </Box>
        ) : hasTransactions ? (
          <Box sx={commonStyles.tablePageContainer}>
            <TransactionTable
              transactions={transactions}
              loading={loading}
              error={error}
            />
            <Box sx={dashboardStyles.widthCont}>
              <Box sx={dashboardStyles.paginationContainer}>
                <Pagination
                  count={page + 1}
                  page={page}
                  onChange={handlePageChange}
                  color={"primary"}
                  size={isExtraSmall ? "small" : "large"}
                  siblingCount={isExtraSmall ? 0 : 1}
                  boundaryCount={isExtraSmall ? 1 : 2}
                  sx={dashboardStyles.pagination(isExtraSmall)}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={commonStyles.loadingCont}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              sx={dashboardStyles.backButton}
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
    </Box>
  );
};

export default DashboardPage;
