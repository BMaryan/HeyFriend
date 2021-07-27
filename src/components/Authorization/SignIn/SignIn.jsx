/* eslint-disable no-unused-vars */
import React from "react";
import { authorizationContainer, informationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./SignIn.module.css";
import commonStyle from "../Authorization.module.css";
import SignInReduxForm from "./SignInForm";

const SignIn = props => {
	console.log("SIGN IN", props);
	let onSubmit = formData => {
		props.setUserSignIn(formData);
		console.log(formData);
	};

	return (
		<div className={commonStyle.authorization}>
			<div className={commonStyle.authorization_container}>
				{authorizationContainer("Sign In", <SignInReduxForm onSubmit={onSubmit} />)}
				{informationContainer("Hello, Friend!", "Enter your personal details and start journey with us", "/sign_up", "Sign Up")}
			</div>
		</div>
	);
};

export default SignIn;
