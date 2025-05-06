const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: (theme) => theme.spacing(2),
    p: { xs: 1.5, sm: 3, md: 4.5 },
    py: { xs: 4, md: 4.5 },
    border: (theme) => `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    width: { xs: "100%", sm: "75%", md: "50%", lg: "40%" },
  },
  checkButton: {
    marginTop: (theme) => theme.spacing(2),
  },
  errorMsg: { color: "red", mt: -2.1, fontSize: "12px", fontFamily: "Roboto" },
};

export default styles;