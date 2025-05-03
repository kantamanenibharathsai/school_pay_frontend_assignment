import commonStyles from "../../styles/common";

export const transactionFilterStyles = {
  filterContainer: {
    margin: { sm: "auto" },
    marginBottom: (theme) => theme.spacing(2),
    marginTop: { xs: 1, sm: 1.5, md: 2, lg: "4" },
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    gap: (theme) => theme.spacing(2.3),
    width: { xs: "100%", sm: "90%", md: "90%", lg: "75%", xl: "70%" },
    flexWrap: "wrap",
  },
  innerContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 2.3,
    width: "100%",
  },
  statusFormControl: {
    width: { xs: "100%", md: "30%" },
  },
  searchTextField: {
    ...commonStyles.textfieldStyle,
    width: "100%",
    flexBasis: "100%",
  },
};
