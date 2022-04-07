/* eslint-disable no-unused-vars */
import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./SignIn.module.css";
import commonStyle from "../Authorization.module.css";
import SignInReduxForm from "./SignInForm";
import { Redirect } from "react-router";
import { signUpConstant } from "../../../core/constants/constants";
import Media from "react-media";

const SignIn = (props) => {
  let onSubmit = (formData) => {
    if (formData) {
      props.signIn({ ...formData });

      return Object.keys(formData).map((item) => (formData[item] = ""));
    }
  };

  // if (props.account && props.account.id) {
  // 	return <Redirect to='/' />;
  // }

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
