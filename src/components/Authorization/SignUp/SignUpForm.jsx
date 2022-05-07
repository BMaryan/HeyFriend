/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styles from "./SignUp.module.scss";
import commonStyles from "../Authorization.module.scss";
import { reduxForm } from "redux-form";
import { WrapperCreateField, Input, WrapperButton, InputField } from "../../common/FormControls/FormControls";
import { accounts } from "../../../core/constants/constantsLocalStorage";
<<<<<<< HEAD
import { validateEmail, validatePassword, required, validateFirstAndLastNameCreator } from "../../../utils/FieldValidationForm/FieldValidationForm";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
=======
import { validatePhoneNumberAndEmail, validatePassword, required, validateFirstAndLastNameCreator } from "../../../utils/FieldValidationForm/FieldValidationForm";
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516

let validateFirstName = validateFirstAndLastNameCreator("first");
let validateLastName = validateFirstAndLastNameCreator("last");

const SignUpForm = (props) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
<<<<<<< HEAD
      <div className={styles.form__display_name}>
        <WrapperCreateField id="outlined-error-helper-text" name="name" type="text" label="Name" helperText="" placeholder="" validate={[validateFirstName, required]} component={InputField} />
        <WrapperCreateField id="outlined-error-helper-text" name="surname" type="text" label="Surname" helperText="" placeholder="" validate={[validateLastName, required]} component={InputField} />
      </div>

      <WrapperCreateField id="outlined-error-helper-text" name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
      <WrapperCreateField id="outlined-error-helper-text" name="password" type="password" label="Password" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />

      {/* {props.authError ? <div className={styles.form__auth_error}>{props.authError}</div> : null} */}

      <WrapperButton {...props} button_text="Sign Up" />
=======
      <WrapperCreateField name="name" type="text" validate={[validateFirstName, required]} component={Input} placeholder="Your name" />
      <WrapperCreateField name="surname" type="text" validate={[validateLastName, required]} component={Input} placeholder="Your surname" />
      <WrapperCreateField name="phone_or_email" type="text" validate={[validatePhoneNumberAndEmail, required]} component={Input} placeholder="Mobile Number or email" />
      <WrapperCreateField name="password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Password" />
      <WrapperButton {...props} button_text="Sign Up" isSignUp={true} />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
    </form>
  );
};

const SignUpReduxForm = reduxForm({ form: "sign_in" })(SignUpForm);

export default SignUpReduxForm;
