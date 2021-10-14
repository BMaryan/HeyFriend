/* eslint-disable no-unused-vars */
import React from "react";
import { Field } from "redux-form";
import styles from "./FormControls.module.css";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { validateAuthorizationUserCreator } from "../../../utils/FieldValidationForm/FieldValidationForm";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

export const WrapperCreateField = props => {
	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

	return (
		<>
			{props.type === "checkbox" ? (
				<div className={styles.wrapper_field + " " + styles.wrapper_field_checkbox}>
					{props.text ? (
						<span className={styles.text_for_field}>
							<Checkbox
								className={styles.checkbox}
								name={props.name}
								type={props.type}
								placeholder={props.placeholder}
								sx={{
									color: pink[2000],
									"&.Mui-checked": {
										color: pink[300],
									},
									"& .MuiSvgIcon-root": { fontSize: 18 },
									padding: 0,
									marginRight: "5px",
								}}
							/>
							{props.text}
						</span>
					) : (
						<></>
					)}
				</div>
			) : (
				<div className={styles.wrapper_field}>
					{props.type === "password" ? (
						<>
							<Field
								className={styles.field}
								name={props.name}
								validate={props.validate}
								type={values.showPassword ? "text" : props.type}
								value={values.password}
								onChange={handleChange("password")}
								placeholder={props.placeholder}
								component={props.component}
							/>

							{values.password !== "" ? (
								<InputAdornment position='end' className={styles.toggle_show_password_button}>
									<IconButton
										className={styles.toggle_show_password_icon}
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							) : (
								<></>
							)}
						</>
					) : (
						<Field
							className={styles.field}
							name={props.name}
							validate={props.validate}
							type={props.type}
							placeholder={props.placeholder}
							component={props.component}
						/>
					)}

					{props.text ? <span className={styles.text_for_field}>{props.text}</span> : <></>}
				</div>
			)}
		</>
	);
};

export const WrapperButton = props => {
	let [errorSignIn, setErrorSignIn] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	return (
		<>
			{props.isSignIn && errorSignIn ? <div className={styles.common_error}>{errorSignIn}</div> : undefined}

			<div className={styles.wrapper_button}>
				<Button
					onClick={() =>
						props.isSignIn
							? setErrorSignIn(validateAuthorizationUserCreator(props.accounts, props.userSignIn))
							: props.isEditProfile
							? handleClick()
							: undefined
					}
					type='submit'
					disabled={props.invalid || props.submitting || props.pristine}
					variant='contained'>
					{props.button_text[0]}
					<span style={{ textTransform: "lowercase" }}>{props.button_text.slice(1)}</span>
				</Button>
			</div>

			<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
				<Alert severity='success'>You were able to successfully edit the data!</Alert>
			</Snackbar>
		</>
	);
};
