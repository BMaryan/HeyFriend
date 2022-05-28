import React from "react";
import styles from "./Review.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Review = (props) => {
  let valueEmail = props?.currentAccount?.data() ? props?.currentAccount?.data()?.email : undefined;

  return (
    <div className={styles.review}>
      <div className={styles.wrapper_item}>
        <div className={styles.title}>Login</div>
        <div className={styles.wrapper_content}>
          <div className={styles.value}>{props?.currentAccount?.data() ? props?.currentAccount?.data()?.surname + " " + props?.currentAccount?.data()?.name : undefined}</div>
        </div>
      </div>

      {props?.currentAccount?.data()?.email ? <ReturnEmail value={valueEmail} /> : undefined}
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
