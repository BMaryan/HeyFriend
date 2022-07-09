import React from "react";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { AccountType, FirebaseType, PostType } from "../../types/types";
import { setPostsSelector } from "../../redux/post-selectors";
import { StateType } from "../../redux/store";
import { connect } from "react-redux";
import Main from "./Main";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
};

type MapDispatchToPropsType = {};

export type MainContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const MainContainer = (props: MainContainerPropsType) => {
  return <Main {...props} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    posts: setPostsSelector(state),
  };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, {})(MainContainer);
