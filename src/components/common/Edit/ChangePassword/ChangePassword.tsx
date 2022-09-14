import React from "react";
import CustomSnackbar from "../../../molecules/Snackbar/Snackbar";
import ChangePasswordReduxForm from "./ChangePasswordForm";
import CustomAvatar from "../../../atoms/Avatar/Avatar";
import { AccountType } from "../../../../types/types";
import styles from "./ChangePassword.module.scss";
import { AlertColor } from "@mui/material/Alert";
import { updatePassword } from "firebase/auth";
import { auth } from "../../../../firebase";

interface ChangePasswordPropsType {
  account: AccountType | null;
  authError: string | null;
  loading: boolean;
  updateAccountThunk: (account: AccountType) => void;
}

export interface ChangePasswordFormDataType extends Array<string> {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

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
        auth.currentUser &&
          updatePassword(auth.currentUser, formData.new_password)
            .then(() => {
              props.account && props.updateAccountThunk({ ...props.account, password: formData.new_password });
              showSnackbar("success", "You have successfully changed your password.");
              Object.keys(formData).map((item: any) => (formData[item] = ""));
            })
            .catch((error) => {
              showSnackbar("error", error.message);
            });
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
        <div className={styles.wrapper_picture}>{props?.account && <CustomAvatar avatarData={props?.account} />}</div>
        <div className={styles.fullName}>{props?.account ? props.account.surname + " " + props.account.name : undefined}</div>
      </div>
      <ChangePasswordReduxForm authError={props.authError} loading={props.loading} onSubmit={onSubmit} />

      {/* toggle snackBar */}
      <CustomSnackbar open={open} message={message} severity={severity} setOpen={setOpen} />
    </div>
  );
};

export default ChangePassword;
