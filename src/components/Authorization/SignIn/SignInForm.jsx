import React from "react";
import styles from "./SignIn.module.scss";
import commonStyles from "../Authorization.module.scss";
import { reduxForm } from "redux-form";
import { WrapperCreateField, InputField, WrapperButton } from "../../common/FormControls/FormControls";
import { validateEmail, validatePassword, required } from "../../../utils/FieldValidationForm/FieldValidationForm";
import { connect } from "react-redux";

const SignInForm = (props) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <WrapperCreateField id="outlined-error-helper-text" name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
      <WrapperCreateField id="outlined-error-helper-text" name="password" type="password" label="Password" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />

      <div className={styles.wrapper_buttons}>
        <div>
          <WrapperButton {...props} button_text="Sign In" isSignIn={true} />
        </div>
      </div>
    </form>
  );
};

const SignInReduxForm = reduxForm({ form: "sign_in", enableReinitialize: true })(SignInForm);

const mapStateToProps = (state) => {
  return {
    initialValues: state?.auth?.defaultAccount?.profile,
  };
};

export default connect(mapStateToProps, {})(SignInReduxForm);
