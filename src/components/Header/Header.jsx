import React from "react";
import Navbar from "./Navbar/Navbar";
import styles from "./Header.module.css";

const Header = props => {
	return (
		<div className={styles.header}>
			<div>Logo</div>

			<div>
				<input type='search' />
			</div>

			<Navbar {...props} profileAuthorizationData={props.profileAuthorizationData} checkAuthorization={props.checkAuthorization} />
		</div>
	);
};

export default Header;
