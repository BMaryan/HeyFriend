import React from "react";
import styles from "./Edit.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./ChangePassword/ChangePassword";
import Default from "./Default/Default";
import { editConstant } from "../../../core/constants/constants";

const Edit = props => {
	return (
		<div className={styles.edit}>
			<div className={styles.edit_menu}>
				<ul className={styles.menu}>
					<li className={styles.edit_item}>
						<NavLink exact to={`${editConstant}/profile`} className={styles.item} activeClassName={styles.item_active}>
							Edit profile
						</NavLink>
					</li>
					<li className={styles.edit_item}>
						<NavLink exact to={`${editConstant}/password`} className={styles.item} activeClassName={styles.item_active}>
							Change password
						</NavLink>
					</li>
					<li className={styles.edit_item}>
						<NavLink to={`${editConstant}/manage_access`} className={styles.item} activeClassName={styles.item_active}>
							Apps and Websites
						</NavLink>
					</li>
				</ul>
			</div>

			<div className={styles.edit_content}>
				<Route exact path={`${editConstant}/profile`} render={() => <EditProfile {...props} />} />
				<Route exact path={`${editConstant}/password`} render={() => <ChangePassword {...props} />} />
				<Route exact path={`${editConstant}`} render={() => <Default />} />
			</div>
		</div>
	);
};

export default Edit;
