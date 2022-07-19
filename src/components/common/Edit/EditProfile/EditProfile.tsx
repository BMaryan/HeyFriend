import React from "react";
import { ChangeProfilePictureContainer } from "../../../../utils/helperForProfile/helperForProfile";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AccountType } from "../../../../types/types";
import EditProfileReduxForm from "./EditProfileForm";
import styles from "./EditProfile.module.scss";
import Snackbar from "@mui/material/Snackbar";

interface EditProfilePropsType {
  account: AccountType | null;
  authError: string | null;
  loading: boolean;
  updateAccountThunk: (account: AccountType) => void;
}

export interface EditProfileFormDataType {
  edit_profile: string;
}

const EditProfile = (props: EditProfilePropsType) => {
  const [openModalAvatarProfile, setOpenModalAvatarProfile] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const onSubmit = (formData: EditProfileFormDataType) => {
    props.account && props.updateAccountThunk({ ...props.account, ...formData });
    setOpen(true);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert {...props} elevation={6} ref={ref} variant="filled" />;
  });

  return (
    <div className={styles.edit_profile}>
      <div className={styles.wrapper_profile_contact}>
        <div className={styles.wrapper_picture}>{props?.account?.avatar ? <img src={props.account.avatar} onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))} title="Change photo" alt="" /> : <img src={defaultAvatar} onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))} title="Change photo" alt="" />}</div>
        <div className={styles.wrapper_info}>
          <div className={styles.fullName}>{props?.account ? props.account.surname + " " + props.account.name : undefined}</div>
          <div className={styles.change_picture} onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}>
            Change profile photo
          </div>
        </div>
      </div>

      <EditProfileReduxForm authError={props.authError} loading={props.loading} onSubmit={onSubmit} />

      {/* toggle show snackBar */}
      <Snackbar open={open} autoHideDuration={7000} onClose={() => setOpen(false)}>
        <Alert severity="success">You were able to successfully edit the data!</Alert>
      </Snackbar>

      {/* toggle modal for change picture */}
      {openModalAvatarProfile ? <ChangeProfilePictureContainer account={props.account} openModalAvatarProfile={openModalAvatarProfile} setOpenModalAvatarProfile={setOpenModalAvatarProfile} updateAccountThunk={props.updateAccountThunk} /> : undefined}
    </div>
  );
};

export default EditProfile;
