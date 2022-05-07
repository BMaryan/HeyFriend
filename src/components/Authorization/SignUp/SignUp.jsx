/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styles from "./SignUp.module.scss";
import commonStyle from "../Authorization.module.scss";
import SignUpReduxForm from "./SignUpForm";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { Redirect } from "react-router";
import { profileConstant, signInConstant } from "../../../core/constants/constants";

const SignUp = (props) => {
  let onSubmit = (formData) => {
<<<<<<< HEAD
    if (formData) {
      props.signUp({ ...formData });
      // return Object.keys(formData).map((item) => (formData[item] = ""));
    }
  };

=======
    props.setUserSignUp(formData);

    if (formData) {
      props.isAccount({ id: props.accounts ? props.accounts.length + 1 : undefined, profile: { ...formData } });
    }
  };

  if (props.account && props.account.id) {
    return <Redirect to={`${profileConstant}`} />;
  }

>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
  return (
    <div className={commonStyle.authorization}>
      <div className={commonStyle.authorization_container}>
        <InformationContainer title={"Welcome Back!"} subtitle={"Don't have an account?"} linkTo={`${signInConstant}`} buttonText={"Sign In"} />
<<<<<<< HEAD
        <AuthorizationHelperContainer title={"Sign Up"} form={<SignUpReduxForm onSubmit={onSubmit} authError={props.authError} loading={props.loading} accounts={props.accounts} userSignUp={props.userSignUp} />} />
=======
        <AuthorizationHelperContainer title={"Sign Up"} form={<SignUpReduxForm onSubmit={onSubmit} accounts={props.accounts} userSignUp={props.userSignUp} />} />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
      </div>
    </div>
  );
};

export default SignUp;
