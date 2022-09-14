/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import styles from "./Snackbar.module.scss";

interface SnackbarPropsType {
  open: boolean;
  message: string;
  icon?: React.ReactNode;
  variant?: "standard" | "filled" | "outlined";
  severity: "success" | "info" | "warning" | "error";
  autoHideDuration?: number | null | undefined;
  setOpen: (value: boolean) => void;
}

const CustomSnackbar = (props: SnackbarPropsType) => {
  // const handleClick = () => {
  //   props.setOpen(true);
  // };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert {...props} elevation={6} ref={ref} variant={props.variant || "filled"} />;
  });

  return (
    <Snackbar open={props.open} autoHideDuration={props.autoHideDuration || 7000} onClose={handleClose}>
      <Alert severity={props.severity} icon={props.icon} onClose={handleClose}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
