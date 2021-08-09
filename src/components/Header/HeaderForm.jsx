import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HeaderForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<div className={styles.wrapper_field}>
				<Field className={styles.field} name='search' type='search' placeholder='Search' component='input' />
				<FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
			</div>
		</form>
	);
};

const HeaderReduxForm = reduxForm({ form: "header_form" })(HeaderForm);

export default HeaderReduxForm;
