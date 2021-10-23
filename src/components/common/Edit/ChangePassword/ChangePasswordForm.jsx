/* eslint-disable no-unused-vars */
import React from "react";
import styles from "../Edit.module.css";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { WrapperCreateField, Input, WrapperButton } from "../../FormControls/FormControls";
import { validatePassword } from "../../../../utils/FieldValidationForm/FieldValidationForm";

const ChangePasswordForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Old Password</div>
				<div className={styles.action}>
					<WrapperCreateField
						name='old_password'
						type='password'
						validate={[validatePassword]}
						component={Input}
						placeholder='Your old password'
					/>
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>New Password</div>
				<div className={styles.action}>
					<WrapperCreateField
						name='new_password'
						type='password'
						validate={[validatePassword]}
						component={Input}
						placeholder='Your new password'
					/>
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Confirm New Password</div>
				<div className={styles.action}>
					<WrapperCreateField
						name='confirm_new_password'
						type='password'
						validate={[validatePassword]}
						component={Input}
						placeholder='Your confirm new password'
					/>
				</div>
			</div>

			<div className={styles.wrapper_button}>
				<WrapperButton {...props} button_text='Change password' />
			</div>
		</form>
	);
};

const ChangePasswordReduxForm = reduxForm({ form: "edit_password" })(ChangePasswordForm);

export default ChangePasswordReduxForm;
