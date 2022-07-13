import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../../../types/types";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { chatConstant } from "../../../../core/constants/constants";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import styles from "./Dialog.module.scss";
import Avatar from "@mui/material/Avatar";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

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
}

const Dialog = (props: DialogPropsType) => {
  const messageWithAccount: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (props?.chat?.data()?.participants ? props?.chat?.data()?.participants?.find((participants: ParticipantsOfChatType) => account?.id === participants?.id && account?.id !== props?.account?.id) : undefined)) : undefined;
  const currentMessages: Array<FirebaseType<MessageType>> = props?.messages?.length > 0 ? props?.messages?.sort((a: FirebaseType<MessageType>, b: FirebaseType<MessageType>) => a?.data()?.date.toDate().getTime() - b?.data()?.date.toDate().getTime())?.filter((message: FirebaseType<MessageType>) => message?.data()?.chatId === props?.chat?.id) : [];

  const lastSignInDate = new Date(messageWithAccount?.data()?.metadata?.lastSignInTime as string);
  const isOnline = Boolean(messageWithAccount?.data()?.isOnline);

  return (
    <>
      {props?.chat?.data()?.participants
        ? props?.chat?.data()?.participants?.map((item: ParticipantsOfChatType) =>
            item?.id === props?.account?.id ? (
              <NavLink key={item.id} to={messageWithAccount?.data() ? `${chatConstant.path}/` + props?.chat?.data()?.id : ""} className={styles.chat + " " + styles.chat_forHead} activeClassName={styles.chat_active}>
                <ListItem key={item.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <StyledBadge overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                      <Avatar src={messageWithAccount?.data()?.avatar ? messageWithAccount?.data()?.avatar : defaultAvatar} alt={messageWithAccount?.data() ? messageWithAccount?.data()?.surname + " " + messageWithAccount?.data()?.name : undefined} />
                    </StyledBadge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="span" variant="body2" color="text.primary">
                        <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                          {messageWithAccount?.data() ? messageWithAccount?.data()?.surname + " " + messageWithAccount?.data()?.name : undefined}
                        </Typography>
                        <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                          {currentMessages?.length > 0 ? currentMessages[currentMessages?.length - 1]?.data()?.date?.toDate().toDateString() : undefined}
                        </Typography>
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.secondary.light">
                          {currentMessages?.length > 0 ? (currentMessages[currentMessages?.length - 1]?.data()?.message?.length < 20 ? currentMessages[currentMessages?.length - 1]?.data()?.message : currentMessages[currentMessages?.length - 1]?.data()?.message?.slice(0, 20) + "...") : "In the network " + lastSignInDate?.toLocaleDateString() + " " + lastSignInDate?.toLocaleTimeString()}
                        </Typography>
                      </React.Fragment>
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
