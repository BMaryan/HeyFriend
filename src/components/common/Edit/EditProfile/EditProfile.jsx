import React from "react";
import { ChangeProfilePictureContainer } from "../../../../utils/helperForProfile/helperForProfile";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import EditProfileReduxForm from "./EditProfileForm";
import styles from "./EditProfile.module.scss";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EditProfile = (props) => {
  const [open, setOpen] = React.useState(false);
  let [openModalAvatarProfile, setOpenModalAvatarProfile] = React.useState(false);

  let onSubmit = (formData) => {
    props.updateAccountThunk({ ...props.account, ...formData });
    setOpen(true);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

      <EditProfileReduxForm onSubmit={onSubmit} account={props.account} />

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
