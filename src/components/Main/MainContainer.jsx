import React from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { unFollowing, following } from "../../redux/profile-reducer";
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

export default connect(mapStateToProps, { unFollowing, following })(MainContainer);
