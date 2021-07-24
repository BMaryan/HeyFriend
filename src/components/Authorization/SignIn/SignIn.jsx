/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SignIn.module.css";
import SignInReduxForm from "./SignInForm";

const SignIn = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

	return (
		<div className={styles.signIn}>
			<div className={styles.signIn_content}>
				<div className={styles.signIn_box}>
					<div className={styles.form_tittle}>Sign In</div>
					<SignInReduxForm onSubmit={onSubmit} />
				</div>

				<div className={styles.welcome_box}>
					<div className={styles.welcome_text}>Hello, Friend!</div>
					<div className={styles.have_account_text}>Enter your personal details and start journey with us</div>
					<div>
						<NavLink className={styles.navLink} to='/sign_up'>
							Sign Up
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
