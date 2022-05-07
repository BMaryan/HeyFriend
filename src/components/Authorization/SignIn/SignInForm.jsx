import React from "react";
<<<<<<< HEAD
import commonStyles from "../Authorization.module.css";
=======
import styles from "./SignIn.module.scss";
import commonStyles from "../Authorization.module.scss";
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
import { reduxForm } from "redux-form";
import { WrapperCreateField, InputField, WrapperButton } from "../../common/FormControls/FormControls";
import { validateEmail, validatePassword, required } from "../../../utils/FieldValidationForm/FieldValidationForm";
// import Button from "@mui/material/Button";
// import { ModalDefaultAccounts } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { connect } from "react-redux";

const SignInForm = (props) => {
<<<<<<< HEAD
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <WrapperCreateField id="outlined-error-helper-text" name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
      <WrapperCreateField id="outlined-error-helper-text" name="password" type="password" label="Password" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />
      <WrapperButton {...props} button_text="Sign In" />

      {/* <div onClick={handleOpen} className={styles.wrapper_button}>
        <Button variant="contained">
          <span style={{ textTransform: "capitalize" }}>Default accounts</span>
        </Button>
      </div> */}

      {/* modal for autocomplete auth data */}
      {/* <ModalDefaultAccounts open={open} handleOpen={handleOpen} handleClose={handleClose} getDefaultAccount={props.getDefaultAccount} accounts={props.accounts} /> */}
=======
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <WrapperCreateField name="phone_or_email" type="text" validate={[validatePhoneNumberAndEmail, required]} component={Input} placeholder="Mobile Number or email" />
      <WrapperCreateField name="password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Password" />
      <WrapperCreateField name="rememberMe" type="checkbox" validate={[]} component={Input} placeholder="" text="Remember Me" />

      <div onClick={handleOpen} className={styles.wrapper_buttons}>
        <div>
          <WrapperButton {...props} button_text="Sign In" isSignIn={true} />
        </div>
        <div className={styles.wrapper_button}>
          <Button variant="contained">
            <span style={{ textTransform: "capitalize" }}>Default accounts</span>
          </Button>
        </div>
      </div>

      {/* modal for autocomplete auth data */}
      <ModalDefaultAccounts open={open} handleOpen={handleOpen} handleClose={handleClose} getDefaultAccount={props.getDefaultAccount} accounts={props.accounts} />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
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
