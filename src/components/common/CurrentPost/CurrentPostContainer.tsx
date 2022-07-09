import { CircularProgress } from "@mui/material";
import { getAccountSelector } from "../../../redux/account-selectors";
import { setPostsSelector } from "../../../redux/post-selectors";
import { AccountType, FirebaseType, PostType } from "../../../types/types";
import { StateType } from "../../../redux/store";
import { useParams } from "react-router-dom";
import CurrentPost from "./CurrentPost";
import { connect } from "react-redux";
import React from "react";

type OwnPropsType = {};

type MapStateToPropsType = {
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
};

type MapDispatchToPropsType = {};

export type CurrentPostContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const CurrentPostContainer = (props: CurrentPostContainerPropsType) => {
  const { id } = useParams<{ id: string }>();

  if (!props.posts) {
    return (
      <div className="wrapper_loading">
        <CircularProgress className="loading" />
      </div>
    );
  }

  return <CurrentPost {...props} id={id} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    account: getAccountSelector(state),
    posts: setPostsSelector(state),
  };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, {})(CurrentPostContainer);
