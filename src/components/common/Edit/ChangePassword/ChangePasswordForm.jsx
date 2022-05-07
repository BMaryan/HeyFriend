/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./ChangePassword.module.scss";
import commonStyles from "../Edit.module.scss";
import { reduxForm } from "redux-form";
import { WrapperCreateField, InputField, WrapperButton } from "../../FormControls/FormControls";
import { validatePassword, required } from "../../../../utils/FieldValidationForm/FieldValidationForm";

const ChangePasswordForm = (props) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>Old Password *</div>
        <div className={commonStyles.action}>
<<<<<<< HEAD
          <WrapperCreateField name="old_password" type="password" validate={[validatePassword, required]} component={InputField} placeholder="Your old password *" />
=======
          <WrapperCreateField name="old_password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Your old password *" />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
        </div>
      </div>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>New Password *</div>
        <div className={commonStyles.action}>
<<<<<<< HEAD
          <WrapperCreateField name="new_password" type="password" validate={[validatePassword, required]} component={InputField} placeholder="Your new password *" />
=======
          <WrapperCreateField name="new_password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Your new password *" />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
        </div>
      </div>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>Confirm New Password *</div>
        <div className={commonStyles.action}>
<<<<<<< HEAD
          <WrapperCreateField name="confirm_new_password" type="password" validate={[validatePassword, required]} component={InputField} placeholder="Your confirm new password *" />
=======
          <WrapperCreateField name="confirm_new_password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Your confirm new password *" />
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
        </div>
      </div>

      <div className={styles.infoForField}>In these fields, the minimum character length can be 8 or more.</div>

      <div className={commonStyles.wrapper_button}>
        <WrapperButton {...props} button_text="Change password" isEditPassword={true} saveFormData={props.saveFormData} />
      </div>
    </form>
  );
};

const ChangePasswordReduxForm = reduxForm({ form: "edit_password" })(ChangePasswordForm);

export default ChangePasswordReduxForm;
