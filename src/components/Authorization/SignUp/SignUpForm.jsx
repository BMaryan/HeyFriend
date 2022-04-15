/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styles from "./SignUp.module.scss";
import commonStyles from "../Authorization.module.scss";
import { reduxForm } from "redux-form";
import { WrapperCreateField, Input, WrapperButton } from "../../common/FormControls/FormControls";
import { accounts } from "../../../core/constants/constantsLocalStorage";
import { validatePhoneNumberAndEmail, validatePassword, required, validateFirstAndLastNameCreator } from "../../../utils/FieldValidationForm/FieldValidationForm";

let validateFirstName = validateFirstAndLastNameCreator("first");
let validateLastName = validateFirstAndLastNameCreator("last");

const SignUpForm = (props) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <WrapperCreateField name="name" type="text" validate={[validateFirstName, required]} component={Input} placeholder="Your name" />
      <WrapperCreateField name="surname" type="text" validate={[validateLastName, required]} component={Input} placeholder="Your surname" />
      <WrapperCreateField name="phone_or_email" type="text" validate={[validatePhoneNumberAndEmail, required]} component={Input} placeholder="Mobile Number or email" />
      <WrapperCreateField name="password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Password" />
      <WrapperButton {...props} button_text="Sign Up" isSignUp={true} />
    </form>
  );
};

const SignUpReduxForm = reduxForm({ form: "sign_in" })(SignUpForm);

export default SignUpReduxForm;
