import React from "react";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { getChatsSelector, getMessagesSelector } from "../../redux/chat-selectors";
import { AccountType, ChatType, MessageType, ParamsOfMatchType } from "../../types/types";
import { addMessageThunk } from "../../redux/chat-reducer";
import { StateType } from "../../redux/store";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Chat from "./Chat";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<AccountType>;
  account: AccountType | null;
  chats: Array<ChatType>;
  messages: Array<MessageType>;
};

type MapDispatchToPropsType = {
  addMessageThunk: any;
};

export type ChatContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const ChatContainer = (props: ChatContainerPropsType) => {
  const { id } = useParams<ParamsOfMatchType>();

  return <Chat {...props} id={id} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
    chats: getChatsSelector(state),
    messages: getMessagesSelector(state),
  };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { addMessageThunk })(ChatContainer);
