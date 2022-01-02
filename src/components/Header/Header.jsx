/* eslint-disable no-useless-concat */
import React from "react";
import styles from "./Header.module.css";
import HeaderReduxForm from "./HeaderForm";
import NavbarRow from "./Navbar/NavbarRow/NavbarRow";
import NavbarList from "./Navbar/NavbarList/NavbarList";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/insta.png";

const Header = props => {
	const onsubmit = formData => {
		return formData;
	};

	function refreshPage(){ 
		window.location.href="/"; 
	}
		
	return (
		<div className={styles.header}>
			<div className={"container" + " " + styles.header_container}>
				{/* logo */}
				<div className={styles.header_logo}>
					<NavLink to='' onClick={() => refreshPage()}>
						<img src={Logo} alt='' />
					</NavLink>

					<HeaderReduxForm onSubmit={onsubmit} />
				</div>

				{/* navBar row */}
				<div className={styles.navbar_row}>
					<NavbarRow account={props.account} isTopNavigation={true} />
				</div>

				{/* navBar list */}
				<div className={styles.navbar_list}>
					<NavbarList
						accounts={props.accounts}
						account={props.account}
						isAccount={props.isAccount}
						getProfileData={props.getProfileData}
						getAuthorizationId={props.getAuthorizationId}
						getParamsId={props.getParamsId}
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
