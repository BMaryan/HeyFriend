import React from "react";
import styles from "./withSuspense.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

interface WithSuspensePropsType {}

export const withSuspense = (Component: React.FunctionComponent<WithSuspensePropsType>) => {
  return (props: WithSuspensePropsType) => {
    return (
      <React.Suspense fallback={<CircularProgress className={styles.loading} />}>
        <Component {...props} />
      </React.Suspense>
    );
  };
};
