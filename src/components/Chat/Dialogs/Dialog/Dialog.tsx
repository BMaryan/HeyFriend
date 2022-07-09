import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../../../types/types";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { chatConstant } from "../../../../core/constants/constants";
// import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import styles from "./Dialog.module.scss";
import Avatar from "@mui/material/Avatar";

interface DialogPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chat: FirebaseType<ChatType>;
  messages: Array<FirebaseType<MessageType>>;
}

const Dialog = (props: DialogPropsType) => {
  const messageWithAccount: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (props?.chat?.data()?.participants ? props?.chat?.data()?.participants?.find((participants: ParticipantsOfChatType) => account?.id === participants?.id && account?.id !== props?.account?.id) : undefined)) : undefined;
  const currentMessages: Array<FirebaseType<MessageType>> = props?.messages?.length > 0 ? props?.messages?.sort((a: FirebaseType<MessageType>, b: FirebaseType<MessageType>) => a?.data()?.date.toDate().getTime() - b?.data()?.date.toDate().getTime())?.filter((message: FirebaseType<MessageType>) => (message?.data() ? (message?.data()?.chatId === props?.chat?.id ? message : []) : [])) : [];

  return (
    <>
      {props?.chat?.data()?.participants
        ? props?.chat?.data()?.participants?.map((item: ParticipantsOfChatType) =>
            item?.id === props?.account?.id ? (
              <NavLink key={item.id} to={messageWithAccount?.data() ? `${chatConstant.path}/` + props?.chat?.data()?.id : ""} className={styles.chat + " " + styles.chat_forHead} activeClassName={styles.chat_active}>
                <ListItem key={item.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={messageWithAccount?.data()?.avatar ? messageWithAccount?.data()?.avatar : defaultAvatar} alt={messageWithAccount?.data() ? messageWithAccount?.data()?.surname + " " + messageWithAccount?.data()?.name : undefined} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
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
                        <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                          {currentMessages?.length > 0 ? currentMessages[currentMessages?.length - 1]?.data()?.message?.length < 20 ? currentMessages[currentMessages?.length - 1]?.data()?.message : currentMessages[currentMessages?.length - 1]?.data()?.message?.slice(0, 20) + "..." : <>Send a message</>}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </NavLink>
            ) : // <NavLink key={item.id} to={messageWithAccount?.data() ? `${chatConstant.path}/` + props?.chat?.data()?.id : ""} className={styles.chat + " " + styles.chat_forHead} activeClassName={styles.chat_active}>
            //   <div className={styles.wrapper_picture}>
            //     <div className={styles.have_not_picture + " " + styles.have_not_picture_forHead}>
            //       {!messageWithAccount?.data() ? (
            //         <div className={styles.wrapper_icon}>
            //           <FontAwesomeIcon className={styles.icon} icon={faBookmark} />
            //         </div>
            //       ) : (
            //         <img src={messageWithAccount?.data()?.avatar ? messageWithAccount?.data()?.avatar : defaultAvatar} alt="" />
            //       )}
            //     </div>
            //   </div>
            //   <div>
            //     <div className={styles.login}>{messageWithAccount?.data() ? messageWithAccount?.data()?.surname + " " + messageWithAccount?.data()?.name : undefined}</div>

            //     <div className={styles.message}>{currentMessages[currentMessages.length - 1].data().message ? currentMessages[currentMessages.length - 1].data().message : <></>}</div>
            //   </div>
            // </NavLink>
            undefined
          )
        : undefined}
    </>
  );
};

export default Dialog;
