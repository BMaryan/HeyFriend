/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from "react";
import { AuthorizationContainer, informationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./SignIn.module.css";
import commonStyle from "../Authorization.module.css";
import SignInReduxForm from "./SignInForm";
import { Redirect } from "react-router-dom";

const SignIn = props => {
	let onSubmit = formData => {
		props.setUserSignIn(formData);
	};

	let profileUser = props.users.find(user => {
		if (user.phone_or_email === props.userSignIn.phone_or_email && user.password === props.userSignIn.password) {
			localStorage.setItem("profileAuthorizationData", JSON.stringify(user));
			return user;
		}
	});

	if (profileUser) {
		let profileUser = JSON.parse(localStorage.getItem("profileAuthorizationData"));
		props.checkAuthorization(profileUser);
	}

	if (props.profileAuthorizationData) {
		return <Redirect to='/profile' />;
	}

	return (
		<div className={commonStyle.authorization}>
			<div className={commonStyle.authorization_container}>
				{AuthorizationContainer("Sign In", <SignInReduxForm onSubmit={onSubmit} />)}
				{informationContainer("Hello, Friend!", "Enter your personal details and start journey with us", "/sign_up", "Sign Up")}
			</div>
		</div>
	);
};

export default SignIn;
