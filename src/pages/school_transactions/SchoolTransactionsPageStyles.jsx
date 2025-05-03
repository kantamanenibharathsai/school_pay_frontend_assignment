const schoolTransactionsStyles = {
  container: {
    marginTop: (theme) => theme.spacing(3),
  },
  formContainer: {
    margin: { sm: "auto" },
    marginBottom: (theme) => theme.spacing(2),
    marginTop: { xs: 1, sm: 1.5, md: 2, lg: "4" },
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    justifyContent: "space-between",
    gap: (theme) => theme.spacing(2.3),
    width: { xs: "100%", sm: "70%", md: "61%", lg: "55%", xl: "45%" },
    flexWrap: "wrap",
  },
  paginationContainer: {
    marginTop: (theme) => theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  noDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    justifyContent: "center",
    mt:6
  },
  noDataText: {
    fontSize: { xs: "1rem", sm: "1.2rem" },
    color: "#212121",
    textAlign: "center",
    fontWeight: 600
  },
  dateError: {
    margin: "auto",
    marginTop: (theme) => theme.spacing(2.6),
    width: { xs: "100%", sm: "75%", md: "50%", lg: "45%" },
  },
};


export default schoolTransactionsStyles;