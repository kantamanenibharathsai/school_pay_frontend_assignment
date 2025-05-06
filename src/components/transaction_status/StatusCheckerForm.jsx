import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import commonStyles from "../../styles/common";
import styles from "./StatusCheckerFormStyles";

const StatusCheckerForm = ({
  customOrderId,
  onCustomOrderIdChange,
  onCheckStatus,
  loading,
}) => {
  const [customOrderIdError, setCustomOrderIdError] = useState("");
  const theme = useTheme();

  const validateCustomOrderId = (id) => {
    if (!id) return false;
    const regex = /^ORD\d{4,}$/i;
    if (!regex.test(id)) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validateCustomOrderId(customOrderId);
    if (isValid) {
      setCustomOrderIdError("");
      onCheckStatus(customOrderId);
    } else {
      setCustomOrderIdError("*Invalid Customer Order ID (Format: ORD1234)");
    }
  };

  return (
    <Box sx={styles.formContainer} component="form" onSubmit={handleSubmit}>
      <TextField
        label="Customer Order ID"
        value={customOrderId}
        onChange={(e) => onCustomOrderIdChange(e.target.value)}
        fullWidth
        size="small"
        sx={commonStyles.textfieldStyleTheme(theme)}
      />
      {customOrderIdError && (
        <Typography sx={styles.errorMsg}>{customOrderIdError}</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!customOrderId || loading}
        sx={styles.checkButton}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Check Status"
        )}
      </Button>
    </Box>
  );
};

export default StatusCheckerForm;
