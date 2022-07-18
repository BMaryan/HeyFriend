import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParamsOfMatchType } from "../../types/types";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { getChatsSelector, getMessagesSelector } from "../../redux/chat-selectors";
import { addMessageThunk, deleteMessageThunk } from "../../redux/chat-reducer";
import { StateType } from "../../redux/store";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Chat from "./Chat";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
};

type MapDispatchToPropsType = {
  addMessageThunk: any;
  deleteMessageThunk: any;
};

export type ChatContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const ChatContainer = (props: ChatContainerPropsType) => {
  const { id } = useParams<ParamsOfMatchType>();

  return <Chat {...props} id={id} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), chats: getChatsSelector(state), messages: getMessagesSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { addMessageThunk, deleteMessageThunk })(ChatContainer);
