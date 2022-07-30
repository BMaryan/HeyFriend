import React from "react";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { AccountType, CommentType, FirebaseType, PostType } from "../../types/types";
import { getCommentsSelector, setErrorSelector, setLoadingSelector, setPostsSelector } from "../../redux/post-selectors";
import { setCommentsThunk, setPostsThunk } from "../../redux/post-reducer";
import { StateType } from "../../redux/store";
import { connect } from "react-redux";
import Main from "./Main";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  comments: Array<FirebaseType<CommentType>>;
  loading: boolean;
  error: string | null;
};

type MapDispatchToPropsType = {
  setPostsThunk: () => void;
  setCommentsThunk: () => void;
};

export type MainContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const MainContainer = (props: MainContainerPropsType) => {
  React.useEffect(() => {
    if (props.posts) {
      props.setPostsThunk();
    }
  }, [props?.posts?.length]);

  React.useEffect(() => {
    if (props.comments) {
      props.setCommentsThunk();
    }
  }, [props.comments.length]);

  return <Main {...props} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), posts: setPostsSelector(state), comments: getCommentsSelector(state), loading: setLoadingSelector(state), error: setErrorSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { setPostsThunk, setCommentsThunk })(MainContainer);
