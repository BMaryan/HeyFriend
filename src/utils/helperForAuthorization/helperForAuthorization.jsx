/* eslint-disable array-callback-return */
import React from "react";
import styles from "./helperForAuthorization.module.css";
import { NavLink } from "react-router-dom";

export const AuthorizationContainer = (title, form, ...props) => {
	return (
		<div className={styles.authorization_content}>
			<div className={styles.authorization_title}>{title}</div>
			{form}
		</div>
	);
};

export const InformationContainer = (title, subtitle, linkTo, buttonText, ...props) => {
	return (
		<div className={styles.information_content}>
			<div className={styles.information_title}>{title}</div>
			<div className={styles.information_subtitle}>{subtitle}</div>
			<div>
				<NavLink className={styles.information_navLink} to={linkTo}>
					{buttonText}
				</NavLink>
			</div>
		</div>
	);
};

// form data to local storage and push to state
export const setSignUpDataToLocalStorage = props => {
	if (props.users && props.userSignUp && props.userSignUp.id) {
		localStorage.setItem("users", JSON.stringify(props.users));
		localStorage.setItem("profiles", JSON.stringify(props.profiles));
		let foundUser = props.users.find(item => {
			return item.phone_or_email === props.userSignUp.phone_or_email;
		});

		if (!foundUser) {
			props.users.push(props.userSignUp);
		}
	}
};

// check authorization
export const helpCheckAuthorization = props => {
	props.users.find(user => {
		if (props.userSignIn && props.userSignIn.phone_or_email) {
			if (user.phone_or_email === props.userSignIn.phone_or_email && user.password === props.userSignIn.password) {
				// if (props.profileAuthorizationData) {
				// 	localStorage.setItem("profileAuthorizationData", JSON.stringify(props.profileAuthorizationData));
				// } else {
				// 	props.checkAuthorization(user);
				// }
				return user;
			}
		}
	});
};

export const deleteAuthorizationUser = props => {
	if (!props.profileAuthorizationData) {
		props.checkAuthorization(null);
		localStorage.removeItem("profileAuthorizationData");
	}
};
