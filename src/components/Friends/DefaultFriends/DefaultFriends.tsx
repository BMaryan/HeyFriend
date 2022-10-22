import React from "react";
import { FriendsIllustration } from "../../../assets/illustrations/FriendsIllustration";
import { heyFriendStyleConstant } from "../../../core/constants/constantsStyles";
import styles from "./DefaultFriends.module.scss";

interface DefaultFriendsPropsType {}

const DefaultFriends = (props: DefaultFriendsPropsType) => {
  return (
    <div className={styles.default_friends}>
      <div className={styles.title}>Friends</div>
      <FriendsIllustration height="40%" mainColor={heyFriendStyleConstant.first} minorColor={heyFriendStyleConstant.second} />
      <div className={styles.subtitle}>Choose what you want to show</div>
    </div>
  );
};

export default DefaultFriends;
