import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt, faCog, faMusic } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import commonStyles from "../../components/Header/Navbar/Navbar.module.css";
import styles from "./helperForHeader.module.css";

export const ToggleProfileList = props => {
	return (
		<div className={styles.toggleProfileList}>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to='/profile'>
					<FontAwesomeIcon className={commonStyles.icon + " " + styles.iconList} icon={faHome} />
					Profile
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to='/music'>
					<FontAwesomeIcon className={commonStyles.icon + " " + styles.iconList} icon={faMusic} />
					Music
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to='/settings'>
					<FontAwesomeIcon className={commonStyles.icon + " " + styles.iconList} icon={faCog} />
					Settings
				</NavLink>
			</div>

			{!props.profileAuthorizationData ? (
				<div className={styles.wrapper_nav_linkList}>
					<NavLink
						onClick={() => {
							props.checkAuthorization(null);
							localStorage.removeItem("profileAuthorizationData");
						}}
						className={styles.nav_linkList + " " + commonStyles.common_nav_linkList + " " + commonStyles.logOut}
						activeClassName={styles.nav_linkList_active}
						to='/sign_up'>
						<FontAwesomeIcon className={commonStyles.icon + " " + styles.iconList} icon={faSignOutAlt} />
						Log Out
					</NavLink>
				</div>
			) : undefined}
		</div>
	);
};
