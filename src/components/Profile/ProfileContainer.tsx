import React from "react";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { AccountType, ChatType, PostType } from "../../types/types";
import { updateAccountThunk } from "../../redux/account-reducer";
import { setPostsSelector } from "../../redux/post-selectors";
import { getChatsSelector } from "../../redux/chat-selectors";
import { setAuthSelector } from "../../redux/auth-selectors";
import { createChatThunk } from "../../redux/chat-reducer";
import { createPostThunk } from "../../redux/post-reducer";
import { useHistory } from "react-router-dom";
import { StateType } from "../../redux/store";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile";

type OwnPropsType = {
  id: string;
};

type MapStateToPropsType = {
  accounts: Array<AccountType>;
  account: AccountType | null;
  auth: object | null;
  posts: Array<PostType>;
  chats: Array<ChatType>;
};

// fix
type MapDispatchToPropsType = {
  createPostThunk: any;
  updateAccountThunk: any;
  createChatThunk: any;
};

export type ProfileContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const ProfileContainer = (props: ProfileContainerPropsType) => {
  const history = useHistory();
  let { id } = useParams<OwnPropsType>();

  React.useEffect(() => {
    if (id) {
      let isCorrentId = props.accounts.find((account: AccountType) => account?.id === id || undefined);

      if (!isCorrentId) history.push("/not-found");
    }
  }, [id]);

  return <Profile {...props} id={id} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    auth: setAuthSelector(state),
    posts: setPostsSelector(state),
    chats: getChatsSelector(state),
  };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, {
  createPostThunk,
  updateAccountThunk,
  createChatThunk,
})(ProfileContainer);
