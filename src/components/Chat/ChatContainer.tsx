import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParamsOfMatchType } from "../../types/types";
import { addMessageThunk, deleteMessageThunk, updateChatThunk } from "../../redux/chat-reducer";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { getChatsSelector, getMessagesSelector } from "../../redux/chat-selectors";
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
  updateChatThunk: (chat: ChatType) => void;
  addMessageThunk: (message: MessageType) => void;
  deleteMessageThunk: (message: MessageType) => void;
};

export type ChatContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const ChatContainer = (props: ChatContainerPropsType) => {
  const { id } = useParams<ParamsOfMatchType>();
  const [typing, setTyping] = React.useState<string | null>(null);
  const currentChat: FirebaseType<ChatType> | undefined = id ? props?.chats?.find((chat: ChatType) => chat?.id === id) : undefined;

  React.useEffect(() => {
    currentChat?.data() && props.updateChatThunk({ ...currentChat?.data(), typing: typing });
  }, [typing]);

  return <Chat {...props} currentChat={currentChat} id={id} setTyping={setTyping} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), chats: getChatsSelector(state), messages: getMessagesSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { updateChatThunk, addMessageThunk, deleteMessageThunk })(ChatContainer);
