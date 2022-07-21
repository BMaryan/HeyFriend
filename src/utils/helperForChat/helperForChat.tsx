import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType } from "../../types/types";
import dialogStyles from "../../components/Chat/Dialogs/Dialog/Dialog.module.scss";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../core/constants/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Avatar, Button, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import styles from "./helperForChat.module.scss";
import InfoIcon from "@mui/icons-material/Info";
import ModeIcon from "@mui/icons-material/Mode";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
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

interface HeadPropsType {
  account: AccountType | null;
  typingOfAccount: FirebaseType<AccountType> | undefined;
  toggleShowContent: boolean;
  toggleDetails: boolean;
  chatWithAccount: FirebaseType<AccountType> | undefined;
  setToggleDetails: (detail: boolean) => void;
}

export const Head = (props: HeadPropsType) => {
  const lastSignInDate = new Date(props.chatWithAccount?.data()?.metadata?.lastSignInTime as string);
  const isOnline = Boolean(props?.chatWithAccount?.data()?.isOnline);

  return props.toggleShowContent ? (
    <div className={styles.head + " " + styles.head_dialogs}>
      <div className={styles.head_dialogs_title}>Chats</div>

      <div className={styles.head_dialogs_title}>
        <IconButton className={styles.icon}>
          <ModeIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  ) : (
    <div className={styles.head + " " + styles.head_messages}>
      <div>
        <NavLink key={props?.chatWithAccount?.id} to={`${profileConstant.path}/${props?.chatWithAccount?.id}`} className={dialogStyles.chat_forHead}>
          <div className={dialogStyles.wrapper_picture}>
            <div className={dialogStyles.have_not_picture_forHead}>
              {props?.chatWithAccount?.data() ? (
                <StyledBadge overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                  <img src={props?.chatWithAccount?.data()?.avatar ? props?.chatWithAccount?.data()?.avatar : defaultAvatar} alt="" />
                </StyledBadge>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <div className={dialogStyles.login}>{props?.chatWithAccount?.data() ? props?.chatWithAccount?.data()?.surname + " " + props?.chatWithAccount?.data()?.name : <></>}</div>
            <div className={dialogStyles.date}>{props.typingOfAccount ? `${props.typingOfAccount?.data().surname} ${props.typingOfAccount?.data().name} is typing ...` : !isOnline ? `In the network ${moment(lastSignInDate).fromNow()}` : "Now in the network"}</div>
          </div>
        </NavLink>
      </div>

      <div>
        <IconButton className={styles.icon} onClick={() => props.setToggleDetails(!props.toggleDetails)}>
          {props.toggleDetails ? <InfoOutlinedIcon className={styles.icon} /> : <InfoIcon className={styles.icon_active} />}
        </IconButton>
      </div>
    </div>
  );
};

interface ChatDetailsPropsType {
  chatWithAccount: FirebaseType<AccountType> | undefined;
  currentChat: FirebaseType<ChatType> | undefined;
}

export const ChatDetails = (props: ChatDetailsPropsType) => {
  return (
    <div className={styles.chat_details}>
      <NavLink className={styles.head_detail} to={`${profileConstant.path}/${props.chatWithAccount?.id}`}>
        {/* <StyledBadge overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot"> */}
        <Avatar className={styles.head_detail_avatar} src={props.chatWithAccount?.data().avatar || defaultAvatar} />
        {/* </StyledBadge> */}
      </NavLink>

      <div className={styles.body_detail}>
        <div>
          <NavLink className={styles.body_detail_fullName} to={`${profileConstant.path}/${props.chatWithAccount?.id}`}>
            {props.chatWithAccount?.data() ? props.chatWithAccount?.data()?.surname + " " + props.chatWithAccount?.data()?.name : undefined}
          </NavLink>
        </div>

        <div className={styles.body_detail_status}>{props.chatWithAccount?.data().status ? props.chatWithAccount?.data().status : undefined}</div>
      </div>

      <div className={styles.footer_detail}>
        <Button fullWidth={true} className={styles.footer_detail_button} variant="outlined" color="error">
          Delete
        </Button>
      </div>
    </div>
  );
};

interface DefaultViewMessagesPropsType {}

export const DefaultViewMessages = (props: DefaultViewMessagesPropsType) => {
  return (
    <div className={styles.default_view_messages}>
      <div className={styles.wrapper_icon}>{/* <FontAwesomeIcon className={styles.icon} icon={faPaperPlane} /> */}</div>
      <div className={styles.title}>Your Messages</div>
      <div className={styles.subtitle}>Send private photos and messages to a friend or group</div>
      <div className={styles.wrapper_button}>
        <button>Send Message</button>
      </div>
    </div>
  );
};

interface ContainerOfSmilesPropsType {
  anchorEl: null | HTMLElement;
  open: boolean;
  setEmoji?: (emoji: number) => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}

export const ContainerOfSmiles = (props: ContainerOfSmilesPropsType) => {
  const smiles: { smile: number }[] = [];

  for (let i = 128512; i <= 128580; i++) {
    smiles.push({ smile: i });
  }

  return (
    <Menu className={styles.conteiner_of_smiles} anchorEl={props.anchorEl} open={props.open} onClose={props.handleClose} transformOrigin={{ horizontal: "left", vertical: "bottom" }} anchorOrigin={{ horizontal: "left", vertical: "top" }}>
      {smiles.map((smile, index) => (
        <IconButton key={index} onClick={(e: any) => props?.setEmoji && props?.setEmoji(e.target.innerText.codePointAt(0))} className={styles.smile_button}>
          {String.fromCodePoint(smile.smile)}
        </IconButton>
      ))}
    </Menu>
  );
};

interface ContainerOfMessagePropsType {
  open: boolean;
  anchorEl: null | HTMLElement;
  message: FirebaseType<MessageType>;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  deleteMessageThunk: (message: MessageType) => void;
}

export const ContainerOfMessage = (props: ContainerOfMessagePropsType) => {
  return (
    <Menu className={styles.conteiner_of_message} anchorEl={props.anchorEl} open={props.open} onClose={props.handleClose} transformOrigin={{ horizontal: "left", vertical: "bottom" }} anchorOrigin={{ horizontal: "left", vertical: "top" }}>
      <MenuItem className={styles.menu_item}>Edit</MenuItem>
      <MenuItem className={styles.menu_item} onClick={() => props.deleteMessageThunk(props.message.data())}>
        Delete
      </MenuItem>
    </Menu>
  );
};
