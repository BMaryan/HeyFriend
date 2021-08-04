import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = props => {
	return (
		<div className={styles.navbar}>
			<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} exact to='/'>
				Main page
			</NavLink>
			{props.profileAuthorizationData ? (
				<NavLink
					className={styles.nav_link}
					activeClassName={styles.nav_link_active}
					onClick={() => {
						localStorage.removeItem("profileAuthorizationData");
					}}
					to='/sign_up'>
					Log out
				</NavLink>
			) : (
				<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} to='/sign_up'>
					Sign Up
				</NavLink>
			)}
			<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} to='/profile'>
				Profile
			</NavLink>
		</div>
	);
};

export default Navbar;
