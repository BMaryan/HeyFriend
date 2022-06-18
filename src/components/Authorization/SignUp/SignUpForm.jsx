/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styles from "./SignUp.module.scss";
import commonStyles from "../Authorization.module.scss";
import { reduxForm } from "redux-form";
import { WrapperCreateField, Input, WrapperButton, InputField } from "../../common/FormControls/FormControls";
import { validateEmail, validatePassword, required, validateFirstAndLastNameCreator } from "../../../utils/FieldValidationForm/FieldValidationForm";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
let validateFirstName = validateFirstAndLastNameCreator("first");
let validateLastName = validateFirstAndLastNameCreator("last");

const SignUpForm = (props) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <div className={styles.form__display_name}>
        <WrapperCreateField id="outlined-error-helper-text" name="name" type="text" label="Name" helperText="" placeholder="" validate={[validateFirstName, required]} component={InputField} />
        <WrapperCreateField id="outlined-error-helper-text" name="surname" type="text" label="Surname" helperText="" placeholder="" validate={[validateLastName, required]} component={InputField} />
      </div>

      <WrapperCreateField id="outlined-error-helper-text" name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
      <WrapperCreateField id="outlined-error-helper-text" name="password" type="password" label="Password" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />

      <WrapperButton {...props} button_text="Sign Up" />
    </form>
  );
};

const SignUpReduxForm = reduxForm({ form: "sign_in" })(SignUpForm);

export default SignUpReduxForm;
