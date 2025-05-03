const dashboardStyles = {
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    mb: 5,
    mt: 3,
    width: { xs: "100%", sm: "90%", md: "90%", lg: "75%", xl: "70%" },
  },
  backButton: {
    width: "100px",
    backgroundColor: "#333333",
    "&:hover": {
      backgroundColor: "#a1cdeb !important",
      color: "#fff",
    },
  },
  widthCont: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  pagination: (isExtraSmall) => ({
    mt: -2,
    "& .MuiPaginationItem-root": {
      minWidth: isExtraSmall ? "30px" : "32px",
      height: isExtraSmall ? "30px" : "32px",
      margin: isExtraSmall ? "0 2px" : "0 4px",
      fontSize: isExtraSmall ? "0.75rem" : "0.875rem",
    },
  }),
};


export default dashboardStyles;
