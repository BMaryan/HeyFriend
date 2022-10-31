import React from "react";
import { SignInIllustration } from "../../assets/illustrations/SignInIllustration";
import { signInConstant, signUpConstant } from "../../core/constants/constants";
import styles from "./helperForAuthorization.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NavLink, useHistory } from "react-router-dom";
import { SignUpIllustration } from "../../assets/illustrations/SignUpIllustration";
import { heyFriendStyleConstant } from "../../core/constants/constantsStyles";

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
  authSuccess: () => void;
}

export const InformationContainer = (props: InformationContainerPropsType) => {
  const history = useHistory();
  const matches = useMediaQuery("(max-width:575px)");
  const checkSignIn = history.location.pathname.includes(signInConstant.path);
  const checkSignUp = history.location.pathname.includes(signUpConstant.path);

  return (
    <div className={styles.information_content}>
      <div className={styles.information_title}>{props.title}</div>
      {matches && checkSignIn ? <SignInIllustration height="100%" width="80%" mainColor={heyFriendStyleConstant.first} /> : matches && checkSignUp && <SignUpIllustration height="100%" width="80%" mainColor={heyFriendStyleConstant.first} />}
      <div className={styles.information_subtitle}>{props.subtitle}</div>
      <div>
        <NavLink className={styles.information_navLink} onClick={() => props.authSuccess()} to={props.linkTo}>
          {props.buttonText}
        </NavLink>
      </div>
    </div>
  );
};
