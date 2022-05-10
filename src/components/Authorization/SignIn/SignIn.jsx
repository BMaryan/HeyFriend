import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./SignIn.module.scss";
import commonStyle from "../Authorization.module.scss";
import SignInReduxForm from "./SignInForm";
import { mainConstant, signUpConstant } from "../../../core/constants/constants";
import Media from "react-media";
import { Redirect } from "react-router-dom";

const SignIn = (props) => {
  let onSubmit = (formData) => {
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
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm {...props} onSubmit={onSubmit} />} />
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} authSuccess={props.authSuccess} linkTo={`${signUpConstant.path}`} buttonText={"Sign Up"} />
              </>
            ) : (
              <>
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} authSuccess={props.authSuccess} linkTo={`${signUpConstant.path}`} buttonText={"Sign Up"} />
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm {...props} onSubmit={onSubmit} />} />
              </>
            )
          }
        </Media>
      </div>
    </div>
  );
};

export default SignIn;
