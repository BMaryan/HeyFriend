/* eslint-disable no-unused-vars */
import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./SignIn.module.scss";
import commonStyle from "../Authorization.module.scss";
import SignInReduxForm from "./SignInForm";
import { Redirect } from "react-router";
import { signUpConstant } from "../../../core/constants/constants";
import Media from "react-media";

const SignIn = (props) => {
  let onSubmit = (formData) => {
    props.setUserSignIn(formData);

    if (formData) {
      props.accounts && props.accounts.find((profile) => (profile.profile.phone_or_email === formData.phone_or_email && profile.profile.password === formData.password ? props.isAccount({ ...profile }) : undefined));
    }
  };

  if (props.account && props.account.id) {
    return <Redirect to="/" />;
  }

  return (
    <div className={commonStyle.authorization}>
      <div className={commonStyle.authorization_container}>
        <Media query={{ maxWidth: 767 }}>
          {(matches) =>
            !matches ? (
              <>
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm onSubmit={onSubmit} {...props} />} />
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant}`} buttonText={"Sign Up"} />
              </>
            ) : (
              <>
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant}`} buttonText={"Sign Up"} />
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm onSubmit={onSubmit} {...props} />} />
              </>
            )
          }
        </Media>
      </div>
    </div>
  );
};

export default SignIn;
