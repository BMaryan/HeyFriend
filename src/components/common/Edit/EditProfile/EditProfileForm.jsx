/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./EditProfile.module.css";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { WrapperCreateField, Input, Textarea, wrapperButton } from "../../../common/FormControls/FormControls";
import {
	validatePhoneNumberAndEmail,
	validatePassword,
	required,
	validateFirstAndLastNameCreator,
	validateFindTheSameUserCreator,
} from "../../../../utils/FieldValidationForm/FieldValidationForm";

let validateFirstName = validateFirstAndLastNameCreator("first");
let validateLastName = validateFirstAndLastNameCreator("last");
let validateFindTheSameUser = validateFindTheSameUserCreator(JSON.parse(localStorage.getItem("users")));

const EditProfileForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Name</div>
				<div className={styles.action}>{WrapperCreateField("name", "text", [validateFirstName], Input, "Your name")}</div>
			</div>

			<div className={styles.wrapper_block}>
				<div className={styles.key}>Surname</div>
				<div className={styles.action}>{WrapperCreateField("surname", "text", [validateLastName], Input, "Your surname")}</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Email or Phone</div>
				<div className={styles.action}>
					{WrapperCreateField(
						"phone_or_email",
						"text",
						[validatePhoneNumberAndEmail, validateFindTheSameUser],
						Input,
						"Your email or phone"
					)}
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Status</div>
				<div className={styles.action}>{WrapperCreateField("status", "text", [], Input, "Your status")}</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>About</div>
				<div className={styles.action}>{WrapperCreateField("aboutMe", "text", [], Textarea, "About you")}</div>
			</div>

			<div className={styles.wrapper_button}>{wrapperButton("Submit", { ...props })}</div>
		</form>
	);
};

const EditProfileReduxForm = reduxForm({ form: "edit_profile" })(EditProfileForm);

export default EditProfileReduxForm;
