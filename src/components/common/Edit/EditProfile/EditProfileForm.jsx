/* eslint-disable no-unused-vars */
import React from "react";
import styles from "../Edit.module.css";
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
          <WrapperCreateField name="name" type="text" validate={[validateFirstName]} component={InputField} placeholder="Your name" />
        </div>
      </div>

      <div className={styles.wrapper_block}>
        <div className={styles.key}>Surname</div>
        <div className={styles.action}>
          <WrapperCreateField name="surname" type="text" validate={[validateLastName]} component={InputField} placeholder="Your surname" />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Email *</div>
        <div className={styles.action}>
          <WrapperCreateField name="email" type="text" validate={[validateEmail, required]} component={InputField} placeholder="Your email *" />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Status</div>
        <div className={styles.action}>
          <WrapperCreateField name="status" type="text" validate={[]} component={InputField} placeholder="Your status" />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>About</div>
        <div className={styles.action}>
          <WrapperCreateField name="aboutMe" type="text" validate={[]} component={Textarea} placeholder="About you" />
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
    initialValues: state?.profilePage?.account?.profile,
  };
};

export default connect(mapStateToProps, {})(EditProfileReduxForm);
