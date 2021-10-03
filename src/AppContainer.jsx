/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import App from "./App";
import { getUserSignInSelector, getUserSignUpSelector } from "./redux/auth-selectors";
import { getChatsSelector } from "./redux/chat-selectors";
import { getProfileData, setProfileChats, addAccount, setAccounts, isAccount } from "./redux/profile-reducer";
import { getAccountSelector, getAccountsSelector } from "./redux/profile-selectors";
import { deleteAuthorizationUser, helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";
import { accounts, account } from "./core/constants/constantsLocalStorage";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { signUpConstant } from "./core/constants/constants";

const AppContainer = props => {
	let id = Number(props.match.params.id);

	React.useEffect(() => {
		let accountsP = JSON.parse(localStorage.getItem(accounts));
		let accountP = JSON.parse(localStorage.getItem(account));
		props.setAccounts(accountsP);

		if (accountP) {
			props.isAccount(accountP);
		}
	}, [props.userSignUp]);

	React.useEffect(() => {
		if (props.accounts) {
			localStorage.setItem(accounts, JSON.stringify(props.accounts));
		}
	}, [props.accounts]);

	React.useEffect(() => {
		if (props.account) {
			localStorage.setItem(account, JSON.stringify(props.account));
		}
	}, [props.account]);

	// React.useEffect(() => {
	// 	props.setProfileChats(props.chats);
	// }, [props.chats]);

	setSignUpDataToLocalStorage(props);

	if (!props.account) {
		<Redirect to={`${signUpConstant}`} />;
	}

	return <App {...props} id={id} />;
};

const mapStateToProps = state => {
	return {
		chats: getChatsSelector(state),
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
		userSignIn: getUserSignInSelector(state),
		userSignUp: getUserSignUpSelector(state),
	};
};

export default compose(
	connect(mapStateToProps, {
		isAccount,
		setSignUpDataToLocalStorage,
		helpCheckAuthorization,
		getProfileData,
		deleteAuthorizationUser,
		setProfileChats,
		addAccount,
		setAccounts,
	}),
	withRouter
)(AppContainer);
