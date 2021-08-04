import React from "react";
import Navbar from "./Navbar/Navbar";
import styles from "./Header.module.css";
import HeaderReduxForm from "./HeaderForm";

const Header = props => {
	const onsubmit = formData => {
		console.log(formData);
	};

	return (
		<div className={styles.header}>
			<div>Logo</div>
			<HeaderReduxForm onSubmit={onsubmit} />

			<Navbar {...props} profileAuthorizationData={props.profileAuthorizationData} checkAuthorization={props.checkAuthorization} />
		</div>
	);
};

export default Header;
