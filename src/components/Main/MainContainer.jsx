import React from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { setPostsSelector } from "../../redux/post-selectors";

const MainContainer = (props) => {
  return <Main {...props} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    posts: setPostsSelector(state),
  };
};

export default connect(mapStateToProps, {})(MainContainer);
