import React from "react";
import styles from "./Profile.module.scss";
import ProfileContent from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className={styles.profile}>
      <ProfileInfo accounts={props.accounts} addChat={props.addChat} getProfileData={props.getProfileData} id={props.id} account={props.account} chats={props.chats} setProfileChats={props.setProfileChats} following={props.following} unFollowing={props.unFollowing} />
<<<<<<< HEAD
      <ProfileContent accounts={props.accounts} account={props.account} auth={props.auth} setProfilePosts={props.setProfilePosts} id={props.id} getProfileData={props.getProfileData} createPost={props.createPost} />
=======
      <ProfileContent accounts={props.accounts} account={props.account} setProfilePosts={props.setProfilePosts} id={props.id} getProfileData={props.getProfileData} />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
    </div>
  );
};

export default Profile;
