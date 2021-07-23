import React from "react";
import styles from "./SignIn.module.css";
import SignInReduxForm from "./SignInForm";

const SignIn = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

	return (
		<div className={styles.sign_in}>
			<SignInReduxForm onSubmit={onSubmit} />
		</div>
	);
};

export default SignIn;
