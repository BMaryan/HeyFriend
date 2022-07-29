import React from "react";
import { addMessageThunk, deleteChatThunk, deleteMessageThunk, setChatsThunk, setMessagesThunk, updateChatThunk, updateMessageThunk } from "../../redux/chat-reducer";
import { AccountType, ChatType, FirebaseType, HistoryType, MessageType, ParamsOfMatchType } from "../../types/types";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { getChatsSelector, getMessagesSelector, setErrorSelector, setLoadingSelector } from "../../redux/chat-selectors";
import { StateType } from "../../redux/store";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Chat from "./Chat";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
  loading: boolean;
  error: string | null;
};

type MapDispatchToPropsType = {
  setChatsThunk: () => void;
  setMessagesThunk: () => void;
  addMessageThunk: (message: MessageType) => void;
  updateChatThunk: (chat: ChatType) => void;
  updateMessageThunk: (message: MessageType) => void;
  deleteChatThunk: (chat: ChatType) => void;
  deleteMessageThunk: (message: MessageType) => void;
};

export type ChatContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const ChatContainer = (props: ChatContainerPropsType) => {
  const { id } = useParams<ParamsOfMatchType>();
  const history = useHistory<HistoryType>();
  const [typing, setTyping] = React.useState<string | null>(null);
  const currentChat: FirebaseType<ChatType> | undefined = id ? props?.chats?.find((chat: ChatType) => chat?.id === id) : undefined;

  React.useEffect(() => {
    if (props.chats) {
      props.setChatsThunk();
    }
  }, [props.chats.length]);

  React.useEffect(() => {
    if (props.messages) {
      props.setMessagesThunk();
    }
  }, [props.messages.length]);

  React.useEffect(() => {
    currentChat?.data() && props.updateChatThunk({ ...currentChat?.data(), typing: typing });
  }, [typing]);

  return <Chat {...props} currentChat={currentChat} id={id} history={history} setTyping={setTyping} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), chats: getChatsSelector(state), messages: getMessagesSelector(state), loading: setLoadingSelector(state), error: setErrorSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { setChatsThunk, setMessagesThunk, addMessageThunk, updateChatThunk, updateMessageThunk, deleteChatThunk, deleteMessageThunk })(ChatContainer);
