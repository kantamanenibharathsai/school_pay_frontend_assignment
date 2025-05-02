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

export const transactionTableStyles = {
  tableHeaderCell: {
    lineHeight: { xs: "21px", lg: "30px" },
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
  },
  table: {
    minWidth: 650,
  },
  dateCell: {
    align: "center",
  },

  chipStyle: {
    width: "70px",
    height: "30px",
  },
};

const TransactionTable = ({ transactions, loading, error }) => {
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
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
                <TableCell component="th" scope="row">
                  {row.collect_id}
                </TableCell>
                <TableCell>{row.school_id}</TableCell>
                <TableCell>{row.gateway}</TableCell>
                <TableCell>${row.order_amount}</TableCell>
                <TableCell>${row.transaction_amount}</TableCell>
                <TableCell sx={styles.dateCell}>
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
                    sx={styles.chipStyle}
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
