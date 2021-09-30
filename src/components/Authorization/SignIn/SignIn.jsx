/* eslint-disable no-unused-vars */
import React from "react";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./SignIn.module.css";
import commonStyle from "../Authorization.module.css";
import SignInReduxForm from "./SignInForm";
import { Redirect } from "react-router";

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
		console.log(formData);
	};

	if (props.account && props.account.id) {
		return <Redirect to='/' />;
	}

	return (
		<div className={commonStyle.authorization}>
			<div className={props.toggleShowSign ? commonStyle.authorization_container : commonStyle.authorization_container_position}>
				<AuthorizationHelperContainer title={"Sign In"} form={<SignInReduxForm onSubmit={onSubmit} {...props} />} />
				<InformationContainer
					title={"Hello, Friend!"}
					subtitle={"Enter your personal details and start journey with us"}
					linkTo={"/authorization"}
					buttonText={"Sign Up"}
					setToggleShowSign={props.setToggleShowSign}
				/>
			</div>
		</div>
	);
};

export default SignIn;
