import React from "react";
import { reduxForm, Field } from "redux-form";

const SignInForm = props => {
	// console.log(props);

	return (
		<form className='form' onSubmit={props.handleSubmit}>
			{/* <Field name='Email' type='text' placeholder='Email' component='input' /> */}
			<Field name='email' type='text' placeholder='Text' component='input' />
			<Field name='password' type='password' placeholder='Password' component='input' />
			<Field name='rememberMe' type='checkbox' component='input' />
			<button>Send</button>
		</form>
	);
};

const SignInReduxForm = reduxForm({ form: "sign_in" })(SignInForm);

const SignIn = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

	return (
		<div>
			<SignInReduxForm onSubmit={onSubmit} />
		</div>
	);
};

export default SignIn;
