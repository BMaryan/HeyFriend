/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./EditProfile.module.css";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";

const EditProfileForm = props => {
	console.log(props.myProfile && props.myProfile.profile ? props.myProfile.profile.name : undefined);

	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Name</div>
				<div className={styles.action}>
					<Field
						name='name'
						// onChange={() => {}}
						// value={props.myProfile && props.myProfile.profile ? props.myProfile.profile.name : undefined}
						className={styles.field}
						placeholder='Your name'
						component='input'
					/>
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Surname</div>
				<div className={styles.action}>
					<Field name='surname' className={styles.field} placeholder='Your surname' component='input' />
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Email or Phone</div>
				<div className={styles.action}>
					<Field name='email_or_phone' className={styles.field} placeholder='Your email or phone' component='input' />
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>Status</div>
				<div className={styles.action}>
					<Field name='status' className={styles.field} placeholder='Your status' component='input' />
				</div>
			</div>
			<div className={styles.wrapper_block}>
				<div className={styles.key}>About</div>
				<div className={styles.action}>
					<Field name='about' className={styles.field} rows='4' placeholder='About you' component='textarea' />
				</div>
			</div>

			<div className={styles.wrapper_button}>
				<button type='submit'>Submit</button>
			</div>
		</form>
	);
};

const EditProfileReduxForm = reduxForm({ form: "edit_profile" })(EditProfileForm);

export default EditProfileReduxForm;
