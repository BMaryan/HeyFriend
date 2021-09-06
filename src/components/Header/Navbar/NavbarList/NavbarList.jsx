import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import commonStyles from "../Navbar.module.css";
import styles from "./NavbarList.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { ToggleProfileList } from "../../../../utils/helperForHeader/helperForHeader";

const NavbarList = props => {
	let [toggleListProfile, setToggleListProfile] = React.useState(false);

	return (
		<div className={styles.navbar_list}>
			<div className={styles.wrapper_nav_link}>
				<div
					className={toggleListProfile ? commonStyles.nav_link_toggleList_active : commonStyles.nav_link_toggleList}
					onClick={() => (toggleListProfile ? setToggleListProfile(false) : setToggleListProfile(true))}>
					{/* wrapper */}
					<div className={styles.wrapper_toggleList_picture}>
						<img src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' />
					</div>

					{/* full name */}
					<div className={styles.toggleList_fullName}>{props.profile && props.profile.name + " " + props.profile.surname}</div>

					{/* icon */}
					<div>
						<FontAwesomeIcon className={commonStyles.icon} icon={faSortDown} />
					</div>
				</div>
			</div>

			<div>
				{toggleListProfile ? (
					<ToggleProfileList checkAuthorization={props.checkAuthorization} getProfileData={props.getProfileData} />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default NavbarList;
