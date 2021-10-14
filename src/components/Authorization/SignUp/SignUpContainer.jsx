/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUserSignUp } from "../../../redux/auth-reducer";
import { getUserSignUpSelector } from "../../../redux/auth-selectors";
import { addAccount, isAccount } from "../../../redux/profile-reducer";
import { helpCheckAuthorization, setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignUp from "./SignUp";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import { account, accounts } from "../../../core/constants/constantsLocalStorage";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { profileConstant } from "../../../core/constants/constants";

const SignUpContainer = props => {
	React.useEffect(() => {
		if (props.accounts && props.accounts.length > 0) {
			localStorage.setItem(accounts, JSON.stringify(props.accounts));
		}
	}, [props.accounts]);

	React.useEffect(() => {
		if (props.account) {
			localStorage.setItem(account, JSON.stringify(props.account));
		}
	}, [props.account]);

	if (props.account && props.account.id) {
		return <Redirect to={`${profileConstant}`} />;
	}
	return <SignUp {...props} />;
};

const mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
		userSignUp: getUserSignUpSelector(state),
	};
};

export default compose(
	connect(mapStateToProps, {
		setUserSignUp,
		helpCheckAuthorization,
		addAccount,
		setSignUpDataToLocalStorage,
		isAccount,
	}),
	withRouter
)(SignUpContainer);
