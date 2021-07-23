/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SignIn.module.css";
import { reduxForm } from "redux-form";
import { wrapperCreateField, Input } from "../../common/FormControls/FormControls";
import { maxLengthCreator, phoneNumber } from "../../common/FormControls/validateForms";

const SignInForm = props => {
	console.log(props);

	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<div>Sign in</div>
			{wrapperCreateField("phone_or_email", "tel", [], Input, "Mobile Number or email")}
			{wrapperCreateField("password", "password", [], Input, "Password")}
			{wrapperCreateField("rememberMe", "checkbox", [], Input)}

			<button>Send</button>
		</form>
	);
};

const SignInReduxForm = reduxForm({ form: "sign_in" })(SignInForm);

export default SignInReduxForm;
