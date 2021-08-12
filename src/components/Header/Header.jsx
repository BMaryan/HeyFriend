/* eslint-disable no-useless-concat */
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
			<div className={"container" + " " + styles.header_container}>
				<div className={styles.header_logo}>Logo</div>
				<HeaderReduxForm onSubmit={onsubmit} />
				<Navbar profileAuthorizationData={props.profileAuthorizationData} />
			</div>
		</div>
	);
};

export default Header;
