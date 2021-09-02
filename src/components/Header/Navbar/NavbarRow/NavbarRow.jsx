import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import commonStyles from "../Navbar.module.css";
import styles from "./NavbarRow.module.css";

const DuplicateCodeFunc = props => {
	return (
		<div className={styles.wrapper_nav_link}>
			<NavLink
				className={styles.nav_linkRow + " " + commonStyles.common_nav_linkRow}
				activeClassName={commonStyles.nav_linkRow_active}
				to={props.path}
				exact={props.exact}>
				<FontAwesomeIcon className={commonStyles.icon} icon={props.icon} />
			</NavLink>
		</div>
	);
};

const NavbarRow = props => {
	return (
		<div className={styles.navbar_row}>
			<DuplicateCodeFunc path='/' icon={faHome} exact />
			<DuplicateCodeFunc path='/chat' icon={faFacebookMessenger} />
			<DuplicateCodeFunc path='/friends' icon={faUserFriends} />
		</div>
	);
};

export default NavbarRow;
