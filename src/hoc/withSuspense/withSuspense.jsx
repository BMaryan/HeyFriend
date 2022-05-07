import React from "react";
import styles from "./withSuspense.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

export const withSuspense = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<CircularProgress className={styles.loading} />}>
        <Component {...props} />
      </React.Suspense>
    );
  };
};
