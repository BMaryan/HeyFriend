import React from "react";
import { validatePassword, required } from "../../../../utils/FieldValidationForm/FieldValidationForm";
import { WrapperCreateField, InputField, WrapperButton } from "../../FormControls/FormControls";
import { ChangePasswordFormDataType } from "./ChangePassword";
import { InjectedFormProps, reduxForm } from "redux-form";
import styles from "./ChangePassword.module.scss";
import commonStyles from "../Edit.module.scss";

type OwnPropsType = {
  authError: string | null;
  loading: boolean;
};

type MapStateToPropsType = {};

type MapDispatchToPropsType = {};

export type ChangePasswordFormPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const ChangePasswordForm = (props: InjectedFormProps<ChangePasswordFormDataType, ChangePasswordFormPropsType> & ChangePasswordFormPropsType) => {
  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>Old Password *</div>
        <div className={commonStyles.action}>
          <WrapperCreateField name="old_password" type="password" label="Your old password *" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />
        </div>
      </div>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>New Password *</div>
        <div className={commonStyles.action}>
          <WrapperCreateField name="new_password" type="password" label="Your new password *" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />
        </div>
      </div>
      <div className={commonStyles.wrapper_block}>
        <div className={commonStyles.key}>Confirm New Password *</div>
        <div className={commonStyles.action}>
          <WrapperCreateField name="confirm_new_password" type="password" label="Your confirm new password *" placeholder="" validate={[validatePassword, required]} component={InputField} />
        </div>
      </div>

      <div className={styles.infoForField}>In these fields, the minimum character length can be 8 or more.</div>

      <div className={commonStyles.wrapper_button}>
        <WrapperButton authError={props.authError} loading={props.loading} button_text="Change password" invalid={props.invalid} submitting={props.submitting} anyTouched={props.anyTouched} dirty={props.dirty} />
      </div>
    </form>
  );
};

const ChangePasswordReduxForm = reduxForm<ChangePasswordFormDataType, ChangePasswordFormPropsType>({ form: "edit_password" })(ChangePasswordForm);

export default ChangePasswordReduxForm;
