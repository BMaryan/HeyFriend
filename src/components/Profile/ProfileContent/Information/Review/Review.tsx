import React from "react";
import { AccountType, FirebaseType } from "../../../../../types/types";
import styles from "./Review.module.scss";

interface ReviewPropsType {
  currentAccount: FirebaseType<AccountType> | undefined;
}

interface ReturnEmailPropsType {
  value: any;
}

const ReturnEmail = (props: ReturnEmailPropsType) => {
  return (
    <div className={styles.wrapper_item}>
      <div className={styles.title}>Email</div>
      <div className={styles.wrapper_content}>
        <div>{/* <FontAwesomeIcon className={styles.icon} icon={faEnvelope} /> */}</div>
        <div className={styles.value}>{props.value}</div>
      </div>
    </div>
  );
};

const Review = (props: ReviewPropsType) => {
  const valueEmail: string | undefined = props?.currentAccount?.data() ? props?.currentAccount?.data()?.email : undefined;

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

export default Review;
