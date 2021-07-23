/* eslint-disable no-unused-vars */
import React from "react";
import { Field } from "redux-form";
import styles from "./FormControls.module.css";

const FormControls = props => {
	return (
		<>
			<div className={styles.wrapper_over_el}>{props.children}</div>
			{props.meta.touched && props.meta.error ? <span>{props.meta.error}</span> : <></>}
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
		<div className={styles.wrapperCreateField}>
			<Field className={styles.field} name={name} validate={validate} type={type} placeholder={placeholder} component={component} />
			{text}
		</div>
	);
};
