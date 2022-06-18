import React from "react";
import { connect } from "react-redux";
import { getAccountsSelector, getAccountSelector } from "../../../redux/profile-selectors";
import Edit from "./Edit";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { updateAccountThunk } from "../../../redux/profile-reducer";
import { accounts, account } from "../../../core/constants/constantsLocalStorage";

const EditContainer = (props) => {
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

  return <Edit {...props} id={id} />;
};

let mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
  };
};

export default compose(connect(mapStateToProps, { updateAccountThunk }), withRouter)(EditContainer);
