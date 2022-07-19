import React from "react";
import { authErrorSelector, authLoadingSelector } from "../../../redux/auth-selectors";
import { getAccountSelector } from "../../../redux/account-selectors";
import { updateAccountThunk } from "../../../redux/account-reducer";
import { useHistory, useParams } from "react-router-dom";
import { AccountType } from "../../../types/types";
import { StateType } from "../../../redux/store";
import { connect } from "react-redux";
import Edit from "./Edit";

type OwnPropsType = {};

type MapStateToPropsType = {
  account: AccountType | null;
  authError: string | null;
  loading: boolean;
};

type MapDispatchToPropsType = {
  updateAccountThunk: (account: AccountType) => void;
};

export type EditContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const EditContainer = (props: EditContainerPropsType) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  return <Edit {...props} id={id} history={history} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ account: getAccountSelector(state), loading: authLoadingSelector(state), authError: authErrorSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { updateAccountThunk })(EditContainer);
