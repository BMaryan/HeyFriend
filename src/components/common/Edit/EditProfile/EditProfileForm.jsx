/* eslint-disable no-unused-vars */
import React from "react";
import styles from "../Edit.module.scss";
import { reduxForm } from "redux-form";
import { WrapperCreateField, InputField, Textarea, WrapperButton } from "../../../common/FormControls/FormControls";
import { connect } from "react-redux";
<<<<<<< HEAD
import { validateEmail, validatePassword, required, validateFirstAndLastNameCreator } from "../../../../utils/FieldValidationForm/FieldValidationForm";
=======
import { validatePhoneNumberAndEmail, validatePassword, required, validateFirstAndLastNameCreator } from "../../../../utils/FieldValidationForm/FieldValidationForm";
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516

let validateFirstName = validateFirstAndLastNameCreator("first");
let validateLastName = validateFirstAndLastNameCreator("last");

const EditProfileForm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Name</div>
        <div className={styles.action}>
<<<<<<< HEAD
          <WrapperCreateField name="name" type="text" validate={[validateFirstName]} component={InputField} placeholder="Your name" />
=======
          <WrapperCreateField name="name" type="text" validate={[validateFirstName]} component={Input} placeholder="Your name" />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
        </div>
      </div>

      <div className={styles.wrapper_block}>
        <div className={styles.key}>Surname</div>
        <div className={styles.action}>
<<<<<<< HEAD
          <WrapperCreateField name="surname" type="text" validate={[validateLastName]} component={InputField} placeholder="Your surname" />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Email *</div>
        <div className={styles.action}>
          <WrapperCreateField name="email" type="text" validate={[validateEmail, required]} component={InputField} placeholder="Your email *" />
=======
          <WrapperCreateField name="surname" type="text" validate={[validateLastName]} component={Input} placeholder="Your surname" />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Email or Phone *</div>
        <div className={styles.action}>
          <WrapperCreateField name="phone_or_email" type="text" validate={[validatePhoneNumberAndEmail, required]} component={Input} placeholder="Your email or phone *" />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Status</div>
        <div className={styles.action}>
<<<<<<< HEAD
          <WrapperCreateField name="status" type="text" validate={[]} component={InputField} placeholder="Your status" />
=======
          <WrapperCreateField name="status" type="text" validate={[]} component={Input} placeholder="Your status" />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
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
