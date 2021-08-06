import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = props => {
	return (
		<div className={styles.navbar}>
			<div className={styles.wrapper_nav_link}>
				<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} exact to='/'>
					<FontAwesomeIcon className={styles.icon} icon={faHome} />
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_link}>
				<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} to='/message'>
					<FontAwesomeIcon className={styles.icon} icon={faFacebookMessenger} />
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_link}>
				<NavLink className={styles.nav_link} activeClassName={styles.nav_link_active} to='/profile'>
					<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJuLvSlNlo9BFbzHAidNdUQi-yNeo97wWAw&usqp=CAU' alt='' />
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_link}>
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
			</div>
		</div>
	);
};

export default Navbar;
