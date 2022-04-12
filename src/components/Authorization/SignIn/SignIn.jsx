import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import commonStyle from "../Authorization.module.css";
import SignInReduxForm from "./SignInForm";
import { signUpConstant } from "../../../core/constants/constants";
import Media from "react-media";

const SignIn = (props) => {
  let onSubmit = (formData) => {
    if (formData) {
      props.signIn({ ...formData });

      // return Object.keys(formData).map((item) => (formData[item] = ""));
    }
  };

  return (
    <div className={commonStyle.authorization}>
      <div className={commonStyle.authorization_container}>
        <Media query={{ maxWidth: 767 }}>
          {(matches) =>
            !matches ? (
              <>
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm {...props} onSubmit={onSubmit} />} />
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant}`} buttonText={"Sign Up"} />
              </>
            ) : (
              <>
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant}`} buttonText={"Sign Up"} />
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
