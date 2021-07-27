/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SignIn.module.css";
import { reduxForm } from "redux-form";
import { wrapperCreateField, Input, wrapperButton } from "../../common/FormControls/FormControls";
import { validatePhoneNumberAndEmail, validatePassword, required } from "../../../utils/FieldValidationForm/FieldValidationForm";

const SignInForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			{wrapperCreateField("phone_or_email", "text", [validatePhoneNumberAndEmail, required], Input, "Mobile Number or email", "")}
			{wrapperCreateField("password", "password", [validatePassword, required], Input, "Password")}
			{wrapperCreateField("rememberMe", "checkbox", [], Input, "", "Remember Me")}
			{wrapperButton("SIGN IN", { ...props })}
		</form>
	);
};

const SignInReduxForm = reduxForm({ form: "sign_in" })(SignInForm);

export default SignInReduxForm;
