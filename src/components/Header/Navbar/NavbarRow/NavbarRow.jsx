import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import styles from "../Navbar.module.css";

const NavbarRow = props => {
	return (
		<div className={styles.navbar_row}>
			<div className={styles.wrapper_nav_link}>
				<NavLink className={styles.nav_linkRow} activeClassName={styles.nav_linkRow_active} exact to='/'>
					<FontAwesomeIcon className={styles.icon} icon={faHome} />
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_link}>
				<NavLink className={styles.nav_linkRow} activeClassName={styles.nav_linkRow_active} to='/chat'>
					<FontAwesomeIcon className={styles.icon} icon={faFacebookMessenger} />
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_link}>
				<NavLink className={styles.nav_linkRow} activeClassName={styles.nav_linkRow_active} to='/friends'>
					<FontAwesomeIcon className={styles.icon} icon={faUserFriends} />
				</NavLink>
			</div>
		</div>
	);
};

export default NavbarRow;
