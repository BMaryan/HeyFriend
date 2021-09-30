import React from "react";
import Authorization from "./Authorization";
import { compose } from "redux";
import { connect } from "react-redux";
import { getAccountSelector, getAccountsSelector } from "../../redux/profile-selectors";
import { getUserSignInSelector, getUserSignUpSelector } from "../../redux/auth-selectors";
import { setUserSignIn, setUserSignUp } from "../../redux/auth-reducer";
import { helpCheckAuthorization, setSignUpDataToLocalStorage } from "../../utils/helperForAuthorization/helperForAuthorization";
import { addAccount, isAccount } from "../../redux/profile-reducer";
import { account, accounts } from "../../core/constants/constantsLocalStorage";

let AuthorizationContainer = props => {
	React.useEffect(() => {
		if (props.accounts) {
			localStorage.setItem(accounts, JSON.stringify(props.accounts));
		}
	}, [props.accounts]);

	React.useEffect(() => {
		if (props.account) {
			localStorage.setItem(account, JSON.stringify(props.account));
		} else {
			localStorage.removeItem(account);
		}
	}, [props.account]);

	React.useEffect(() => {
		if (props.accounts && props.userSignUp && props.userSignUp.name && props.account) {
			props.addAccount(props.accounts.length + 1, props.account.profile);
		}
	}, [props.userSignUp]);

	return <Authorization {...props} />;
};

let mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
		userSignIn: getUserSignInSelector(state),
		userSignUp: getUserSignUpSelector(state),
	};
};

export default compose(
	connect(mapStateToProps, { setUserSignUp, helpCheckAuthorization, addAccount, setSignUpDataToLocalStorage, isAccount, setUserSignIn })
)(AuthorizationContainer);
