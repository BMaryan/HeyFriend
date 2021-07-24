/* eslint-disable no-unused-vars */
import React from "react";
import { Field } from "redux-form";
import styles from "./FormControls.module.css";

const FormControls = props => {
	return (
		<>
			{props.children && props.children.props.type === "checkbox" ? (
				<div>{props.children}</div>
			) : (
				<div className={styles.wrapperInputAndTextarea}>{props.children}</div>
			)}

			{props.meta.touched && props.meta.error ? <div className={styles.text_error}>{props.meta.error}</div> : <></>}
		</>
	);
};

export const Input = props => {
	const { input, child, meta, ...restProps } = props;

	return (
		<FormControls {...props}>
			<input {...input} {...restProps} />
		</FormControls>
	);
};

export const Textarea = props => {
	const { input, child, meta, ...restProps } = props;

	return (
		<FormControls {...props}>
			<textarea {...input} {...restProps} />
		</FormControls>
	);
};

export const wrapperCreateField = (name, type, validate = [], component, placeholder = "", text = "", ...props) => {
	return (
		<>
			{type === "checkbox" ? (
				<div className={styles.wrapper_field + " " + styles.wrapper_field_checkbox}>
					<Field className={styles.field} name={name} validate={validate} type={type} placeholder={placeholder} component={component} />

					<span className={styles.text_for_field}>{text}</span>
				</div>
			) : (
				<div className={styles.wrapper_field}>
					<Field className={styles.field} name={name} validate={validate} type={type} placeholder={placeholder} component={component} />

					<span className={styles.text_for_field}>{text}</span>
				</div>
			)}
		</>
	);
};

export const wrapperButton = (button_text, ...props) => {
	return (
		<div className={styles.wrapper_button}>
			<button>{button_text}</button>
		</div>
	);
};
