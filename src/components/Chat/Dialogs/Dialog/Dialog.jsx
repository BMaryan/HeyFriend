import React from "react";
import styles from "./Dialog.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { chatConstant } from "../../../../core/constants/constants";

//
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Dialog = (props) => {
  let messageWithAccount = props?.accounts ? props?.accounts?.find((account) => (props?.chat?.data()?.participants?.length > 0 ? props?.chat?.data()?.participants?.find((participants) => account?.id === participants?.id && account?.id !== props?.account?.id) : undefined)) : undefined;
  let currentMessages = props?.messages?.length > 0 ? props?.messages?.sort((a, b) => new Date(a?.data()?.date.toDate()) - new Date(b?.data()?.date.toDate()))?.filter((message) => (message?.data() ? (message?.data()?.chatId === props?.chat?.id ? message : undefined) : undefined)) : undefined;

  // console.log(currentMessages);
  // new Date().toDateString()
  return (
    <>
      {props?.chat?.data()?.participants
        ? props?.chat?.data()?.participants.map((item) =>
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
                        {/* <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                          {currentMessages?.length > 0 ? currentMessages[currentMessages?.length - 1]?.data()?.date?.toDate().toDateString() : undefined}
                        </Typography> */}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                          {currentMessages?.length > 0 ? currentMessages[currentMessages?.length - 1]?.data()?.message.length < 20 ? currentMessages[currentMessages?.length - 1]?.data()?.message : currentMessages[currentMessages?.length - 1]?.data()?.message.slice(0, 20) + "..." : <>Send a message</>}
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
