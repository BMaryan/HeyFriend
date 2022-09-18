import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType, PostType } from "../../../types/types";
import styles from "./ListSecondaryItem.module.scss";
import Typography from "@mui/material/Typography";
import moment from "moment";

interface DataOfMessagePropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chat: ChatType;
  messages: Array<FirebaseType<MessageType>>;
}

interface ListSecondaryItemPropsType {
  post?: PostType;
  chat?: DataOfMessagePropsType;
}

const ListSecondaryItem = (props: ListSecondaryItemPropsType) => {
  const messageWithAccounts: Array<FirebaseType<AccountType>> = props?.chat?.accounts ? props?.chat?.accounts?.filter((account: FirebaseType<AccountType>) => (props?.chat?.chat?.participants ? props?.chat?.chat?.participants?.find((participants: ParticipantsOfChatType) => account?.id === participants?.id && account?.id !== props?.chat?.account?.id) : undefined)) : [];
  const lengthChatOfAccounts = messageWithAccounts.length < 2;
  const currentMessages: Array<FirebaseType<MessageType>> = props?.chat && props?.chat?.messages?.length > 0 ? props?.chat?.messages?.sort((a: FirebaseType<MessageType>, b: FirebaseType<MessageType>) => a?.data()?.date.toDate().getTime() - b?.data()?.date.toDate().getTime())?.filter((message: FirebaseType<MessageType>) => message?.data()?.chatId === props?.chat?.chat?.id) : [];

  const lastLoginAt = lengthChatOfAccounts ? messageWithAccounts[0]?.data()?.metadata?.lastSignInTime?.toDate() : undefined;
  const isOnline = lengthChatOfAccounts ? Boolean(messageWithAccounts[0]?.data()?.isOnline) : undefined;
  const lastMessage = currentMessages[currentMessages?.length - 1]?.data()?.message;

  return props?.post ? (
    <Typography className={styles.secondary} variant="body2" component="span">
      {props?.post ? props?.post?.dateCreated?.toDate()?.toLocaleDateString() + " " + props?.post?.dateCreated?.toDate()?.toLocaleTimeString() : undefined}
    </Typography>
  ) : props?.chat ? (
    <Typography className={styles.secondary} variant="body2" component="span">
      {currentMessages?.length > 0 && lastMessage !== "" ? (lastMessage?.length < 20 ? lastMessage : lastMessage?.slice(0, 20) + "...") : !isOnline ? "In the network " + moment(lastLoginAt).fromNow() : "Now in the network"}
    </Typography>
  ) : (
    <></>
  );
};

export default ListSecondaryItem;
