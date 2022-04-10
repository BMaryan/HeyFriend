/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./SignIn.module.css";
import commonStyles from "../Authorization.module.css";
import { reduxForm } from "redux-form";
import { WrapperCreateField, InputField, WrapperButton } from "../../common/FormControls/FormControls";
import { validateEmail, validatePassword, required } from "../../../utils/FieldValidationForm/FieldValidationForm";
import Button from "@mui/material/Button";
import { ModalDefaultAccounts } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { connect } from "react-redux";

const SignInForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <WrapperCreateField id="outlined-error-helper-text" name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
      <WrapperCreateField id="outlined-error-helper-text" name="password" type="password" label="Password" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />
      <WrapperButton {...props} button_text="Sign In" isSignIn={true} />

      {/* <div onClick={handleOpen} className={styles.wrapper_button}>
        <Button variant="contained">
          <span style={{ textTransform: "capitalize" }}>Default accounts</span>
        </Button>
      </div> */}

      {/* modal for autocomplete auth data */}
      {/* <ModalDefaultAccounts open={open} handleOpen={handleOpen} handleClose={handleClose} getDefaultAccount={props.getDefaultAccount} accounts={props.accounts} /> */}
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
