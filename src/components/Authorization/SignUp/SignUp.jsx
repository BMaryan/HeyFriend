/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styles from "./SignUp.module.css";
import commonStyle from "../Authorization.module.css";
import SignUpReduxForm from "./SignUpForm";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { Redirect } from "react-router";
import { profileConstant, signInConstant } from "../../../core/constants/constants";

const SignUp = (props) => {
  let onSubmit = (formData) => {
    if (formData) {
      props.signUp({ ...formData });
      // return Object.keys(formData).map((item) => (formData[item] = ""));
    }
  };

  return (
    <div className={commonStyle.authorization}>
      <div className={commonStyle.authorization_container}>
        <InformationContainer title={"Welcome Back!"} subtitle={"Don't have an account?"} linkTo={`${signInConstant}`} buttonText={"Sign In"} />
        <AuthorizationHelperContainer title={"Sign Up"} form={<SignUpReduxForm onSubmit={onSubmit} authError={props.authError} loading={props.loading} accounts={props.accounts} userSignUp={props.userSignUp} />} />
      </div>
    </div>
  );
};

export default SignUp;
