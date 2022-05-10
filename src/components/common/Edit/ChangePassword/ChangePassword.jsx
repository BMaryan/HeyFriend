import React from "react";
import styles from "./ChangePassword.module.scss";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import ChangePasswordReduxForm from "./ChangePasswordForm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ReturnSnackbarFunc = (props) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={props.open} autoHideDuration={7000} onClose={props.handleClose}>
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
};

const ChangePassword = (props) => {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");

  let onSubmit = (formData) => {
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
        props.getProfileData({ password: formData.new_password });
        showSnackbar("success", "You have successfully changed your password.");
      }
    }
  };

  let showSnackbar = (severityProp, messageProp) => {
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
      <ChangePasswordReduxForm onSubmit={onSubmit} account={props.account} />

      {/* toggle snackBar */}
      <ReturnSnackbarFunc open={open} handleClose={() => setOpen(false)} severity={severity} message={message} />
    </div>
  );
};

export default ChangePassword;
