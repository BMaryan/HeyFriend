import React from "react";
import { validateEmail, validatePassword, required } from "../../../utils/FieldValidationForm/FieldValidationForm";
import { WrapperCreateField, InputField, WrapperButton } from "../../common/FormControls/FormControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import commonStyles from "../Authorization.module.scss";
import { SignInFormDataType } from "./SignIn";
import styles from "./SignIn.module.scss";

interface SignInFormPropsType {
  authError: string | null;
  loading: boolean;
}

const SignInForm = (props: InjectedFormProps<SignInFormDataType, SignInFormPropsType> & SignInFormPropsType) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <WrapperCreateField name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
      <WrapperCreateField name="password" type="password" label="Password" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />

      <div className={styles.wrapper_buttons}>
        <WrapperButton authError={props.authError} loading={props.loading} button_text="Sign In" invalid={props.invalid} submitting={props.submitting} anyTouched={props.anyTouched} dirty={props.dirty} />
      </div>
    </form>
  );
};

const SignInReduxForm = reduxForm<SignInFormDataType, SignInFormPropsType>({ form: "sign_in" })(SignInForm);

export default SignInReduxForm;
