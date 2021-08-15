import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSortDown, faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import styles from "../Navbar.module.css";

const ToggleProfileList = props => {
	return (
		<div className={styles.toggleProfileList}>
			<div className={styles.wrapper_nav_linkList}>
				<NavLink className={styles.nav_linkList} activeClassName={styles.nav_linkList_active} exact to='/profile'>
					<FontAwesomeIcon className={styles.icon + " " + styles.iconList} icon={faHome} />
					Profile
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
						className={styles.nav_linkList + " " + styles.delete}
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
					className={styles.nav_link_toggleList}
					onClick={() => (toggleListProfile ? setToggleListProfile(false) : setToggleListProfile(true))}>
					<div className={styles.wrapper_toggleList_picture}>
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJuLvSlNlo9BFbzHAidNdUQi-yNeo97wWAw&usqp=CAU' alt='' />
					</div>
					<div className={styles.toggleList_login}>
						{props.profileAuthorizationData && props.profileAuthorizationData.name + " " + props.profileAuthorizationData.surname}
					</div>
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
