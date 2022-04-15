import React from "react";
import styles from "./Profile.module.css";
import ProfileContent from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className={styles.profile}>
      <ProfileInfo accounts={props.accounts} addChat={props.addChat} getProfileData={props.getProfileData} id={props.id} account={props.account} chats={props.chats} setProfileChats={props.setProfileChats} following={props.following} unFollowing={props.unFollowing} />
      <ProfileContent accounts={props.accounts} account={props.account} auth={props.auth} setProfilePosts={props.setProfilePosts} id={props.id} getProfileData={props.getProfileData} createPost={props.createPost} />
    </div>
  );
};

export default Profile;
