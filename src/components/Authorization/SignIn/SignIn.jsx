/* eslint-disable no-unused-vars */
import React from "react";
import { AuthorizationContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./SignIn.module.css";
import commonStyle from "../Authorization.module.css";
import SignInReduxForm from "./SignInForm";

const SignIn = props => {
	let onSubmit = formData => {
		props.setUserSignIn(formData);

		if (formData) {
			props.users.find(user => {
				if (formData && formData.phone_or_email) {
					if (user.phone_or_email === formData.phone_or_email && user.password === formData.password) {
						props.checkAuthorization(user);
						return user;
					}
				}
			});
		}
		console.log(formData);
	};

	return (
		<div className={commonStyle.authorization}>
			<div className={commonStyle.authorization_container}>
				{AuthorizationContainer("Sign In", <SignInReduxForm onSubmit={onSubmit} {...props} />)}
				{InformationContainer("Hello, Friend!", "Enter your personal details and start journey with us", "/sign_up", "Sign Up")}
			</div>
		</div>
	);
};

export default SignIn;
