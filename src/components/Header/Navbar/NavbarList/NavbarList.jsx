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
						<img
							src={
								props.account && props.account.profile && props.account.profile.avatar ? props.account.profile.avatar : defaultAvatar
							}
							alt=''
						/>
					</div>

					{/* full name */}
					<div className={styles.toggleList_fullName}>
						{props.account && props.account.profile ? props.account.profile.surname + " " + props.account.profile.name : <></>}
					</div>

					{/* icon */}
					<div>
						<FontAwesomeIcon className={commonStyles.icon} icon={faSortDown} />
					</div>
				</div>
			</div>

			<div>
				{toggleListProfile ? (
					<ToggleProfileList
						accounts={props.accounts}
						account={props.account}
						setToggleListProfile={setToggleListProfile}
						getAuthorizationId={props.getAuthorizationId}
						isAccount={props.isAccount}
						getProfileData={props.getProfileData}
						getParamsId={props.getParamsId}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default NavbarList;
