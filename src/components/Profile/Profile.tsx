import React from "react";
import { ProfileContainerPropsType } from "./ProfileContainer";
import ProfileContent from "./ProfileContent/ProfileContent";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.scss";

interface ProfilePropsType extends ProfileContainerPropsType {
  id: string;
}

const Profile = (props: ProfilePropsType) => {
  return (
    <div className={styles.profile}>
      <ProfileInfo accounts={props.accounts} account={props.account} posts={props.posts} chats={props.chats} id={props.id} updateAccountThunk={props.updateAccountThunk} createChatThunk={props.createChatThunk} />
      <ProfileContent accounts={props.accounts} account={props.account} posts={props.posts} id={props.id} />
    </div>
  );
};

export default Profile;
