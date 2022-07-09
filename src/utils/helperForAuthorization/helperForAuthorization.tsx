import React from "react";
import styles from "./helperForAuthorization.module.scss";
import { NavLink } from "react-router-dom";

interface AuthorizationHelperContainerPropsType {
  title: string;
  form: React.ReactElement;
}

export const AuthorizationHelperContainer = (props: AuthorizationHelperContainerPropsType) => {
  return (
    <div className={styles.authorization_content}>
      <div className={styles.authorization_title}>{props.title}</div>
      {props.form}
    </div>
  );
};

interface InformationContainerPropsType {
  title: string;
  subtitle: string;
  linkTo: string;
  buttonText: string;
  authSuccess: any;
}

export const InformationContainer = (props: InformationContainerPropsType) => {
  return (
    <div className={styles.information_content}>
      <div className={styles.information_title}>{props.title}</div>
      <div className={styles.information_subtitle}>{props.subtitle}</div>
      <div>
        <NavLink className={styles.information_navLink} onClick={() => props.authSuccess()} to={props.linkTo}>
          {props.buttonText}
        </NavLink>
      </div>
    </div>
  );
};
