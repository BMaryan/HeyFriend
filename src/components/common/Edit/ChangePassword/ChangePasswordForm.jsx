/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./ChangePassword.module.css";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { wrapperCreateField, Input, wrapperButton } from "../../FormControls/FormControls";
import { validatePassword } from "../../../../utils/FieldValidationForm/FieldValidationForm";

const ChangePasswordForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Old Password</div>
				<div className={styles.action}>{wrapperCreateField("old_password", "password", [validatePassword], Input, "Your old password")}</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>New Password</div>
				<div className={styles.action}>{wrapperCreateField("new_password", "password", [validatePassword], Input, "Your new password")}</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Confirm New Password</div>
				<div className={styles.action}>
					{wrapperCreateField("confirm_new_password", "password", [validatePassword], Input, "Your confirm new password")}
				</div>
			</div>

			<div className={styles.wrapper_button}>{wrapperButton("Submit", { ...props })}</div>
		</form>
	);
};

const ChangePasswordReduxForm = reduxForm({ form: "edit_profile" })(ChangePasswordForm);

export default ChangePasswordReduxForm;
