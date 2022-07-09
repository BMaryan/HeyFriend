import React from "react";
import { createCommentThunk, deleteCommentThunk, deletePostThunk, updateCommentThunk, updatePostThunk } from "../../../redux/post-reducer";
import { defaultPostConstant, modalPostConstant, onlyBodyPostConstant } from "../../../core/constants/constantsPost";
import { getAccountSelector, getAccountsSelector } from "../../../redux/account-selectors";
import { AccountType, CommentType, FirebaseType, PostType } from "../../../types/types";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { updateAccountThunk } from "../../../redux/account-reducer";
import { getCommentsSelector } from "../../../redux/post-selectors";
import { StateType } from "../../../redux/store";
import { connect } from "react-redux";
import Post from "./Post";

type OwnPropsType = {
  modal: boolean;
  post: FirebaseType<PostType> | undefined;
  kindOfPost: typeof defaultPostConstant | typeof modalPostConstant | typeof onlyBodyPostConstant;
};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  comments: Array<FirebaseType<CommentType>>;
};

type MapDispatchToPropsType = {
  deletePostThunk: any;
  updatePostThunk: any;
  updateAccountThunk: any;
  createCommentThunk: any;
  updateCommentThunk: any;
  deleteCommentThunk: any;
};

export type PostContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const PostContainer = (props: PostContainerPropsType) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();

  return <Post {...props} id={id} location={location} history={history} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), comments: getCommentsSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { deletePostThunk, updateAccountThunk, updatePostThunk, createCommentThunk, updateCommentThunk, deleteCommentThunk })(PostContainer);
