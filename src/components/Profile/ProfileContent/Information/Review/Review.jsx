import React from "react";
import styles from "./Review.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Review = (props) => {
<<<<<<< HEAD
  let valueEmail = props.account && !props.id ? props.account.profile.email : props.otherProfile ? props.otherProfile.profile.email : undefined;
=======
  let valuePhoneOrEmail = props.account && !props.id ? props.account.profile.phone_or_email : props.otherProfile ? props.otherProfile.profile.phone_or_email : undefined;
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516

  return (
    <div className={styles.review}>
      <div className={styles.wrapper_item}>
        <div className={styles.title}>Login</div>
        <div className={styles.wrapper_content}>
          <div className={styles.value}>{!props.id ? props.account.profile.surname + " " + props.account.profile.name : props.otherProfile ? props.otherProfile.profile.surname + " " + props.otherProfile.profile.name : undefined}</div>
        </div>
      </div>

<<<<<<< HEAD
      {props.account && props.account.profile && props.account.profile.email ? <ReturnEmail value={valueEmail} /> : undefined}
=======
      {props.account && props.account.profile && props.account.profile.phone_or_email ? props.account.profile.phone_or_email.includes("@") ? <ReturnEmail value={valuePhoneOrEmail} /> : <ReturnPhone value={valuePhoneOrEmail} /> : undefined}
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
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
<<<<<<< HEAD
=======
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
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
};

export default Review;
