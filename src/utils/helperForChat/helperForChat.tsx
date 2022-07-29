import React from "react";
import { AccountType, ChatType, FirebaseType, HistoryType, MediaOfMessageType, MessageType } from "../../types/types";
import { Avatar, Button, InputAdornment, MenuItem, OutlinedInput } from "@mui/material";
import dialogStyles from "../../components/Chat/Dialogs/Dialog/Dialog.module.scss";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { chatConstant, profileConstant } from "../../core/constants/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import styles from "./helperForChat.module.scss";
import InfoIcon from "@mui/icons-material/Info";
import ModeIcon from "@mui/icons-material/Mode";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import moment from "moment";

//
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

//
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import { getPictureBase64 } from "../../core/methods/methods";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { MessagesFormDataType } from "../../components/Chat/Messages/Messages";

//
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

//
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
  history: HistoryType;
  messages: Array<FirebaseType<MessageType>>;
  currentChat: FirebaseType<ChatType> | undefined;
  chatWithAccount: FirebaseType<AccountType> | undefined;
  deleteChatThunk: (chat: ChatType) => void;
  deleteMessageThunk: (message: MessageType) => void;
}

export const ChatDetails = (props: ChatDetailsPropsType) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const currentMessagesOfChat: Array<FirebaseType<MessageType>> = props.messages.filter((message: FirebaseType<MessageType>) => message.data().chatId === props.currentChat?.data().id);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.chat_details}>
      {/* head */}
      <div className={styles.head_detail}>
        <NavLink className={styles.detail_wrapper_avatar} to={`${profileConstant.path}/${props.chatWithAccount?.id}`}>
          <Avatar className={styles.detail_avatar} src={props.chatWithAccount?.data().avatar || defaultAvatar} />
        </NavLink>

        <NavLink className={styles.detail_fullName} to={`${profileConstant.path}/${props.chatWithAccount?.id}`}>
          {props.chatWithAccount?.data() ? props.chatWithAccount?.data()?.surname + " " + props.chatWithAccount?.data()?.name : undefined}
        </NavLink>

        <div className={styles.detail_status}>{props.chatWithAccount?.data().status ? props.chatWithAccount?.data().status : undefined}</div>
      </div>

      {/* body */}
      <div className={styles.body_detail}>
        {/* <div className={styles.wrapper_participants}>
          <div className={styles.media_title}>Participants</div>

          <NavLink className={styles.detail_fullName} to={`${profileConstant.path}/${props.chatWithAccount?.id}`}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon>
                  <Avatar src={props?.chatWithAccount?.data()?.avatar || defaultAvatar} alt="" />
                </ListItemIcon>
                <ListItemText primary={props?.chatWithAccount?.data()?.surname + " " + props?.chatWithAccount?.data()?.name} />
              </ListItemButton>
            </List>
          </NavLink>
        </div> */}

        <div className={styles.wrapper_details}>
          <div className={styles.wrapper_detail}>
            <div className={styles.detail_count}>{currentMessagesOfChat.length}</div>
            <div className={styles.detail_title}>Messages</div>
          </div>

          <div className={styles.wrapper_detail}>
            <div className={styles.detail_count}>{props.currentChat?.data()?.participants?.length}</div>
            <div className={styles.detail_title}>Participants</div>
          </div>

          <div className={styles.wrapper_detail}>
            <div className={styles.detail_count}>test</div>
            <div className={styles.detail_title}>Medias</div>
          </div>
        </div>

        <div className={styles.wrapper_medias}>
          <div className={styles.media_title}>Medias</div>

          <div className={styles.media_content}>
            {currentMessagesOfChat.map((message: FirebaseType<MessageType>) =>
              message.data().medias ? (
                message.data().medias.map((media: MediaOfMessageType, index: number) => (
                  <div key={index} className={styles.media}>
                    <img src={media.media} alt="" />
                  </div>
                ))
              ) : (
                <>y</>
              )
            )}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className={styles.footer_detail}>
        <Button
          className={styles.footer_detail_button}
          onClick={() => {
            props.currentChat && props.deleteChatThunk(props.currentChat.data());
            currentMessagesOfChat.map((message: FirebaseType<MessageType>) => props.deleteMessageThunk(message.data()));
            props.history.push(`${chatConstant.path}`);
          }}
          color="error"
          variant="outlined"
          fullWidth={true}>
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
  setEmoji?: (emoji: string) => void;
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

interface ContainerOfMessageAndMediaPropsType {
  open: boolean;
  messageValue: string;
  medias: Array<MediaOfMessageType>;
  setOpen: (value: boolean) => void;
  setMessageValue: (value: string) => void;
  setMedias: (medias: Array<MediaOfMessageType>) => void;
  onSubmit: (formData: MessagesFormDataType) => void;
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const ContainerOfMessageAndMedia = (props: ContainerOfMessageAndMediaPropsType) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.medias.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    props.setOpen(!props.open);
    props.setMedias([]);
    props.setMessageValue("");
  };

  const handleSend = () => {
    props.setOpen(!props.open);
    props.setMedias([]);
    props.setMessageValue("");
    props.onSubmit({ send_message: props.messageValue });
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Dialog className={styles.media_dialog} open={props.open}>
      {/* head */}
      <DialogTitle className={styles.dialog_title}>Add message</DialogTitle>

      {/* body */}
      <DialogContent className={styles.dialog_content} dividers>
        <Box sx={{ display: "flex", position: "relative", flexDirection: "column", columnGap: "10px" }}>
          <AutoPlaySwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
            {props.medias.map((step, index) => (
              <div key={index}>{Math.abs(activeStep - index) <= 2 ? <Box className={styles.media} component="img" src={step.media} alt="" /> : null}</div>
            ))}
          </AutoPlaySwipeableViews>

          {props.medias.length > 1 && (
            <MobileStepper
              sx={{ display: "flex", justifyContent: "center" }}
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                activeStep !== maxSteps - 1 && (
                  <IconButton className={styles.stepper_button_back} onClick={handleNext}>
                    {theme.direction === "rtl" ? <KeyboardArrowLeft fontSize="large" /> : <KeyboardArrowRight fontSize="large" />}
                  </IconButton>
                )
              }
              backButton={
                activeStep !== 0 && (
                  <IconButton className={styles.stepper_button_next} onClick={handleBack}>
                    {theme.direction === "rtl" ? <KeyboardArrowRight fontSize="large" /> : <KeyboardArrowLeft fontSize="large" />}
                  </IconButton>
                )
              }
            />
          )}

          <OutlinedInput
            name="test"
            type="text"
            placeholder="Search contact"
            fullWidth={true}
            value={props.messageValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setMessageValue(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <IconButton edge="start">
                  <SentimentSatisfiedAltIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </DialogContent>

      {/* footer */}
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <div className={styles.dialog_action}>
          <label htmlFor="contained-button-file">
            <input
              id="contained-button-file"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                getPictureBase64({ event }).then((image: string | undefined) => {
                  image && props.setMedias([...props.medias, { media: image }]);
                });
              }}
            />
            <Button color="inherit" startIcon={<PermMediaOutlinedIcon />} component="span">
              Add
            </Button>
          </label>
        </div>

        <div className={styles.dialog_action}>
          <Button color="inherit" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="inherit" type="button" onClick={handleSend}>
            Send
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
