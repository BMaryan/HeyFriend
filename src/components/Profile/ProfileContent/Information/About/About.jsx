import React from "react";
import styles from "./About.module.scss";

const About = (props) => {
  console.log(props);

  return (
    <div>
      <div className={styles.wrapper_item}>
        <div className={styles.title}>About me</div>
        {props?.currentAccount?.data()?.aboutMe ? <div>{props?.currentAccount?.data()?.aboutMe}</div> : undefined}
      </div>

      <div className={styles.wrapper_item}>
        <div className={styles.title}>Status</div>
        {props?.currentAccount?.data()?.status ? <div>{props?.currentAccount?.data()?.status}</div> : undefined}
      </div>
    </div>
  );
};

export default About;
