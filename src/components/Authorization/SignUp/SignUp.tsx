import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { profileConstant, signInConstant } from "../../../core/constants/constants";
import { AccountType, SignType } from "../../../types/types";
import commonStyle from "../Authorization.module.scss";
import { Redirect } from "react-router-dom";
import SignUpReduxForm from "./SignUpForm";

interface SignUpPropsType {
  account: AccountType | null;
  loading: boolean;
  authError: string | null;
  authSuccess: () => void;
  signUp: (credentials: SignType) => void;
}

export interface SignUpFormDataType {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const SignUp = (props: SignUpPropsType) => {
  const onSubmit = (formData: SignUpFormDataType) => {
    if (formData) {
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
        <AuthorizationHelperContainer title={"Sign Up"} form={<SignUpReduxForm authError={props.authError} loading={props.loading} onSubmit={onSubmit} />} />
      </div>
    </div>
  );
};

export default SignUp;
