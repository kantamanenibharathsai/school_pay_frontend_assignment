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
import { schoolTableStyles } from "./SchoolTransactionsTableStyles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SchoolTransactionsTable = ({ transactions, loading, error }) => {
  console.log("transactions", transactions);
  if (loading) {
    return (
      <Box sx={schoolTableStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={schoolTableStyles.errorContainer}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (transactions.length === 0) {
    return (
      <Typography sx={schoolTableStyles.noDataText}>
        No transactions found. Enter School ID to view transactions.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={schoolTableStyles.table}
        aria-label="school transactions table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Student ID
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Student Name
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Mail ID
            </TableCell>
            <TableCell sx={schoolTableStyles.tableHeaderCell}>
              Phone Number
            </TableCell>
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
            <StyledTableRow key={row._id}>
              <TableCell
                component="th"
                scope="row"
                sx={schoolTableStyles.tableBodyCell}
              >
                {row.student.student_id}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                {row.student.name}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                {row.student.email}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
                {row.student.phone}
              </TableCell>
              <TableCell sx={schoolTableStyles.tableBodyCell}>
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
                sx={{
                  ...schoolTableStyles.tableBodyCell,
                  ...schoolTableStyles.dateCell,
                }}
              >
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
                  sx={schoolTableStyles.chipStyle}
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
