/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUserSignIn } from "../../../redux/auth-reducer";
import { getUserSignInSelector } from "../../../redux/auth-selectors";
import { helpCheckAuthorization } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignIn from "./SignIn";
import { account, accounts } from "../../../core/constants/constantsLocalStorage";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import { isAccount } from "../../../redux/profile-reducer";

const SignInContainer = props => {
	// React.useEffect(() => {
	// 	if (props.accounts) {
	// 		localStorage.setItem(accounts, JSON.stringify(props.accounts));
	// 	}
	// }, [props.accounts]);

	// React.useEffect(() => {
	// 	if (props.account) {
	// 		localStorage.setItem(account, JSON.stringify(props.account));
	// 	} else {
	// 		localStorage.removeItem(account);
	// 	}
	// }, [props.account]);

	// if (props.account && props.account.id) {
	// 	return <Redirect to='/' />;
	// }

	return <SignIn {...props} />;
};

const mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
		userSignIn: getUserSignInSelector(state),
	};
};

// export default connect(mapStateToProps, {
// 	setUserSignIn,
// 	helpCheckAuthorization,
// 	isAccount,
// })(SignInContainer);
