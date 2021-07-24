/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SignUp.module.css";
import { reduxForm } from "redux-form";
import { wrapperCreateField, Input, wrapperButton } from "../../common/FormControls/FormControls";

const SignUpForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			{wrapperCreateField("name", "text", [], Input, "Your name")}
			{wrapperCreateField("surname", "text", [], Input, "Your surname")}
			{wrapperCreateField("phone_or_email", "text", [], Input, "Mobile Number or email")}
			{wrapperCreateField("password", "password", [], Input, "Password")}
			{wrapperButton("SIGN UP")}
		</form>
	);
};

const SignUpReduxForm = reduxForm({ form: "sign_in" })(SignUpForm);

export default SignUpReduxForm;
