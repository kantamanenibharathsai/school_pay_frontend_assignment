import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { updateTransactionStatus } from "../../api/transactions";
import commonStyles from "../../styles/common";
import { styles } from "./ManualUpdateFormStyles";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ManualUpdateForm = () => {
  const [customOrderId, setCustomOrderId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const [response] = await Promise.all([
      updateTransactionStatus({
        custom_order_id: customOrderId,
        new_status: newStatus,
      }),
      delay(2000),
    ]);

    if (response.success) {
      setSuccessMessage(response.message);
    } else {
      setErrorMessage(response.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        sx={styles.formContainer}
        component="form"
        onSubmit={handleUpdateStatus}
      >
        <TextField
          label="Custom Order ID"
          value={customOrderId}
          onChange={(e) => setCustomOrderId(e.target.value)}
          fullWidth
          size="small"
          sx={commonStyles.textfieldStyle}
        />
        <FormControl fullWidth size="small">
          <InputLabel id="new-status-label" sx={commonStyles.statusLabelStyle}>
            New Status
          </InputLabel>
          <Select
            labelId="new-status-label"
            id="new-status"
            value={newStatus}
            label="New Status"
            onChange={(e) => setNewStatus(e.target.value)}
            sx={commonStyles.statusSelectStyle}
          >
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading || !customOrderId || !newStatus}
          sx={styles.updateButton}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Update Status"
          )}
        </Button>
      </Box>
      <br />
      {successMessage && (
        <Alert severity="success" sx={styles.alert}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert sx={styles.alert} severity="error">
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default ManualUpdateForm;
