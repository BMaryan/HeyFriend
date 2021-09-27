import React from "react";
import { connect } from "react-redux";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import Edit from "./Edit";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { getProfileData, isAccount } from "../../../redux/profile-reducer";
import { accounts, account } from "../../../core/constants/constantsLocalStorage";

const EditContainer = props => {
	React.useEffect(() => {
		if (props.account) {
			localStorage.setItem(account, JSON.stringify(props.account));
		}
	}, [props.account]);

	// React.useEffect(() => {
	// 	if (props.users && props.accounts.length > 0) {
	// 		localStorage.setItem("users", JSON.stringify(props.users));
	// 	}
	// }, [props.users]);

	React.useEffect(() => {
		if (props.accounts && props.accounts.length > 0) {
			localStorage.setItem(accounts, JSON.stringify(props.accounts));
		}
	}, [props.accounts]);

	let id = Number(props.match.params.id);
	let myProfile = props.accounts.find(profile => (profile && props.account ? profile.id === props.account.id : undefined));

	return <Edit {...props} id={id} />;
};

let mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
	};
};

export default compose(connect(mapStateToProps, { getProfileData, isAccount }), withRouter)(EditContainer);
