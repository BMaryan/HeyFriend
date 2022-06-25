import React from "react";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { AccountType, LocationType } from "../../types/types";
import { useLocation } from "react-router-dom";
import { StateType } from "../../redux/store";
import { connect } from "react-redux";
import Friends from "./Friends";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<AccountType>;
  account: AccountType | null;
};

type MapDispatchToPropsType = {};

export type FriendsContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const FriendsContainer = (props: FriendsContainerPropsType) => {
  let location = useLocation<LocationType>();

  return <Friends {...props} location={location} />;
};

let mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, {})(FriendsContainer);
