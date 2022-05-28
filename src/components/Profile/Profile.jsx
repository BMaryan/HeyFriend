import React from "react";
import styles from "./Profile.module.scss";
import ProfileContent from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className={styles.profile}>
      <ProfileInfo {...props} />
      <ProfileContent {...props} />
    </div>
  );
};

export default Profile;
