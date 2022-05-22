/* eslint-disable no-unused-vars */
import React from "react";
import styles from "../Edit.module.scss";
import { reduxForm } from "redux-form";
import { WrapperCreateField, InputField, Textarea, WrapperButton } from "../../../common/FormControls/FormControls";
import { connect } from "react-redux";
import { validateEmail, validatePassword, required, validateFirstAndLastNameCreator } from "../../../../utils/FieldValidationForm/FieldValidationForm";

let validateFirstName = validateFirstAndLastNameCreator("first");
let validateLastName = validateFirstAndLastNameCreator("last");

const EditProfileForm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Name</div>
        <div className={styles.action}>
          <WrapperCreateField id="outlined-error-helper-text" name="name" type="text" label="Name" helperText="" placeholder="" validate={[validateFirstName]} component={InputField} />
        </div>
      </div>

      <div className={styles.wrapper_block}>
        <div className={styles.key}>Surname</div>
        <div className={styles.action}>
          <WrapperCreateField id="outlined-error-helper-text" name="surname" type="text" label="Surname" helperText="" placeholder="" validate={[validateLastName]} component={InputField} />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Email *</div>
        <div className={styles.action}>
          <WrapperCreateField id="outlined-error-helper-text" name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Status</div>
        <div className={styles.action}>
          <WrapperCreateField id="outlined-error-helper-text" name="status" type="text" label="Status" helperText="" placeholder="" validate={[]} component={InputField} />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>About</div>
        <div className={styles.action}>
          <WrapperCreateField id="outlined-error-helper-text" name="aboutMe" type="text" label="About me" helperText="" validate={[]} component={InputField} />
        </div>
      </div>

      <div className={styles.wrapper_button}>
        <WrapperButton {...props} button_text="Submit" isEditProfile={true} />
      </div>
    </form>
  );
};

const EditProfileReduxForm = reduxForm({ form: "edit_profile", enableReinitialize: true })(EditProfileForm);

const mapStateToProps = (state) => {
  return {
    initialValues: state?.profilePage?.account,
  };
};

export default connect(mapStateToProps, {})(EditProfileReduxForm);
