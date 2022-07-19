import React from "react";
import { ContainerOfMessage, ContainerOfSmiles } from "../../../../utils/helperForChat/helperForChat";
import { AccountType, FirebaseType, MessageType } from "../../../../types/types";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../../../core/constants/constants";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import styles from "./Message.module.scss";
import Chip from "@mui/material/Chip";
import moment from "moment";

interface MessagePropsType {
  account: AccountType | null;
  message: FirebaseType<MessageType>;
  prevMessage: FirebaseType<MessageType>;
  messageValue: string;
  chatWithAccount: FirebaseType<AccountType> | undefined;
  setMessageValue: (value: string) => void;
  deleteMessageThunk: (message: MessageType) => void;
}

const Message = (props: MessagePropsType) => {
  const [toggleIcon, setToggleIcon] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMyAccount = props?.message?.data()?.id === props?.account?.id;
  const checkDateOfMessage = props.prevMessage?.data().date.toDate().toLocaleDateString() !== props.message?.data().date.toDate().toLocaleDateString();
  const checkMessageOfAccont = props.prevMessage?.data().id !== props.message?.data().id || checkDateOfMessage;

  return (
    <div>
      {props.prevMessage?.data() && checkDateOfMessage && (
        <Divider className={styles.divider}>
          <Chip label={props?.message?.data()?.date.toDate().toDateString()} />
        </Divider>
      )}

      <div
        className={`${isMyAccount ? styles.wrapper_messages_myMessage : styles.wrapper_messages_otherMessage}  ${styles.wrapper_messages}`}
        onMouseEnter={() => setToggleIcon(true)}
        onMouseLeave={() => {
          setToggleIcon(false);
          handleClose();
        }}>
        <div className={`${isMyAccount ? styles.wrapper_myPicture : styles.wrapper_otherPicture}  ${styles.wrapper_picture}`}>
          {checkMessageOfAccont && (
            <NavLink to={`${profileConstant.path}/${isMyAccount ? props?.account?.id : props?.chatWithAccount?.data()?.id}`}>
              <img src={isMyAccount ? props?.account?.avatar || defaultAvatar : props?.chatWithAccount?.data()?.avatar ? props?.chatWithAccount?.data()?.avatar : defaultAvatar} alt="" />
            </NavLink>
          )}
        </div>

        <div className={styles.wrapper_message_content}>
          <div className={`${styles.wrapper_message} ${isMyAccount ? styles.wrapper_message_myMessage : ""}`}>
            <div className={`${isMyAccount ? styles.myMessage : styles.otherMessage} ${styles.message}`}>{props?.message?.data()?.message}</div>

            {toggleIcon ? (
              <>
                <div>
                  <IconButton onClick={handleClick}>
                    <MoreHorizIcon fontSize="small" className={styles.icon} />
                  </IconButton>
                </div>

                {/* {open ? <ContainerOfSmiles open={open} anchorEl={anchorEl}  handleClick={handleClick} handleClose={handleClose} /> : undefined} */}
              </>
            ) : undefined}
          </div>

          <div className={`${styles.message_date} ${isMyAccount ? styles.message_date_myMessage : styles.message_date_otherMessage}`} title={props?.message?.data()?.date.toDate().toLocaleDateString() + " | " + props?.message?.data()?.date.toDate().toLocaleTimeString()}>
            {moment(props?.message?.data()?.date.toDate()).fromNow()}
          </div>
        </div>

        {/* conteiner of message for editing */}
        {open ? <ContainerOfMessage open={open} anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose} message={props.message} deleteMessageThunk={props.deleteMessageThunk} /> : undefined}
      </div>
    </div>
  );
};

export default Message;
