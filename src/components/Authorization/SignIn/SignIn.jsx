import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
<<<<<<< HEAD
import commonStyle from "../Authorization.module.css";
=======
import styles from "./SignIn.module.scss";
import commonStyle from "../Authorization.module.scss";
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
import SignInReduxForm from "./SignInForm";
import { signUpConstant } from "../../../core/constants/constants";
import Media from "react-media";

const SignIn = (props) => {
  let onSubmit = (formData) => {
<<<<<<< HEAD
    if (formData) {
      props.signIn({ ...formData });

      // return Object.keys(formData).map((item) => (formData[item] = ""));
    }
  };

=======
    props.setUserSignIn(formData);

    if (formData) {
      props.accounts && props.accounts.find((profile) => (profile.profile.phone_or_email === formData.phone_or_email && profile.profile.password === formData.password ? props.isAccount({ ...profile }) : undefined));
    }
  };

  if (props.account && props.account.id) {
    return <Redirect to="/" />;
  }

>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
  return (
    <div className={commonStyle.authorization}>
      <div className={commonStyle.authorization_container}>
        <Media query={{ maxWidth: 767 }}>
          {(matches) =>
            !matches ? (
              <>
<<<<<<< HEAD
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm {...props} onSubmit={onSubmit} />} />
=======
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm onSubmit={onSubmit} {...props} />} />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant}`} buttonText={"Sign Up"} />
              </>
            ) : (
              <>
                <InformationContainer title={"Hello, Friend!"} subtitle={"Enter your personal details and start journey with us"} linkTo={`${signUpConstant}`} buttonText={"Sign Up"} />
<<<<<<< HEAD
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm {...props} onSubmit={onSubmit} />} />
=======
                <AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm onSubmit={onSubmit} {...props} />} />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
              </>
            )
          }
        </Media>
      </div>
    </div>
  );
};

export default SignIn;
