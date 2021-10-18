/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SignIn.module.css";
import commonStyles from "../Authorization.module.css";
import { reduxForm } from "redux-form";
import { WrapperCreateField, Input, WrapperButton } from "../../common/FormControls/FormControls";
import { validatePhoneNumberAndEmail, validatePassword, required } from "../../../utils/FieldValidationForm/FieldValidationForm";
import TextField from "@mui/material/TextField";
import { accounts } from "../../../core/constants/constantsLocalStorage";

const SignInForm = props => {
	return (
		<form className={commonStyles.form} onSubmit={props.handleSubmit}>
			<WrapperCreateField
				name='phone_or_email'
				type='text'
				validate={[validatePhoneNumberAndEmail, required]}
				component={Input}
				placeholder='Mobile Number or email'
			/>
			<WrapperCreateField name='password' type='password' validate={[validatePassword, required]} component={Input} placeholder='Password' />
			<WrapperCreateField name='rememberMe' type='checkbox' validate={[]} component={Input} placeholder='' text='Remember Me' />
			<WrapperButton {...props} button_text='SIGN IN' isSignIn={true} onClick={() => console.log("UY")} />
		</form>
	);
};

const SignInReduxForm = reduxForm({ form: "sign_in" })(SignInForm);

export default SignInReduxForm;
