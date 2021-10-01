/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SignIn.module.css";
import commonStyles from "../Authorization.module.css";
import { reduxForm } from "redux-form";
import { WrapperCreateField, Input, wrapperButton } from "../../common/FormControls/FormControls";
import {
	validatePhoneNumberAndEmail,
	validatePassword,
	required,
	validateAuthorizationUserCreator,
	validateFindTheSameUserCreator,
} from "../../../utils/FieldValidationForm/FieldValidationForm";
import TextField from "@mui/material/TextField";
import { accounts } from "../../../core/constants/constantsLocalStorage";

let validateFindTheSameUser = validateFindTheSameUserCreator(JSON.parse(localStorage.getItem(accounts)));

const SignInForm = props => {
	return (
		<form className={commonStyles.form} onSubmit={props.handleSubmit}>
			{WrapperCreateField("phone_or_email", "text", [validatePhoneNumberAndEmail, required], Input, "Mobile Number or email", "")}
			{WrapperCreateField("password", "password", [validatePassword, required], Input, "Password")}
			{WrapperCreateField("rememberMe", "checkbox", [], Input, "", "Remember Me")}
			{wrapperButton("SIGN IN", { ...props })}
		</form>
	);
};

const SignInReduxForm = reduxForm({ form: "sign_in" })(SignInForm);

export default SignInReduxForm;
