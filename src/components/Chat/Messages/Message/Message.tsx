import React from "react";
import { AccountType, FirebaseType, MediaOfMessageType, MessageType } from "../../../../types/types";
import { ContainerOfMessage } from "../../../../utils/helperForChat/helperForChat";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../../../core/constants/constants";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
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
  chatWithAccounts: Array<FirebaseType<AccountType>>;
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

  const isMyAccount: boolean = props?.message?.data()?.accountId === props?.account?.id;
  const checkDateOfMessage = props.prevMessage?.data().date && props.message?.data().date && props.prevMessage?.data().date.toDate().toLocaleDateString() !== props.message?.data().date.toDate().toLocaleDateString();
  // const checkMessageOfAccount = props.prevMessage?.data().accountId !== props.message?.data().accountId || checkDateOfMessage;
  const currentOtherAccount: FirebaseType<AccountType> | undefined = props.chatWithAccounts.find((account: FirebaseType<AccountType>) => account.id === props.message.data().accountId);

  return (
    <div>
      {checkDateOfMessage && (
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
          {/* {checkMessageOfAccount && ( */}
          <NavLink to={`${profileConstant.path}/${isMyAccount ? props?.account?.id : currentOtherAccount?.data()?.id}`}>
            <img src={isMyAccount ? props?.account?.avatar || defaultAvatar : currentOtherAccount?.data()?.avatar ? currentOtherAccount?.data()?.avatar : defaultAvatar} alt="" />
          </NavLink>
          {/* )} */}
        </div>

        <div className={styles.wrapper_message_content}>
          {/* media */}
          {props?.message?.data()?.medias.length > 0 && (
            <ImageList variant="quilted" cols={props?.message?.data()?.medias.length < 3 ? props?.message?.data()?.medias.length : 3} rowHeight={150}>
              {props?.message?.data()?.medias.map((media: MediaOfMessageType, index: number) => (
                // cols={(index % 2) + 2 === 0 ? 2 : 1} rows={(index % 2) - 1 === 0 ? 1 : 2}
                <ImageListItem key={index}>
                  <img src={media.media} srcSet={media.media} alt="" loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}

          {/* message */}
          {props?.message?.data()?.message && (
            <div className={`${styles.wrapper_message} ${isMyAccount ? styles.wrapper_message_myMessage : ""}`}>
              <div className={`${isMyAccount ? styles.myMessage : styles.otherMessage} ${styles.message}`}>{props?.message?.data()?.message}</div>
            </div>
          )}

          {/* date */}
          <div className={`${styles.message_date} ${isMyAccount ? styles.message_date_myMessage : styles.message_date_otherMessage}`} title={props?.message?.data()?.date.toDate().toLocaleDateString() + " | " + props?.message?.data()?.date.toDate().toLocaleTimeString()}>
            {moment(props?.message?.data()?.date.toDate()).fromNow()}
          </div>

          {/* to display buttons when cursor is on hover */}
          {toggleIcon ? (
            <>
              <div className={`${isMyAccount ? styles.wrapper_my_toggle_buttons : styles.wrapper_other_toggle_buttons}`}>
                <IconButton onClick={handleClick}>
                  <MoreHorizIcon fontSize="small" className={styles.icon} />
                </IconButton>
              </div>

              {/* {open ? <ContainerOfSmiles open={open} anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose} /> : undefined} */}
            </>
          ) : undefined}
        </div>

        {/* conteiner of message for editing */}
        {open ? <ContainerOfMessage open={open} anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose} message={props.message} deleteMessageThunk={props.deleteMessageThunk} /> : undefined}
      </div>
    </div>
  );
};

export default Message;
