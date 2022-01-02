/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { getUserSignInSelector, getUserSignUpSelector } from "./redux/auth-selectors";
import { getChatsSelector } from "./redux/chat-selectors";
import { getProfileData, setProfileChats, addAccount, setAccounts, isAccount } from "./redux/profile-reducer";
import { getAccountSelector, getAccountsSelector } from "./redux/profile-selectors";
import { deleteAuthorizationUser, helpCheckAuthorization, setSignUpDataToLocalStorage } from "./utils/helperForAuthorization/helperForAuthorization";
import { accounts, account } from "./core/constants/constantsLocalStorage";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { signInConstant } from "./core/constants/constants";

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
		localStorage.setItem(accounts, JSON.stringify(props.accounts));
	}, [props.accounts]);

	React.useEffect(() => {
		if (props.account) {
			localStorage.setItem(account, JSON.stringify(props.account));
		} else {
			localStorage.removeItem(account);
			if (!props.account) {
				props.history.replace(signInConstant);
			}
		}
	}, [props.account]);

	// name of page in title
	React.useEffect(() => {
	let getArrayOfName = props.location.pathname.split('/');
		let namePage = getArrayOfName[1];

		if(namePage === '') {
			namePage = 'Main'
		} else if(namePage === "account") {
			namePage = "Edit Account";
		}

		document.title = namePage[0].toUpperCase() + namePage.slice(1);
	}, [props.location])

	setSignUpDataToLocalStorage(props);

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
