import React from "react";
import styles from "./Edit.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./ChangePassword/ChangePassword";
import Default from "./Default/Default";
import { editConstant } from "../../../core/constants/constants";
import { useLocation } from "react-router-dom";
import GoBackHead from "../../common/GoBackHead/GoBackHead";
import Media from "react-media";

const Edit = props => {
	let location = useLocation();

	let title = {
		profile: "Edit profile",
		password: "Change password",
		appsAndWeb: "Apps and Websites",
	};

	let path = {
		profile: "profile",
		password: "password",
		manageAccess: "manage_access",
	};

	let checkProfile = location.pathname.includes(path.profile);
	let checkPassword = location.pathname.includes(path.password);
	let checkManageAccess = location.pathname.includes(path.manageAccess);

	return (
		<div className={styles.edit}>
			{/* head for go back */}
			{checkProfile || checkPassword || checkManageAccess ? (
				<Media query={{ maxWidth: 399 }}>
					{matches =>
						matches ? (
							<GoBackHead
								title={
									checkProfile ? title.profile : checkPassword ? title.password : checkManageAccess ? title.appsAndWeb : undefined
								}
							/>
						) : (
							<></>
						)
					}
				</Media>
			) : undefined}

			{/* menu */}
			<div className={!(checkProfile || checkPassword || checkManageAccess) ? styles.edit_menu : styles.edit_menu__none}>
				<ul className={styles.menu}>
					<li className={styles.edit_item}>
						<NavLink exact to={`${editConstant}/${path.profile}`} className={styles.item} activeClassName={styles.item_active}>
							{title.profile}
						</NavLink>
					</li>
					<li className={styles.edit_item}>
						<NavLink exact to={`${editConstant}/${path.password}`} className={styles.item} activeClassName={styles.item_active}>
							{title.password}
						</NavLink>
					</li>
				</ul>
			</div>

			{/* content */}
			<div className={styles.edit_content}>
				<Route exact path={`${editConstant}/${path.profile}`} render={() => <EditProfile {...props} />} />
				<Route exact path={`${editConstant}/${path.password}`} render={() => <ChangePassword {...props} />} />
				<Route exact path={`${editConstant}`} render={() => <Default />} />
			</div>
		</div>
	);
};

export default Edit;
