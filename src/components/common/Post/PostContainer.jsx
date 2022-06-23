import React from "react";
import { createCommentThunk, deleteCommentThunk, deletePostThunk, updateCommentThunk, updatePostThunk } from "../../../redux/post-reducer";
import { getAccountSelector, getAccountsSelector } from "../../../redux/account-selectors";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { updateAccountThunk } from "../../../redux/account-reducer";
import { getCommentsSelector } from "../../../redux/post-selectors";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Post from "./Post";

const PostContainer = (props) => {
  let id = props.match.params.id;
  let location = useLocation();
  let history = useHistory();
  let params = useParams();

  return <Post {...props} id={id} location={location} history={history} params={params} />;
};

let mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    comments: getCommentsSelector(state),
  };
};

export default compose(connect(mapStateToProps, { deletePostThunk, updateAccountThunk, updatePostThunk, createCommentThunk, updateCommentThunk, deleteCommentThunk }), withRouter)(PostContainer);
