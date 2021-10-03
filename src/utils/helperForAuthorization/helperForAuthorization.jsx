/* eslint-disable array-callback-return */
import React from "react";
import styles from "./helperForAuthorization.module.css";
import { NavLink } from "react-router-dom";
import { accounts, account } from "../../core/constants/constantsLocalStorage";

export const AuthorizationHelperContainer = props => {
	return (
		<div className={styles.authorization_content}>
			<div className={styles.authorization_title}>{props.title}</div>
			{props.form}
		</div>
	);
};

export const InformationContainer = props => {
	return (
		<div className={styles.information_content}>
			<div className={styles.information_title}>{props.title}</div>
			<div className={styles.information_subtitle}>{props.subtitle}</div>
			<div>
				<NavLink className={styles.information_navLink} to={props.linkTo}>
					{props.buttonText}
				</NavLink>
			</div>
		</div>
	);
};

// form data to local storage and push to state
export const setSignUpDataToLocalStorage = props => {
	if (props.accounts && props.userSignUp && props.userSignUp.id) {
		localStorage.setItem(accounts, JSON.stringify(props.accounts));
	}
};

// check authorization
export const helpCheckAuthorization = props => {
	props.users.find(user => {
		if (props.userSignIn && props.userSignIn.phone_or_email) {
			if (user.phone_or_email === props.userSignIn.phone_or_email && user.password === props.userSignIn.password) {
				return user;
			}
		}
	});
};

export const deleteAuthorizationUser = props => {
	if (!props.account) {
		props.isAccount(null);
		localStorage.removeItem(account);
	}
};
