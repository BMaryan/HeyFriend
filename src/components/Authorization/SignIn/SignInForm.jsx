/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SignIn.module.css";
import { reduxForm } from "redux-form";
import { wrapperCreateField, Input, wrapperButton } from "../../common/FormControls/FormControls";
import { maxLengthCreator, phoneNumber } from "../../common/FormControls/validateForms";

const SignInForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			{wrapperCreateField("phone_or_email", "text", [], Input, "Mobile Number or email")}
			{wrapperCreateField("password", "password", [], Input, "Password")}
			{wrapperCreateField("rememberMe", "checkbox", [], Input, "", "Remember Me")}
			{wrapperButton()}
		</form>
	);
};

const SignInReduxForm = reduxForm({ form: "sign_in" })(SignInForm);

export default SignInReduxForm;
