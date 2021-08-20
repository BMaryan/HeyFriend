/* eslint-disable no-useless-concat */
import React from "react";
import styles from "./Header.module.css";
import HeaderReduxForm from "./HeaderForm";
import NavbarRow from "./Navbar/NavbarRow/NavbarRow";
import NavbarList from "./Navbar/NavbarList/NavbarList";
import { NavLink } from "react-router-dom";

const Header = props => {
	const onsubmit = formData => {
		console.log(formData);
	};

	return (
		<div className={styles.header}>
			<div className={"container" + " " + styles.header_container}>
				<div className={styles.header_logo}>
					<NavLink to='/'>
						<img src='https://i.pinimg.com/originals/64/10/38/6410388e5b15a38a625e315427d0c808.jpg' alt='' />
					</NavLink>
					<HeaderReduxForm onSubmit={onsubmit} />
				</div>
				<NavbarRow profileAuthorizationData={props.profileAuthorizationData} />
				<NavbarList
					profileAuthorizationData={props.profileAuthorizationData}
					checkAuthorization={props.checkAuthorization}
					getProfileData={props.getProfileData}
				/>
			</div>
		</div>
	);
};

export default Header;
