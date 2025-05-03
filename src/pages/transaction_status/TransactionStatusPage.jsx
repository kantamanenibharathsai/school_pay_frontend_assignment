import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import StatusCheckerForm from "../../components/transaction_status/StatusCheckerForm";
import StatusDisplay from "../../components/transaction_status/StatusDisplay";
import { checkTransactionStatus } from "../../api/transactions";
import commonStyles from "../../styles/common";
import { delay } from "../../utils/FunctionsUtils";
import { styles } from "./TransactionStatusPageStyles";

const TransactionStatusPage = () => {
  const [customOrderId, setCustomOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triggerCheck, setTriggerCheck] = useState(false);

  const handleCheckStatus = () => {
    setTriggerCheck((prev) => !prev);
  };

  useEffect(() => {
    if (!triggerCheck || !customOrderId) return;

    let isMounted = true;
    const fetchStatus = async () => {
      setLoading(true);
      setStatus(null);
      setError(null);
      const [data] = await Promise.all([
        checkTransactionStatus(customOrderId),
        delay(2000),
      ]);

      if (!isMounted) return;

      if (data.status === "error") {
        setStatus(null);
        setError(data.message);
      } else {
        setStatus(data.status);
        setError(null);
      }
      setLoading(false);
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [triggerCheck]);

  const setCustomerOrderIdHandler = (orderId) => {
    setCustomOrderId(orderId);
  };

  return (
    <Box sx={commonStyles.bodyCont}>
      <Typography variant="h4" sx={commonStyles.title}>
        Transaction Status Checker
      </Typography>
      <Box sx={commonStyles.formCont}>
        <StatusCheckerForm
          customOrderId={customOrderId}
          onCustomOrderIdChange={setCustomerOrderIdHandler}
          onCheckStatus={handleCheckStatus}
          loading={loading}
        />
      </Box>
      {(status || error) && (
        <Box sx={styles.formCont}>
          <StatusDisplay status={status} error={error} />
        </Box>
      )}
    </Box>
  );
};

export default TransactionStatusPage;
