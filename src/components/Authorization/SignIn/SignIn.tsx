import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { mainConstant, signUpConstant } from "../../../core/constants/constants";
import commonStyle from "../Authorization.module.scss";
import { AccountType } from "../../../types/types";
import { Redirect } from "react-router-dom";
import SignInReduxForm from "./SignInForm";
import styles from "./SignIn.module.scss";
import Media from "react-media";

interface SignInPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  authSuccess: boolean;
  authError: string | null;
  loading: boolean;
  signIn: any;
}

export interface SignInFormDataType {
  sign_in: string;
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
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm authError={props.authError} loading={props.loading} onSubmit={onSubmit} />} />
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant.path}`} buttonText={"Sign Up"} authSuccess={props.authSuccess} />
              </>
            ) : (
              <>
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant.path}`} buttonText={"Sign Up"} authSuccess={props.authSuccess} />
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm authError={props.authError} loading={props.loading} onSubmit={onSubmit} />} />
              </>
            )
          }
        </Media>
      </div>
    </div>
  );
};

export default SignIn;
