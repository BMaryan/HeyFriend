import { CircularProgress } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { setPostsSelector } from "../../../redux/post-selectors";
import { getAccountSelector, getAccountsSelector } from "../../../redux/profile-selectors";
import CurrentPost from "./CurrentPost";

const CurrentPostContainer = (props) => {
  if (!props.posts) {
    return (
      <div className="wrapper_loading">
        <CircularProgress className="loading" />
      </div>
    );
  }

  return <CurrentPost {...props} />;
};

let mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    posts: setPostsSelector(state),
  };
};

export default connect(mapStateToProps, {})(CurrentPostContainer);
