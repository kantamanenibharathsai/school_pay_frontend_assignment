const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    userSelect: "none",
  },
  arrow: (theme, disabled) => ({
    minWidth: 32,
    width: 32,
    height: 32,
    color: disabled
      ? theme.palette.action.disabled
      : theme.palette.text.primary,
    fontSize: 24,
    mx: 2,
    p: 0,
    transition: "color 0.2s",
  }),
  pageNumberWrapper: {
    overflow: "hidden",
    width: 40,
    height: 40,
    position: "relative",
    display: "inline-block",
  },
  pageNumber: (slideDirection) => ({
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#4a555e",
    color: "#fff",
    fontWeight: 500,
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
    transform:
      slideDirection === "left"
        ? "translateX(-40px)"
        : slideDirection === "right"
        ? "translateX(40px)"
        : "translateX(0)",
  }),
};

export default styles;
