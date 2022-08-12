import React from "react";
import { createCommentThunk, createReplyThunk, deleteCommentThunk, deletePostThunk, updateCommentThunk, updatePostThunk } from "../../../redux/post-reducer";
import { defaultPostConstant, modalPostConstant, onlyBodyPostConstant } from "../../../core/constants/constantsPost";
import { AccountType, CommentType, FirebaseType, PostType, ReplyType } from "../../../types/types";
import { getAccountSelector, getAccountsSelector } from "../../../redux/account-selectors";
import { getCommentsSelector, setRepliesSelector } from "../../../redux/post-selectors";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { updateAccountThunk } from "../../../redux/account-reducer";
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
  replies: Array<FirebaseType<ReplyType>>;
};

type MapDispatchToPropsType = {
  createCommentThunk: (comment: CommentType) => void;
  createReplyThunk: (reply: ReplyType) => void;
  updateAccountThunk: (account: AccountType) => void;
  updatePostThunk: (post: PostType) => void;
  updateCommentThunk: (comment: CommentType) => void;
  deletePostThunk: (post: PostType) => void;
  deleteCommentThunk: (comment: CommentType) => void;
};

export type PostContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const PostContainer = (props: PostContainerPropsType) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const history = useHistory();

  return <Post {...props} id={id} location={location} history={history} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), comments: getCommentsSelector(state), replies: setRepliesSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { createReplyThunk, deletePostThunk, updateAccountThunk, updatePostThunk, createCommentThunk, updateCommentThunk, deleteCommentThunk })(PostContainer);
