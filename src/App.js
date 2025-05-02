import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/navbar/Navbar";
import DashboardPage from "./pages/DashboardPage";
import SchoolTransactionsPage from "./pages/SchoolTransactionsPage";
import TransactionStatusPage from "./pages/TransactionStatusPage";
import ManualUpdatePage from "./pages/ManualUpdatePage";
import { ColorModeContextProvider } from "./contexts/ThemeContext";

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
