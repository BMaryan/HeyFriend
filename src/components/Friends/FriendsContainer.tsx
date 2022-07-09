import React from "react";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { AccountType, FirebaseType, HistoryType } from "../../types/types";
import { useHistory } from "react-router-dom";
import { StateType } from "../../redux/store";
import { connect } from "react-redux";
import Friends from "./Friends";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
};

type MapDispatchToPropsType = {};

export type FriendsContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const FriendsContainer = (props: FriendsContainerPropsType) => {
  const history = useHistory<HistoryType>();

  return <Friends {...props} history={history} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, {})(FriendsContainer);
