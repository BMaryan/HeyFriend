import React from "react";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import ChangePasswordReduxForm from "./ChangePasswordForm";
import { AccountType } from "../../../../types/types";
import styles from "./ChangePassword.module.scss";
import Snackbar from "@mui/material/Snackbar";

interface ChangePasswordPropsType {
  account: AccountType | null;
  authError: string | null;
  loading: boolean;
}

interface ReturnSnackbarFuncPropsType {
  severity: AlertColor;
  message: string;
  open: boolean;
  handleClose: () => void;
}

export interface ChangePasswordFormDataType {
  edit_password: string;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

const ReturnSnackbarFunc = (props: ReturnSnackbarFuncPropsType) => {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert {...props} elevation={6} ref={ref} variant="filled" />;
  });

  return (
    <Snackbar open={props.open} autoHideDuration={7000} onClose={props.handleClose}>
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};

const ChangePassword = (props: ChangePasswordPropsType) => {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState<AlertColor>("success");
  const [message, setMessage] = React.useState("");

  const onSubmit = (formData: ChangePasswordFormDataType) => {
    if (formData.old_password !== props.account?.password) {
      showSnackbar("error", "Your old password was entered incorrectly. Please enter it again.");
    }

    if (formData.new_password !== formData.confirm_new_password) {
      showSnackbar("error", "Please make sure both passwords match.");
    }

    if (formData.old_password === formData.new_password && formData.new_password === formData.confirm_new_password && formData.old_password === formData.confirm_new_password) {
      showSnackbar("info", "You want to change the password to the same one that was. Please try to come up with a different password");
    }

    if (formData.old_password !== formData.new_password && formData.old_password !== formData.confirm_new_password) {
      if (formData.new_password === formData.confirm_new_password && formData.old_password === props.account?.password) {
        showSnackbar("success", "You have successfully changed your password.");
      }
    }
  };

  const showSnackbar = (severityProp: AlertColor, messageProp: string) => {
    setSeverity(severityProp);
    setMessage(messageProp);
    setOpen(true);
  };

  return (
    <div className={styles.change_password}>
      <div className={styles.wrapper_profile_contact}>
        <div className={styles.wrapper_picture}>{props?.account?.avatar ? <img src={props.account.avatar} alt="" /> : <img src={defaultAvatar} alt="" />}</div>
        <div className={styles.fullName}>{props?.account ? props.account.surname + " " + props.account.name : undefined}</div>
      </div>
      <ChangePasswordReduxForm authError={props.authError} loading={props.loading} onSubmit={onSubmit} />

      {/* toggle snackBar */}
      <ReturnSnackbarFunc open={open} handleClose={() => setOpen(false)} severity={severity} message={message} />
    </div>
  );
};

export default ChangePassword;
