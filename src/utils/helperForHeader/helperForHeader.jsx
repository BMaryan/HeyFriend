import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt, faCog, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import commonStyles from "../../components/Header/Navbar/Navbar.module.css";
import styles from "./helperForHeader.module.css";

export const ToggleProfileList = props => {
	let dataFromAccountToAccounts = () => {
		if (props.accounts) {
			props.accounts.find(account => {
				if (account.id === props.account.id) {
					return (props.accounts[account.id - 1] = { ...props.account });
				}
			});
		}
	};

	return (
		<div className={styles.toggleProfileList}>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink
					onClick={() => props.setToggleListProfile(false)}
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to={`/profile`}>
					<FontAwesomeIcon className={commonStyles.icon + " " + styles.iconList} icon={faHome} />
					Profile
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink
					onClick={() => props.setToggleListProfile(false)}
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to='/profile/saved'>
					<FontAwesomeIcon className={commonStyles.icon + " " + styles.iconList} icon={faBookmark} />
					Saved
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink
					onClick={() => props.setToggleListProfile(false)}
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to='/account/edit'
					exact>
					<FontAwesomeIcon className={commonStyles.icon + " " + styles.iconList} icon={faCog} />
					Settings
				</NavLink>
			</div>

			{props.account ? (
				<div className={styles.wrapper_nav_linkList}>
					<NavLink
						onClick={() => {
							dataFromAccountToAccounts();
							props.isAccount(null);
							props.getAuthorizationId(null);
							props.getParamsId(null);
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
