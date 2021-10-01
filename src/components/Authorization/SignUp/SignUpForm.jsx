/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styles from "./SignUp.module.css";
import commonStyles from "../Authorization.module.css";
import { reduxForm } from "redux-form";
import { WrapperCreateField, Input, wrapperButton } from "../../common/FormControls/FormControls";
import { accounts } from "../../../core/constants/constantsLocalStorage";
import {
	validatePhoneNumberAndEmail,
	validatePassword,
	required,
	validateFirstAndLastNameCreator,
	validateFindTheSameUserCreator,
} from "../../../utils/FieldValidationForm/FieldValidationForm";

let validateFirstName = validateFirstAndLastNameCreator("first");
let validateLastName = validateFirstAndLastNameCreator("last");
let validateFindTheSameUser = validateFindTheSameUserCreator(JSON.parse(localStorage.getItem(accounts)));

const SignUpForm = props => {
	return (
		<form className={commonStyles.form} onSubmit={props.handleSubmit}>
			{WrapperCreateField("name", "text", [validateFirstName, required], Input, "Your name")}
			{WrapperCreateField("surname", "text", [validateLastName, required], Input, "Your surname")}
			{WrapperCreateField(
				"phone_or_email",
				"text",
				[validatePhoneNumberAndEmail, required, validateFindTheSameUser],
				Input,
				"Mobile Number or email"
			)}
			{WrapperCreateField("password", "password", [validatePassword, required], Input, "Password")}
			{wrapperButton("SIGN UP", { ...props })}
		</form>
	);
};

const SignUpReduxForm = reduxForm({ form: "sign_in" })(SignUpForm);

export default SignUpReduxForm;
