import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { mainConstant, signUpConstant } from "../../../core/constants/constants";
import { AccountType, FirebaseType, SignType } from "../../../types/types";
import commonStyle from "../Authorization.module.scss";
import { Redirect } from "react-router-dom";
import SignInReduxForm from "./SignInForm";
import Media from "react-media";

interface SignInPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  authSuccess: () => void;
  authError: string | null;
  loading: boolean;
  signIn: (credentials: SignType) => void;
}

export interface SignInFormDataType {
  email: string;
  password: string;
}

const SignIn = (props: SignInPropsType) => {
  const onSubmit = (formData: SignInFormDataType) => {
    if (formData) {
      props.signIn({ ...formData });

      // return Object.keys(formData).map((item) => (formData[item] = ""));
    }
  };

  if (props.account && props.account.id) {
    return <Redirect to={mainConstant.path} />;
  }

  return (
    <div className={commonStyle.authorization}>
      <div className={commonStyle.authorization_container}>
        <Media query={{ maxWidth: 767 }}>
          {(matches) =>
            !matches ? (
              <>
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm accounts={props.accounts} authError={props.authError} loading={props.loading} signIn={props.signIn} onSubmit={onSubmit} />} />
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant.path}`} buttonText={"Sign Up"} authSuccess={props.authSuccess} />
              </>
            ) : (
              <>
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant.path}`} buttonText={"Sign Up"} authSuccess={props.authSuccess} />
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm accounts={props.accounts} authError={props.authError} loading={props.loading} signIn={props.signIn} onSubmit={onSubmit} />} />
              </>
            )
          }
        </Media>
      </div>
    </div>
  );
};

export default SignIn;
