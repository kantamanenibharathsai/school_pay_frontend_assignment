import { createTheme } from '@mui/material/styles';
import { amber, blueGrey, green, red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: blueGrey[700],
        },
        secondary: {
            main: amber[500],
        },
        success: {
            main: green[500],
        },
        error: {
            main: red[500],
        },
        mode: 'light',
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h6: {
            fontWeight: 600,
        },
        body2: {
            fontSize: '0.9rem',
            color: blueGrey[600],
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                },
                containedPrimary: {
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: blueGrey[800],
                    },
                },
                containedSecondary: {
                    color: blueGrey[800],
                    '&:hover': {
                        backgroundColor: amber[600],
                    },
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    border: "2px solid red",
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 600,
                    backgroundColor: blueGrey[100],
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                ul: {
                    justifyContent: 'center',
                    marginTop: '1rem',
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
    },
});

export default theme;