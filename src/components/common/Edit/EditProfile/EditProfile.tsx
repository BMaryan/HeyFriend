import React from "react";
import { ChangeProfilePictureContainer } from "../../../../utils/helperForProfile/helperForProfile";
import CustomSnackbar from "../../../molecules/Snackbar/Snackbar";
import CustomAvatar from "../../../atoms/Avatar/Avatar";
import { AccountType } from "../../../../types/types";
import EditProfileReduxForm from "./EditProfileForm";
import styles from "./EditProfile.module.scss";
import { auth } from "../../../../firebase";
import { updateEmail } from "firebase/auth";

interface EditProfilePropsType {
  account: AccountType | null;
  authError: string | null;
  loading: boolean;
  updateAccountThunk: (account: AccountType) => void;
}

export interface EditProfileFormDataType {
  name: string;
  surname: string;
  email: string;
  status: string;
  aboutMe: string;
}

const EditProfile = (props: EditProfilePropsType) => {
  const [openModalAvatarProfile, setOpenModalAvatarProfile] = React.useState(false);
  const [error, setError] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const onSubmit = (formData: EditProfileFormDataType) => {
    auth.currentUser &&
      updateEmail(auth.currentUser, formData.email)
        .then(() => {
          handleClick();
          props.account && props.updateAccountThunk({ ...props.account, ...formData });
        })
        .catch((error) => {
          setError(error);
          handleClick();
        });
  };

  return (
    <div className={styles.edit_profile}>
      <div className={styles.wrapper_profile_contact}>
        <div className={styles.wrapper_picture}>{props?.account?.avatar && <CustomAvatar avatarData={props.account} title="Change photo" onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))} />}</div>
        <div className={styles.wrapper_info}>
          <div className={styles.fullName}>{props?.account ? props.account.surname + " " + props.account.name : undefined}</div>
          <div className={styles.change_picture} onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}>
            Change profile photo
          </div>
        </div>
      </div>

      <EditProfileReduxForm authError={props.authError} loading={props.loading} onSubmit={onSubmit} />

      {/* toggle show snackBar */}
      <CustomSnackbar open={open} message={error ? error?.message : "You were able to successfully edit the data!"} severity={error ? "error" : "success"} setOpen={setOpen} />

      {/* toggle modal for change picture */}
      {openModalAvatarProfile ? <ChangeProfilePictureContainer account={props.account} openModalAvatarProfile={openModalAvatarProfile} setOpenModalAvatarProfile={setOpenModalAvatarProfile} updateAccountThunk={props.updateAccountThunk} /> : undefined}
    </div>
  );
};

export default EditProfile;
