import React from "react";
import { Typography, Box } from "@mui/material";
import ManualUpdateForm from "../components/manual_update/ManualUpdateForm";
import commonStyles from "../styles/common";


const ManualUpdatePage = () => {
  return (
    <Box sx={commonStyles.container}>
      <Typography variant="h4" sx={commonStyles.title}>
        Manual Transaction Status Update
      </Typography>
      <Box mt={2} sx={commonStyles.formCont}>
        <ManualUpdateForm />
      </Box>
    </Box>
  );
};

export default ManualUpdatePage;
