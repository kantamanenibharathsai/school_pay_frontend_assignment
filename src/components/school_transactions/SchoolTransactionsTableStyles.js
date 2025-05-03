export const schoolTableStyles = {
  noDataText: {
    color: "grey",
    fontFamily: "Roboto",
    fontSize: { xs: "1rem", sm: "1.2rem" },
    textAlign: "center",
    marginTop: 4,
    padding: 2,
  },
  tableHeaderCell: {
    lineHeight: { xs: "21px", lg: "30px" },
  },
  tableBodyCell: {
    fontSize: "0.8rem",
    textAlign: "left",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 2,
  },
  centeredMessage: {
    display: "flex",
    justifyContent: "center",
    paddingY: 4,
  },
  paperWrapper: {
    width: "100%",
    overflow: "auto",
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  errorContainer: {
    padding: (theme) => theme.spacing(2),
    color: (theme) => theme.palette.error.main,
  },
  table: {
    minWidth: 650,
  },
  dateCell: {
    align: "center",
  },

  chipStyle: {
    width: "70px",
    height: "30px",
  },
};
