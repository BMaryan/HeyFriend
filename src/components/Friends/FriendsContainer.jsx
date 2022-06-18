import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Friends from "./Friends";
import { withRouter } from "react-router-dom";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";

const FriendsContainer = (props) => {
  return <Friends {...props} />;
};

let mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
  };
};

export default compose(connect(mapStateToProps, {}), withRouter)(FriendsContainer);
