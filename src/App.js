import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/navbar/Navbar";
import TransactionStatusPage from "./pages/transaction_status/TransactionStatusPage";
import ManualUpdatePage from "./pages/manual_update/ManualUpdatePage";
import { ColorModeContextProvider } from "./contexts/ThemeContext";
import DashboardPage from "./pages/dashboard/DashboardPage";
import SchoolTransactionsPage from "./pages/school_transactions/SchoolTransactionsPage";

function App() {
  return (
    <ColorModeContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/school-transactions"
              element={<SchoolTransactionsPage />}
            />
            <Route
              path="/transaction-status"
              element={<TransactionStatusPage />}
            />
            <Route path="/manual-update" element={<ManualUpdatePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ColorModeContextProvider>
  );
}

export default App;
