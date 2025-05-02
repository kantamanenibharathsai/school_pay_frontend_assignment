import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllTransactions = async (
  page = 1,
  status = "",
  startDate = "",
  endDate = "",
  searchTerm = "",
  rowsPerPage = 10
) => {
  try {
    if (status === "All") status = "";
    const response = await api.get("/transactions", {
      params: {
        page,
        status,
        startDate,
        endDate,
        searchTerm,
        limit: rowsPerPage,
      },
    });
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      return {
        data: null,
        error: {
          status,
          message: data?.message, // Use backend message as-is
          errors: data?.errors || {},
        },
      };
    } else if (error.request) {
      return {
        data: null,
        error: {
          status: 0,
          message:
            "No response from server. Please check your network connection.",
          errors: {},
        },
      };
    } else {
      return {
        data: null,
        error: {
          status: 0,
          message: error.message || "Unexpected error occurred.",
          errors: {},
        },
      };
    }
  }
};

export const getTransactionsBySchool = async (
  schoolId,
  startDate = "",
  endDate = ""
) => {
  try {
    const response = await api.get(`/transactions/school/${schoolId}`, {
      params: { startDate, endDate },
    });
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response) {
      return {
        data: null,
        error: {
          status: error.response.status,
          message:
            error.response.data?.message || "Failed to fetch transactions.",
        },
      };
    } else if (error.request) {
      return {
        data: null,
        error: {
          status: 0,
          message:
            "No response from server. Please check your network connection.",
        },
      };
    } else {
      // Other error
      return {
        data: null,
        error: {
          status: 0,
          message: error.message || "Unexpected error occurred.",
        },
      };
    }
  }
};

export const checkTransactionStatus = async (customOrderId) => {
  try {
    const response = await api.get(
      `/transactions/check-status/${customOrderId}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return {
        status: "error",
        message: error.response.data.message,
      };
    }
    return {
      status: "error",
      message: "An unexpected error occurred.",
    };
  }
};

export const updateTransactionStatus = async (data) => {
  try {
    const response = await api.post("/transactions/manual-update", data);
    return { success: true, ...response.data };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const simulateWebhookCall = async (payload) => {
  try {
    const response = await api.post("/webhook/transaction-status", payload);
    return response.data;
  } catch (error) {
    console.error("Error simulating webhook call:", error);
    throw error;
  }
};
