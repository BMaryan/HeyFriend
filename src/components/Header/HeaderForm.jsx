import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormControls/FormControls";

const HeaderForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field name='search' type='search' component={Input} />
		</form>
	);
};

const HeaderReduxForm = reduxForm({ form: "header_form" })(HeaderForm);

export default HeaderReduxForm;
