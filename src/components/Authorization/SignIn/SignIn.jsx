/* eslint-disable no-unused-vars */
import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./SignIn.module.css";
import commonStyle from "../Authorization.module.css";
import SignInReduxForm from "./SignInForm";
import { Redirect } from "react-router";
import { signUpConstant } from "../../../core/constants/constants";

const SignIn = props => {
	let onSubmit = formData => {
		props.setUserSignIn(formData);

		if (formData) {
			props.accounts &&
				props.accounts.find(profile => {
					if (profile.profile.phone_or_email === formData.phone_or_email && profile.profile.password === formData.password) {
						props.isAccount({ ...profile });
					}
				});
		}
	};

	if (props.account && props.account.id) {
		return <Redirect to='/' />;
	}

	return (
		<div className={commonStyle.authorization}>
			<div className={commonStyle.authorization_container}>
				<AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm onSubmit={onSubmit} {...props} />} />
				<InformationContainer
					title={"Hello, Friend!"}
					subtitle={"Enter your personal details and start journey with us"}
					linkTo={`${signUpConstant}`}
					buttonText={"Sign Up"}
				/>
			</div>
		</div>
	);
};

export default SignIn;
