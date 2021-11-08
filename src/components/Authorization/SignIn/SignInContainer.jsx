/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getDefaultAccount, setUserSignIn } from "../../../redux/auth-reducer";
import { getUserSignInSelector } from "../../../redux/auth-selectors";
import { helpCheckAuthorization } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignIn from "./SignIn";
import { account, accounts } from "../../../core/constants/constantsLocalStorage";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import { isAccount, setAccounts } from "../../../redux/profile-reducer";
import defaultAccounts from "../../../defaultAccounts/defaultAccounts";

const SignInContainer = props => {
	React.useEffect(() => {
		if (props.accounts && props.accounts.length > 0) {
			localStorage.setItem(accounts, JSON.stringify(props.accounts));
		} else {
			props.setAccounts([...defaultAccounts]);
		}
	}, [props.accounts]);

	React.useEffect(() => {
		if (props.account) {
			localStorage.setItem(account, JSON.stringify(props.account));
		}
	}, [props.account]);

	if (props.account && props.account.id) {
		return <Redirect to='/' />;
	}

	return <SignIn {...props} />;
};

const mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
		userSignIn: getUserSignInSelector(state),
	};
};

export default connect(mapStateToProps, {
	setUserSignIn,
	helpCheckAuthorization,
	isAccount,
	setAccounts,
	getDefaultAccount,
})(SignInContainer);
