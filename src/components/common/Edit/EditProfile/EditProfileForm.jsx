/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./EditProfile.module.css";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { WrapperCreateField, Input, Textarea, WrapperButton } from "../../../common/FormControls/FormControls";
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
	let [value, setValue] = React.useState({
		name: props.account.profile.name,
		surname: props.account.profile.surname,
		phone_or_email: props.account.profile.phone_or_email,
		password: props.account.profile.password,
	});

	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Name</div>
				<div className={styles.action}>
					<WrapperCreateField name='name' type='text' validate={[validateFirstName]} component={Input} placeholder='Your name' />
				</div>
			</div>

			<div className={styles.wrapper_block}>
				<div className={styles.key}>Surname</div>
				<div className={styles.action}>
					<WrapperCreateField name='surname' type='text' validate={[validateLastName]} component={Input} placeholder='Your surname' />
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Email or Phone</div>
				<div className={styles.action}>
					<WrapperCreateField
						name='phone_or_email'
						type='text'
						validate={[validatePhoneNumberAndEmail, validateFindTheSameUser]}
						component={Input}
						placeholder='Your email or phone'
					/>
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Status</div>
				<div className={styles.action}>
					<WrapperCreateField name='status' type='text' validate={[]} component={Input} placeholder='Your status' />
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>About</div>
				<div className={styles.action}>
					<WrapperCreateField name='aboutMe' type='text' validate={[]} component={Textarea} placeholder='About you' />
				</div>
			</div>

			<div className={styles.wrapper_button}>
				<WrapperButton {...props} button_text='Submit' onClick={() => console.log("YEs")} />
			</div>
		</form>
	);
};

const EditProfileReduxForm = reduxForm({ form: "edit_profile" })(EditProfileForm);

export default EditProfileReduxForm;
