import React, { createContext, useState, useContext, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, blueGrey, green, red } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? blueGrey[700] : amber[500],
          },
          secondary: {
            main: mode === "light" ? amber[500] : blueGrey[700],
          },
          success: {
            main: green[500],
          },
          error: {
            main: red[500],
          },
          background: {
            default: mode === "light" ? "#fff" : "#303030",
            paper: mode === "light" ? "#fff" : "#424242",
          },
          text: {
            primary: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#fff",
            secondary:
              mode === "light"
                ? "rgba(0, 0, 0, 0.6)"
                : "rgba(255, 255, 255, 0.7)",
          },
        },
        typography: {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          h6: {
            fontWeight: 600,
          },
          body2: {
            fontSize: "0.9rem",
            color: mode === "light" ? blueGrey[600] : blueGrey[300],
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 500,
              },
              containedPrimary: {
                color: "#fff",
                "&:hover": {
                  backgroundColor:
                    mode === "light" ? blueGrey[800] : amber[600],
                },
              },
              containedSecondary: {
                color: mode === "light" ? blueGrey[800] : blueGrey[300],
                "&:hover": {
                  backgroundColor:
                    mode === "light" ? amber[600] : blueGrey[800],
                },
              },
            },
          },
          MuiTextField: {
            defaultProps: {
              variant: "outlined",
              size: "small",
            },
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: 8,
                  backgroundColor: mode === "dark" ? "#424242" : undefined,
                  "& fieldset": {
                    borderColor:
                      mode === "dark" ? "rgba(255, 255, 255, 0.23)" : undefined,
                  },
                  "&:hover fieldset": {
                    borderColor: mode === "dark" ? amber[500] : blueGrey[700],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: mode === "dark" ? amber[500] : blueGrey[700],
                  },
                },
                "& .MuiInputBase-input": {
                  color: mode === "dark" ? "#fff" : undefined,
                },
                "& .MuiInputLabel-root": {
                  color:
                    mode === "dark" ? "rgba(255, 255, 255, 0.7)" : undefined,
                  "&.Mui-focused": {
                    color: mode === "dark" ? amber[500] : blueGrey[700],
                  },
                },
              },
            },
          },
          MuiTableContainer: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                boxShadow:
                  mode === "light" ? "0px 2px 8px rgba(0, 0, 0, 0.1)" : "none",
                backgroundColor: mode === "dark" ? "#424242" : undefined,
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              head: {
                fontWeight: 600,
                backgroundColor: mode === "light" ? blueGrey[100] : "#616161",
                color: mode === "dark" ? "#fff" : undefined,
              },
              body: {
                color: mode === "dark" ? "#fff" : undefined,
              },
            },
          },
          MuiPagination: {
            styleOverrides: {
              ul: {
                justifyContent: "center",
                marginTop: "1rem",
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 4,
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "light" ? blueGrey[700] : "#424242",
                color: "#fff",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
