import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import styles from "./CustomPaginationWithSlideStyles";
import { useTheme } from "@mui/material/styles";

const CustomPaginationWithSlide = ({
  page,
  count,
  onChange,
  loading = false,
  sx = {},
}) => {
  const [slideDirection, setSlideDirection] = useState(null);
  const timeoutRef = useRef();
  const theme = useTheme();

  const handleArrowClick = (e, newPage) => {
    if (newPage < 1 || newPage > count || loading) return;
    setSlideDirection(newPage > page ? "left" : "right");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSlideDirection(null);
      onChange(e, newPage);
    }, 300);
  };

  return (
    <Box
      component="nav"
      aria-label="pagination"
      sx={{ ...styles.container, ...sx }}
    >
      <Button
        variant="text"
        sx={styles.arrow(theme, page === 1 || loading)}
        onClick={(e) => handleArrowClick(e, page - 1)}
        disabled={page === 1 || loading || !!slideDirection}
        aria-label="Previous"
        tabIndex={page === 1 ? -1 : 0}
      >
        <KeyboardArrowLeft fontSize="inherit" />
      </Button>
      <Box sx={styles.pageNumberWrapper}>
        <Box sx={styles.pageNumber(slideDirection)}>{page}</Box>
      </Box>
      <Button
        variant="text"
        sx={styles.arrow(theme, page === count || loading)}
        onClick={(e) => handleArrowClick(e, page + 1)}
        disabled={page === count || loading || !!slideDirection}
        aria-label="Next"
        tabIndex={page === count ? -1 : 0}
      >
        <KeyboardArrowRight fontSize="inherit" />
      </Button>
    </Box>
  );
};

export default CustomPaginationWithSlide;
