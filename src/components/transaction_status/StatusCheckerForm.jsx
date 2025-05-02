import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import commonStyles from "../../styles/common";

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: (theme) => theme.spacing(2),
    p: { xs: 1.5, sm: 3, md: 4.5 },
    py: { xs: 4, md: 4.5 },
    border: (theme) => `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    width: { xs: "100%", sm: "75%", md: "50%", lg: "40%" },
  },
  checkButton: {
    marginTop: (theme) => theme.spacing(2),
  },
  errorMsg: { color: "red", mt: -2.1, fontSize: "12px", fontFamily: "Roboto" },
};

const StatusCheckerForm = ({
  customOrderId,
  onCustomOrderIdChange,
  onCheckStatus,
  loading,
}) => {
  const [customOrderIdError, setCustomOrderIdError] = useState("");

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
        sx={commonStyles.textfieldStyle}
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
