import React from "react";
import { connect } from "react-redux";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import Edit from "./Edit";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { getProfileData, isAccount } from "../../../redux/profile-reducer";
import { accounts, account } from "../../../core/constants/constantsLocalStorage";
import { Redirect } from "react-router-dom";

const EditContainer = props => {
	React.useEffect(() => {
		if (props.account) {
			localStorage.setItem(account, JSON.stringify(props.account));
		}
	}, [props.account]);

	React.useEffect(() => {
		if (props.accounts && props.accounts.length > 0) {
			localStorage.setItem(accounts, JSON.stringify(props.accounts));
		}
	}, [props.accounts]);

	let id = Number(props.match.params.id);

	if (!props.account) {
		return <Redirect to='/sign_up' />;
	}

	return <Edit {...props} id={id} />;
};

let mapStateToProps = state => {
	return {
		accounts: getAccountsSelector(state),
		account: getAccountSelector(state),
	};
};

export default compose(connect(mapStateToProps, { getProfileData, isAccount }), withRouter)(EditContainer);
