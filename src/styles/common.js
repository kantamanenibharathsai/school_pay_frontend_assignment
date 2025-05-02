const commonStyles = {
  container: {
    marginTop: (theme) => theme.spacing(3),
  },
  title: {
    fontFamily: "Roboto",
    fontSize: { xs: "24px", sm: "27px", md: "30px", lg: "35x" },
    textAlign: "center",
    fontWeight: 600,
  },

  textfieldStyle: {
    width: "100%",
    borderRadius: "3px",
    "& .MuiInputLabel-root": {
      fontSize: { xs: "13px", sm: "15px" },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#5A5A5A",
      mt: "-10px",
      height: "100%",
      "&.Mui-focused": {
        fontSize: "14px",
      },
    },
    "& .MuiInputBase-input": {
      height: "38px",
      borderRadius: "3px",
      color: "#5A5A5A",
      fontFamily: "Poppins",
      fontSize: "17px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        fontSize: "0.9rem",
        legend: {
          fontSize: "0.66rem",
        },
      },
    },
  },

  statusLabelStyle: {
    fontSize: { xs: "12px", sm: "15px" },
    mt: { xs: 0.9, sm: 0.9 },
    fontWeight: 400,
    "&.Mui-focused, &.MuiFormLabel-filled, &.MuiInputLabel-shrink": {
      fontSize: "0.9rem",
      fontWeight: 500,
      mt: 0,
    },
    "&.Mui-error": {
      color: "#d32f2f",
      fontWeight: 500,
    },
  },

  statusSelectStyle: {
    width: { xs: "100%" },
    fontSize: "1rem",
    "& .MuiSelect-select": {
      width: { xs: "100%" },
      borderRadius: "3px",
      height: "39px !important",
      color: "#5A5A5A",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: "12px",
      mt: 0.1,
      "&.MuiSelect-outlined": {},
      "&.MuiInputBase-input": {
        fontFamily: "Arial !important",
        marginTop: "1px !important",
        color: "#5A5A5A",
        display: "flex",
        alignItems: "center",
      },
      "&.MuiOutlinedInput-input": {
        paddingLeft: "12px !important",
      },
      "&.MuiInputBase-inputSizeSmall": {
        fontSize: "0.9rem !important",
        height: "36px !important",
      },
      "&.Mui-selected": {
        color: "#000 !important",
        fontWeight: "700 !important",
        fontSize: "1.1rem !important",
        fontFamily: "Roboto !important",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ccc",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#999",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: (theme) => theme.palette.primary.main,
      borderWidth: 2,
    },
    "& .MuiSvgIcon-root": {
      color: "#555",
    },
    "& .MuiSelect-select.Mui-selected": {
      color: "#000",
      fontWeight: 700,
      fontSize: "1.1rem",
      fontFamily: "Roboto, sans-serif",
    },
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: (theme) => theme.spacing(2),
    p: { xs: 1.5, sm: 3, md: 4.5 },
    py: { xs: 4, md: 4.5 },
    border: (theme) => `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    width: { xs: "100%", sm: "70%", md: "50%", lg: "40%" },
  },

  formCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    mt: "30px",
  },

  bodyCont: {
    mt: 2,
    width: "100%",
    height: "auto",
  },
};

export default commonStyles;
