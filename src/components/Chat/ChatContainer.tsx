/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { addMessageThunk, createChatThunk, deleteChatThunk, deleteMessageThunk, setMessagesThunk, updateChatThunk, updateMessageThunk } from "../../redux/chat-reducer";
import { AccountType, ChatType, CreateChatType, FirebaseType, HistoryType, MessageType, ParamsOfMatchType } from "../../types/types";
import { getChatsSelector, getMessagesSelector, setChatsLoadingSelector, setErrorSelector, setMessagesLoadingSelector } from "../../redux/chat-selectors";
import { getAccountsSelector, getAccountSelector } from "../../redux/account-selectors";
import { useHistory, useParams } from "react-router-dom";
import { StateType } from "../../redux/store";
import { connect } from "react-redux";
import Chat from "./Chat";

type OwnPropsType = {};

type MapStateToPropsType = {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
  chatsLoading: boolean;
  messagesLoading: boolean;
  error: string | null;
};

type MapDispatchToPropsType = {
  setMessagesThunk: () => void;
  addMessageThunk: (message: MessageType) => void;
  updateChatThunk: (chat: ChatType) => void;
  updateMessageThunk: (message: MessageType) => void;
  deleteChatThunk: (chat: ChatType) => void;
  deleteMessageThunk: (message: MessageType) => void;
  createChatThunk: (data: CreateChatType) => any;
};

export type ChatContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const ChatContainer = (props: ChatContainerPropsType) => {
  const { id } = useParams<ParamsOfMatchType>();
  const history = useHistory<HistoryType>();
  const [typing, setTyping] = React.useState<string | null>(null);
  const [messageValue, setMessageValue] = React.useState<string>("");
  const currentChat: FirebaseType<ChatType> | undefined = id ? props?.chats?.find((chat: FirebaseType<ChatType>) => chat?.id === id) : undefined;

  React.useEffect(() => {
    if (props.messages) {
      props.setMessagesThunk();
    }
  }, [props.messages.length]);

  React.useEffect(() => {
    if (id !== typing) {
      setMessageValue("");
    }
  }, [id]);

  // set account id to typing when a person is writting or null
  React.useEffect(() => {
    currentChat?.data() && props.updateChatThunk({ ...currentChat?.data(), typing: typing });

    window.addEventListener("beforeunload", function (event) {
      currentChat?.data() && props.updateChatThunk({ ...currentChat?.data(), typing: null });
      setMessageValue("");
    });

    return () => {
      currentChat?.data() && props.updateChatThunk({ ...currentChat?.data(), typing: null });

      window.removeEventListener("beforeunload", function (event) {
        currentChat?.data() && props.updateChatThunk({ ...currentChat?.data(), typing: null });
        setMessageValue("");
      });
    };
  }, [typing]);

  React.useEffect(() => {
    if (!messageValue) {
      currentChat?.data() && props.updateChatThunk({ ...currentChat?.data(), typing: null });
    }
  }, [messageValue]);

  return <Chat {...props} messageValue={messageValue} currentChat={currentChat} id={id} history={history} setTyping={setTyping} setMessageValue={setMessageValue} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ accounts: getAccountsSelector(state), account: getAccountSelector(state), chats: getChatsSelector(state), messages: getMessagesSelector(state), chatsLoading: setChatsLoadingSelector(state), messagesLoading: setMessagesLoadingSelector(state), error: setErrorSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { setMessagesThunk, addMessageThunk, updateChatThunk, updateMessageThunk, deleteChatThunk, deleteMessageThunk, createChatThunk })(ChatContainer);
