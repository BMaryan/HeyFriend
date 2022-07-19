import React from "react";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { AccountType, ChatType, FirebaseType, ParticipantsOfChatType, PostType } from "../../types/types";
import { updateAccountThunk } from "../../redux/account-reducer";
import { setPostsSelector } from "../../redux/post-selectors";
import { getChatsSelector } from "../../redux/chat-selectors";
import { createChatThunk } from "../../redux/chat-reducer";
import { createPostThunk } from "../../redux/post-reducer";
import { useHistory } from "react-router-dom";
import { StateType } from "../../redux/store";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Profile from "./Profile";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  chats: Array<FirebaseType<ChatType>>;
};

type MapDispatchToPropsType = {
  createPostThunk: (post: PostType) => void;
  updateAccountThunk: (account: AccountType) => void;
  createChatThunk: (participants: ParticipantsOfChatType) => any;
};

export type ProfileContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const ProfileContainer = (props: ProfileContainerPropsType) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  React.useEffect(() => {
    if (id) {
      const isCorrentId = props.accounts.find((account: FirebaseType<AccountType>) => account?.id === id || undefined);

      if (!isCorrentId) history.push("/not-found");
    }
  }, [id]);

  return <Profile {...props} id={id} history={history} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), posts: setPostsSelector(state), chats: getChatsSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { createPostThunk, updateAccountThunk, createChatThunk })(ProfileContainer);
