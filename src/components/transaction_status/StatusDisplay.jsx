import React from "react";
import { Typography, Alert, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const StatusTypography = styled(Typography)(({ theme, status }) => ({
  fontWeight: 600,
  color:
    status === "Success"
      ? theme.palette.success.main
      : status === "Pending"
      ? theme.palette.warning.main
      : status === "Failed"
      ? theme.palette.error.main
      : theme.palette.text.primary,
}));

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    mt: 2,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  pendingProgress: {
    mr: 1,
  },
};

const StatusDisplay = ({ status, error  }) => {
  console.log("status", status, "error", error);
  if (error) return <Alert severity="error">{error}</Alert>;

  if (status) {
    let StatusIcon;
    let iconColor;

    switch (status) {
      case "Success":
        StatusIcon = CheckCircleOutlineIcon;
        iconColor = "success";
        break;
      case "Pending":
        StatusIcon = HourglassEmptyIcon;
        iconColor = "warning";
        break;
      case "Failed":
        StatusIcon = ErrorOutlineIcon;
        iconColor = "error";
        break;
      default:
        StatusIcon = null;
        iconColor = "primary";
    }

    return (
      <Box sx={styles.container}>
        <Typography variant="subtitle1">Transaction Status:</Typography>
        <Box sx={styles.statusContainer}>
          {StatusIcon && <StatusIcon color={iconColor} />}
          <StatusTypography variant="h6" status={status}>
            {status}
          </StatusTypography>
        </Box>
      </Box>
    );
  }

  return null;
};

export default StatusDisplay;
