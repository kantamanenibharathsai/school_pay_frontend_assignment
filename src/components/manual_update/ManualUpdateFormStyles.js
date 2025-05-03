export const styles = {
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
  updateButton: {
    marginTop: (theme) => theme.spacing(2),
  },
  alert: {
    width: { xs: "100%", sm: "70%", md: "50%", lg: "40%" },
  },
};
