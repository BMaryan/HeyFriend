import React from "react";
import { connect } from "react-redux";
import { getAccountSelector, getAccountsSelector } from "../../../redux/profile-selectors";
import Post from "./Post";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { savePost, putLike, takeLike, deleteSavedPost, unFollowing, deletePost, getProfileData, addComment, updateAccountThunk } from "../../../redux/profile-reducer";
import { createCommentThunk, deletePostThunk, updateCommentThunk, updatePostThunk } from "../../../redux/post-reducer";
import { getCommentsSelector } from "../../../redux/post-selectors";

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

export default compose(connect(mapStateToProps, { savePost, putLike, takeLike, deleteSavedPost, unFollowing, deletePost, getProfileData, addComment, deletePostThunk, updateAccountThunk, updatePostThunk, createCommentThunk, updateCommentThunk }), withRouter)(PostContainer);
