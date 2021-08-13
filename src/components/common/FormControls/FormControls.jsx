/* eslint-disable no-unused-vars */
import React from "react";
import { Field } from "redux-form";
import { togglePassword } from "../../../utils/helperForAuthorization/helperForAuthorization";
import styles from "./FormControls.module.css";

const FormControls = props => {
	return (
		<>
			{props.children && props.children.props.type === "checkbox" ? (
				<div>{props.children}</div>
			) : (
				<>
					{props.meta.touched && props.meta.error ? (
						<div className={styles.wrapperInputAndTextarea + " " + styles.wrapperInputAndTextareaError}>{props.children}</div>
					) : (
						<div className={styles.wrapperInputAndTextarea}>{props.children}</div>
					)}
				</>
			)}
			{props.meta.touched && props.meta.error ? (
				<div className={styles.block_error}>
					<svg
						aria-hidden='true'
						className='stUf5b LxE1Id'
						fill='currentColor'
						focusable='false'
						width='16px'
						height='16px'
						viewBox='0 0 24 24'
						xmlns='https://www.w3.org/2000/svg'>
						<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'></path>
					</svg>
					{props.meta.error}
				</div>
			) : (
				<></>
			)}
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
					{type === "password" ? (
						<>
							<Field
								className={styles.field}
								name={name}
								validate={validate}
								type={type}
								placeholder={placeholder}
								component={component}
							/>
						</>
					) : (
						<Field className={styles.field} name={name} validate={validate} type={type} placeholder={placeholder} component={component} />
					)}

					<span className={styles.text_for_field}>{text}</span>
				</div>
			)}
		</>
	);
};

export const wrapperButton = (button_text, { users, userSignIn, ...props }) => {
	return (
		<div className={styles.wrapper_button}>
			<button type='submit' disabled={props.invalid || props.submitting || props.pristine}>
				{button_text}
			</button>
		</div>
	);
};
