import React from "react";
import commonStyle from "../Authorization.module.scss";
import SignUpReduxForm from "./SignUpForm";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { profileConstant, signInConstant } from "../../../core/constants/constants";
import { Redirect } from "react-router-dom";

const SignUp = (props) => {
  let onSubmit = (formData) => {
    if (formData) {
      console.log(formData);

      props.signUp({ ...formData });
      // return Object.keys(formData).map((item) => (formData[item] = ""));
    }
  };

  if (props.account && props.account.id) {
    return <Redirect to={`${profileConstant.path}/${props?.account?.id}`} />;
  }

  return (
    <div className={commonStyle.authorization}>
      <div className={commonStyle.authorization_container}>
        <InformationContainer title={"Welcome Back!"} subtitle={"Don't have an account?"} authSuccess={props.authSuccess} linkTo={`${signInConstant.path}`} buttonText={"Sign In"} />
        <AuthorizationHelperContainer title={"Sign Up"} form={<SignUpReduxForm onSubmit={onSubmit} loading={props.loading} accounts={props.accounts} authError={props.authError} userSignUp={props.userSignUp} />} />
      </div>
    </div>
  );
};

export default SignUp;
