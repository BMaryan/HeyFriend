import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSortDown, faSignOutAlt, faCog, faMusic } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import styles from "../Navbar.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const ToggleProfileList = props => {
	return (
		<div className={styles.toggleProfileList}>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink className={styles.nav_linkList} activeClassName={styles.nav_linkList_active} to='/profile'>
					<FontAwesomeIcon className={styles.icon + " " + styles.iconList} icon={faHome} />
					Profile
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink className={styles.nav_linkList} activeClassName={styles.nav_linkList_active} to='/music'>
					<FontAwesomeIcon className={styles.icon + " " + styles.iconList} icon={faMusic} />
					Music
				</NavLink>
			</div>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink className={styles.nav_linkList} activeClassName={styles.nav_linkList_active} to='/settings'>
					<FontAwesomeIcon className={styles.icon + " " + styles.iconList} icon={faCog} />
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
						className={styles.nav_linkList + " " + styles.logOut}
						activeClassName={styles.nav_linkList_active}
						to='/sign_up'>
						<FontAwesomeIcon className={styles.icon + " " + styles.iconList} icon={faSignOutAlt} />
						Log Out
					</NavLink>
				</div>
			) : undefined}
		</div>
	);
};

const NavbarList = props => {
	let [toggleListProfile, setToggleListProfile] = React.useState(false);

	return (
		<div className={styles.navbar_list}>
			<div className={styles.wrapper_nav_link}>
				<div
					className={toggleListProfile ? styles.nav_link_toggleList_active : styles.nav_link_toggleList}
					onClick={() => (toggleListProfile ? setToggleListProfile(false) : setToggleListProfile(true))}>
					<div className={styles.wrapper_toggleList_picture}>
						<img src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' />
					</div>
					<div className={styles.toggleList_login}>{props.profile && props.profile.name + " " + props.profile.surname}</div>
					<div>
						<FontAwesomeIcon className={styles.icon} icon={faSortDown} />
					</div>
				</div>
			</div>
			<div>{toggleListProfile ? <ToggleProfileList checkAuthorization={props.checkAuthorization} /> : <></>}</div>
		</div>
	);
};

export default NavbarList;
