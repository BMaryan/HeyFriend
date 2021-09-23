/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./ChangePassword.module.css";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";

const ChangePasswordForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Old Password</div>
				<div className={styles.action}>
					<Field name='old_password' className={styles.field} placeholder='Your old password' component='input' />
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>New Password</div>
				<div className={styles.action}>
					<Field name='new_password' className={styles.field} placeholder='Your new password' component='input' />
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Confirm New Password</div>
				<div className={styles.action}>
					<Field name='confirm_new_password' className={styles.field} placeholder='Your confirm new password' component='input' />
				</div>
			</div>

			<div className={styles.wrapper_button}>
				<button type='submit'>Submit</button>
			</div>
		</form>
	);
};

const ChangePasswordReduxForm = reduxForm({ form: "edit_profile" })(ChangePasswordForm);

export default ChangePasswordReduxForm;
