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
import { transactionTableStyles } from "./TransactionTableStyles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TransactionTable = ({ transactions, loading, error }) => {
  if (loading) {
    return (
      <Box sx={transactionTableStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={transactionTableStyles.errorContainer}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={transactionTableStyles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Student ID
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Student Name
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Mail ID
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Phone Number
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Collect ID
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                School ID
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Gateway
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Order Amount
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Transaction Amount
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Transaction Date
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Status
              </TableCell>
              <TableCell sx={transactionTableStyles.tableHeaderCell}>
                Custom Order ID
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <StyledTableRow key={row.collect_id}>
                <TableCell component={"th"} scope="row">
                  {row.student_id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.collect_id}</TableCell>
                <TableCell>{row.school_id}</TableCell>
                <TableCell>{row.gateway}</TableCell>
                <TableCell>${row.order_amount}</TableCell>
                <TableCell>${row.transaction_amount}</TableCell>
                <TableCell sx={transactionTableStyles.dateCell}>
                  {extractDate(row.transaction_date).slice(0)}
                </TableCell>
                <TableCell>
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
                    sx={transactionTableStyles.chipStyle}
                  />
                </TableCell>
                <TableCell>{row.custom_order_id}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionTable;
