import React from "react";
import styles from "./Edit.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./ChangePassword/ChangePassword";
import Default from "./Default/Default";

const Edit = props => {
	let myProfile = props.accounts.find(profile => (profile && props.account ? profile.id === props.account.id : undefined));

	return (
		<div className={styles.edit}>
			<div className={styles.edit_menu}>
				<ul className={styles.menu}>
					<li className={styles.edit_item}>
						<NavLink exact to='/edit/profile' className={styles.item} activeClassName={styles.item_active}>
							Edit profile
						</NavLink>
					</li>
					<li className={styles.edit_item}>
						<NavLink exact to='/edit/password' className={styles.item} activeClassName={styles.item_active}>
							Change password
						</NavLink>
					</li>
					<li className={styles.edit_item}>
						<NavLink to='/edit/manage_access' className={styles.item} activeClassName={styles.item_active}>
							Apps and Websites
						</NavLink>
					</li>
				</ul>
			</div>

			<div className={styles.edit_content}>
				<Route exact path='/edit/profile' render={() => <EditProfile {...props} myProfile={myProfile} />} />
				<Route exact path='/edit/password' render={() => <ChangePassword {...props} myProfile={myProfile} />} />
				<Route exact path='/edit' render={() => <Default />} />
			</div>
		</div>
	);
};

export default Edit;
