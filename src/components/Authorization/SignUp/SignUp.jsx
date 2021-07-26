/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SignUp.module.css";
import commonStyle from "../Authorization.module.css";
import SignUpReduxForm from "./SignUpForm";
import { authorizationContainer, informationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";

const SignUp = props => {
	console.log(props);
	let onSubmit = formData => {
		console.log(formData);
	};

	return (
		<div className={commonStyle.authorization}>
			<div className={commonStyle.authorization_container}>
				{informationContainer("Welcome Back!", "Don't have an account?", "/sign_in", "Sign In")}
				{authorizationContainer("Sign Up", <SignUpReduxForm onSubmit={onSubmit} />)}
			</div>
		</div>
	);
};

export default SignUp;
