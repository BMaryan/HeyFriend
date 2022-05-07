import React from "react";
import styles from "./Contacts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contacts = (props) => {
<<<<<<< HEAD
  let valueEmail = props.account && !props.id ? props.account.profile.email : props.otherProfile ? props.otherProfile.profile.email : undefined;

  return <div className={styles.contacts}>{props.account && props.account.profile && props.account.profile.email ? <ReturnEmail value={valueEmail} /> : undefined}</div>;
=======
  let valuePhoneOrEmail = props.account && !props.id ? props.account.profile.phone_or_email : props.otherProfile ? props.otherProfile.profile.phone_or_email : undefined;

  return <div className={styles.contacts}>{props.account && props.account.profile && props.account.profile.phone_or_email ? props.account.profile.phone_or_email.includes("@") ? <ReturnEmail value={valuePhoneOrEmail} /> : <ReturnPhone value={valuePhoneOrEmail} /> : undefined}</div>;
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
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

export default Contacts;
