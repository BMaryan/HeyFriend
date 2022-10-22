import React from "react";
import { SettingsIllustration } from "../../../../assets/illustrations/SettingsIllustration";
import { heyFriendStyleConstant } from "../../../../core/constants/constantsStyles";
import styles from "./Default.module.scss";

interface DefaultPropsType {}

const Default = (props: DefaultPropsType) => {
  return (
    <div className={styles.default}>
      <div className={styles.title}>Your editor</div>
      <SettingsIllustration height="40%" mainColor={heyFriendStyleConstant.first} minorColor={heyFriendStyleConstant.second} />
      <div className={styles.subtitle}>Choose what you want to edit</div>
    </div>
  );
};

export default Default;
