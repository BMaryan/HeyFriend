import React from "react";
import styles from "./SignUp.module.css";
import SignUpReduxForm from "./SignUpForm";
import { NavLink } from "react-router-dom";

const SignUp = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

	return (
		<div className={styles.signUp}>
			<div className={styles.signUp_content}>
				<div className={styles.welcome_box}>
					<div className={styles.welcome_text}>Welcome Back!</div>
					<div className={styles.have_account_text}>Don't have an account?</div>
					<div>
						<NavLink className={styles.navLink} to='/sign_in'>
							Sign In
						</NavLink>
					</div>
				</div>

				<div className={styles.signUp_box}>
					<div className={styles.form_tittle}>Sign Up</div>
					<SignUpReduxForm onSubmit={onSubmit} />
				</div>
			</div>
		</div>
	);
};

export default SignUp;
