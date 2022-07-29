import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../../../types/types";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { chatConstant } from "../../../../core/constants/constants";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import styles from "./Dialog.module.scss";
import Avatar from "@mui/material/Avatar";
import { Skeleton } from "@mui/material";
import Badge from "@mui/material/Badge";
import moment from "moment";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    height: "10px",
    width: "10px",
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    borderRadius: "50%",

    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface DialogPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chat: FirebaseType<ChatType>;
  messages: Array<FirebaseType<MessageType>>;
  loading: boolean;
  searchValue: string;
}

const Dialog = (props: DialogPropsType) => {
  const messageWithAccount: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (props?.chat?.data()?.participants ? props?.chat?.data()?.participants?.find((participants: ParticipantsOfChatType) => account?.id === participants?.id && account?.id !== props?.account?.id) : undefined)) : undefined;
  const currentMessages: Array<FirebaseType<MessageType>> = props?.messages?.length > 0 ? props?.messages?.sort((a: FirebaseType<MessageType>, b: FirebaseType<MessageType>) => a?.data()?.date.toDate().getTime() - b?.data()?.date.toDate().getTime())?.filter((message: FirebaseType<MessageType>) => message?.data()?.chatId === props?.chat?.id) : [];

  // const lastSignInDate = new Date(messageWithAccount?.data()?.metadata?.lastSignInTime as string);
  const lastLoginAt = new Date(Number(messageWithAccount?.data()?.metadata?.lastLoginAt));
  const isOnline = Boolean(messageWithAccount?.data()?.isOnline);
  const lastMessage = currentMessages[currentMessages?.length - 1]?.data()?.message;

  return (
    <>
      {props?.chat?.data()?.participants
        ? props?.chat?.data()?.participants?.map((item: ParticipantsOfChatType) =>
            item?.id === props?.account?.id ? (
              <NavLink key={item.id} to={messageWithAccount?.data() ? `${chatConstant.path}/` + props?.chat?.data()?.id : ""} className={styles.chat + " " + styles.chat_forHead} activeClassName={styles.chat_active}>
                <ListItem key={item.id} alignItems="flex-start">
                  <ListItemAvatar>
                    {props.loading ? (
                      <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) : (
                      <StyledBadge overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                        <Avatar src={messageWithAccount?.data()?.avatar ? messageWithAccount?.data()?.avatar : defaultAvatar} alt={messageWithAccount?.data() ? messageWithAccount?.data()?.surname + " " + messageWithAccount?.data()?.name : undefined} />
                      </StyledBadge>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      props.loading ? (
                        <Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 6 }} />
                      ) : (
                        <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="span" variant="body2" color="text.primary">
                          <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                            {messageWithAccount?.data() ? messageWithAccount?.data()?.surname + " " + messageWithAccount?.data()?.name : undefined}
                          </Typography>
                          <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.secondary">
                            {currentMessages?.length > 0 ? moment(currentMessages[currentMessages?.length - 1]?.data()?.date?.toDate()).fromNow() : undefined}
                          </Typography>
                        </Typography>
                      )
                    }
                    secondary={
                      props.loading ? (
                        <Skeleton animation="wave" height={10} width="40%" />
                      ) : (
                        <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.secondary">
                          {currentMessages?.length > 0 && lastMessage !== "" ? (lastMessage?.length < 20 ? lastMessage : lastMessage?.slice(0, 20) + "...") : !isOnline ? "In the network " + moment(lastLoginAt).fromNow() : "Now in the network"}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
              </NavLink>
            ) : undefined
          )
        : undefined}
    </>
  );
};

export default Dialog;
