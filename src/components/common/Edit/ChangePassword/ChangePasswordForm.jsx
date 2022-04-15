/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./ChangePassword.module.scss";
import commonStyles from "../Edit.module.scss";
import { reduxForm } from "redux-form";
import { WrapperCreateField, Input, WrapperButton } from "../../FormControls/FormControls";
import { validatePassword, required } from "../../../../utils/FieldValidationForm/FieldValidationForm";

const ChangePasswordForm = (props) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>Old Password *</div>
        <div className={commonStyles.action}>
          <WrapperCreateField name="old_password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Your old password *" />
        </div>
      </div>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>New Password *</div>
        <div className={commonStyles.action}>
          <WrapperCreateField name="new_password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Your new password *" />
        </div>
      </div>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>Confirm New Password *</div>
        <div className={commonStyles.action}>
          <WrapperCreateField name="confirm_new_password" type="password" validate={[validatePassword, required]} component={Input} placeholder="Your confirm new password *" />
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
