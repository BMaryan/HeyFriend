import React from "react";
import styles from "./Review.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Review = (props) => {
  let valueEmail = props.account && !props.id ? props.account.profile.email : props.otherProfile ? props.otherProfile.profile.email : undefined;

  return (
    <div className={styles.review}>
      <div className={styles.wrapper_item}>
        <div className={styles.title}>Login</div>
        <div className={styles.wrapper_content}>
          <div className={styles.value}>{!props.id ? props.account.profile.surname + " " + props.account.profile.name : props.otherProfile ? props.otherProfile.profile.surname + " " + props.otherProfile.profile.name : undefined}</div>
        </div>
      </div>

      {props.account && props.account.profile && props.account.profile.email ? <ReturnEmail value={valueEmail} /> : undefined}
    </div>
  );
};

let ReturnEmail = (props) => {
  return (
    <div className={styles.wrapper_item}>
      <div className={styles.title}>Email</div>
      <div className={styles.wrapper_content}>
        <div>
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
        </div>
        <div className={styles.value}>{props.value}</div>
      </div>
    </div>
  );
};

export default Review;
