import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import StatusCheckerForm from "../../components/transaction_status/StatusCheckerForm";
import StatusDisplay from "../../components/transaction_status/StatusDisplay";
import { checkTransactionStatus } from "../../api/transactions";
import commonStyles from "../../styles/common";
import { styles } from "./TransactionStatusPageStyles";

const POLLING_INTERVAL = 3000;

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
    let intervalId = null;

    const fetchStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        const [data] = await Promise.all([
          checkTransactionStatus(customOrderId),
          new Promise((res) => setTimeout(res, 2000)),
        ]);
        if (!isMounted) return null;
        if (data.status === "error") {
          setStatus(null);
          setError(data.message);
        } else {
          setStatus(data.status);
          setError(null);
        }
        setLoading(false);
        return data.status;
      } catch (err) {
        if (isMounted) {
          setStatus(null);
          setError("Failed to fetch status");
          setLoading(false);
        }
        return null;
      }
    };

    const startPolling = () => {
      intervalId = setInterval(async () => {
        const currentStatus = await fetchStatus();
        if (currentStatus && currentStatus !== "Pending") {
          clearInterval(intervalId);
        }
      }, POLLING_INTERVAL);
    };

    fetchStatus().then((initialStatus) => {
      if (initialStatus === "Pending") {
        startPolling();
      }
    });

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [triggerCheck, customOrderId]);

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
          <StatusDisplay
            status={status}
            error={error}
            // refreshing={status === "Pending" && !loading}
          />
        </Box>
      )}
    </Box>
  );
};

export default TransactionStatusPage;
