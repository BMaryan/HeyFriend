/* eslint-disable no-unused-vars */
import React from "react";
import { Field } from "redux-form";
import styles from "./FormControls.module.css";

const FormControls = props => {
	console.log(props.children.props.type);

	return (
		<>
			{props.children && props.children.props.type === "checkbox" ? (
				<div>{props.children}</div>
			) : (
				<div className={styles.wrapperInputTextarea}>{props.children}</div>
			)}

			{/* {props.meta.touched && props.meta.error ? <span>{props.meta.error}</span> : <></>} */}
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
		<div className={styles.wrapper_field}>
			{
				(type = "checkbox" ? (
					<Field
						className={styles.field + " " + styles.field_checkbox}
						name={name}
						validate={validate}
						type={type}
						placeholder={placeholder}
						component={component}
					/>
				) : (
					<Field className={styles.field} name={name} validate={validate} type={type} placeholder={placeholder} component={component} />
				))
			}

			<span className={styles.text_for_field}>{text}</span>
		</div>
	);
};

export const wrapperButton = props => {
	return (
		<div className={styles.wrapper_button}>
			<button>SIGN IN</button>
		</div>
	);
};
