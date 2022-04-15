import React from "react";
import styles from "./Review.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

const Review = (props) => {
  let valuePhoneOrEmail = props.account && !props.id ? props.account.profile.phone_or_email : props.otherProfile ? props.otherProfile.profile.phone_or_email : undefined;

  return (
    <div className={styles.review}>
      <div className={styles.wrapper_item}>
        <div className={styles.title}>Login</div>
        <div className={styles.wrapper_content}>
          <div className={styles.value}>{!props.id ? props.account.profile.surname + " " + props.account.profile.name : props.otherProfile ? props.otherProfile.profile.surname + " " + props.otherProfile.profile.name : undefined}</div>
        </div>
      </div>

      {props.account && props.account.profile && props.account.profile.phone_or_email ? props.account.profile.phone_or_email.includes("@") ? <ReturnEmail value={valuePhoneOrEmail} /> : <ReturnPhone value={valuePhoneOrEmail} /> : undefined}
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

let ReturnPhone = (props) => {
  return (
    <div className={styles.wrapper_item}>
      <div className={styles.title}>Phone number</div>
      <div className={styles.wrapper_content}>
        <div>
          <FontAwesomeIcon className={styles.icon} icon={faPhoneAlt} />
        </div>
        <div className={styles.value}>{props.value}</div>
      </div>
    </div>
  );
};

export default Review;
