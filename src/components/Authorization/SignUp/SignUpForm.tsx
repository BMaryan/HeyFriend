import React from "react";
import { validateEmail, validatePassword, required, validateFirstAndLastNameCreator } from "../../../utils/FieldValidationForm/FieldValidationForm";
import { WrapperCreateField, WrapperButton, InputField } from "../../common/FormControls/FormControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import commonStyles from "../Authorization.module.scss";
import { SignUpFormDataType } from "./SignUp";
import styles from "./SignUp.module.scss";

const validateFirstName = validateFirstAndLastNameCreator("first");
const validateLastName = validateFirstAndLastNameCreator("last");

interface SignUpFormPropsType {
  authError: string | null;
  loading: boolean;
}

const SignUpForm = (props: InjectedFormProps<SignUpFormDataType, SignUpFormPropsType> & SignUpFormPropsType) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <div className={styles.form__display_name}>
        <WrapperCreateField name="name" type="text" label="Name" helperText="" placeholder="" validate={[validateFirstName, required]} component={InputField} />
        <WrapperCreateField name="surname" type="text" label="Surname" helperText="" placeholder="" validate={[validateLastName, required]} component={InputField} />
      </div>

      <WrapperCreateField name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
      <WrapperCreateField name="password" type="password" label="Password" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />

      <WrapperButton authError={props.authError} loading={props.loading} button_text="Sign Up" invalid={props.invalid} submitting={props.submitting} anyTouched={props.anyTouched} dirty={props.dirty} />
    </form>
  );
};

const SignUpReduxForm = reduxForm<SignUpFormDataType, SignUpFormPropsType>({ form: "sign_up" })(SignUpForm);

export default SignUpReduxForm;
