import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { extractDate } from "../../utils/FunctionsUtils";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const schoolTableStyles = {
  tableHeaderCell: {
    lineHeight: { xs: "21px", lg: "30px" },
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  tableBodyCell: {
    fontSize: "0.8rem",
    textAlign: "left",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 2,
  },
  centeredMessage: {
    display: "flex",
    justifyContent: "center",
    paddingY: 4,
  },
  paperWrapper: {
    width: "100%",
    overflow: "auto",
  },
};

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  errorContainer: {
    padding: (theme) => theme.spacing(2),
    color: (theme) => theme.palette.error.main,
    textAlign: "center",
  },
  table: {
    minWidth: 650,
  },
  dateCell: {
    align: "center",
  },
  noDataText: {
    color: "grey",
    fontFamily: "Roboto",
    fontSize: { xs: "1rem", sm: "1.2rem" },
    textAlign: "center",
    marginTop: 4,
    padding: 2,
  },
};

const SchoolTransactionsTable = ({ transactions, loading, error }) => {
  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (transactions.length === 0) {
    return (
      <Typography sx={styles.noDataText}>
        No transactions found. Enter School ID to view transactions.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={schoolTableStyles.paperWrapper}>
      <Table sx={styles.table} aria-label="school transactions table">
        <TableHead>
          <TableRow>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Collect ID
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              School ID
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Gateway
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Order Amount
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Transaction Amount
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Transaction Date
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>Status</TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Custom Order ID
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <StyledTableRow key={row.collect_id}>
              <TableCell
                component="th"
                scope="row"
                sx={schoolTableStyles.tableBodyCell}
              >
                {row.collect_id}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                {row.school_id}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                {row.gateway}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                ${row.order_amount}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                ${row.transaction_amount}
              </TableCell>
              <TableCell
                sx={{ ...schoolTableStyles.tableBodyCell, ...styles.dateCell }}
              >
                {extractDate(row.transaction_date).slice(0)}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                <Chip
                  label={row.status}
                  color={
                    row.status === "Success"
                      ? "success"
                      : row.status === "Pending"
                      ? "secondary"
                      : "error"
                  }
                  size="small"
                />
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                {row.custom_order_id}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SchoolTransactionsTable;
