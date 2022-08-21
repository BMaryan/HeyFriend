import React from "react";
import { AccountType, ChatType, CreateChatType, FirebaseType, HistoryType, MediaOfMessageType, MessageType, ParticipantsOfChatType } from "../../types/types";
import { Avatar, Button, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, OutlinedInput } from "@mui/material";
import { chatConstant, profileConstant } from "../../core/constants/constants";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import styles from "./helperForChat.module.scss";
import InfoIcon from "@mui/icons-material/Info";
import { NavLink } from "react-router-dom";
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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

// import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AcUnitIcon from "@mui/icons-material/AcUnit";
import { fb } from "../../firebase";
import CustomAvatarBadge from "../../components/atoms/AvatarBadge/AvatarBadge";
import CustomAvatarGroup from "../../components/atoms/AvatarGroup/AvatarGroup";
import CustomAvatar from "../../components/atoms/Avatar/Avatar";

interface HeadPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  typingOfAccount: FirebaseType<AccountType> | undefined;
  toggleShowContent: boolean;
  toggleDetails: boolean;
  currentChat: FirebaseType<ChatType> | undefined;
  chatWithAccounts: Array<FirebaseType<AccountType>>;
  history: HistoryType;
  setToggleDetails: (detail: boolean) => void;
  createChatThunk: (data: CreateChatType) => any;
}

export const Head = (props: HeadPropsType) => {
  const [openCreateGroup, setOpenCreateGroup] = React.useState(false);
  const lengthChatOfAccounts = props.chatWithAccounts.length < 2;
  const lastSignInDate = lengthChatOfAccounts ? new Date(props.chatWithAccounts[0]?.data()?.metadata?.lastSignInTime as string) : "";
  const isOnline = lengthChatOfAccounts ? Boolean(props?.chatWithAccounts[0]?.data()?.isOnline) : "";

  return props.toggleShowContent ? (
    <div className={styles.head + " " + styles.head_dialogs}>
      <div className={styles.head_dialogs_title}>Chats</div>

      <div className={styles.head_dialogs_title}>
        <IconButton className={styles.icon} onClick={() => setOpenCreateGroup(!openCreateGroup)}>
          <GroupAddOutlinedIcon fontSize="medium" />
        </IconButton>

        {/* toggle container of creating group */}
        {setOpenCreateGroup && <ContainerOfCreatingGroup accounts={props.accounts} account={props.account} open={openCreateGroup} history={props.history} setOpen={setOpenCreateGroup} createChatThunk={props.createChatThunk} />}
      </div>
    </div>
  ) : (
    <div className={styles.head + " " + styles.head_messages}>
      <div>
        {props.toggleDetails ? (
          <Box className={styles.chat_forHead} component={lengthChatOfAccounts ? NavLink : "div"} to={`${profileConstant.path}/${props?.chatWithAccounts[0]?.id}`} onClick={() => !lengthChatOfAccounts && props.setToggleDetails(false)}>
            <div>{lengthChatOfAccounts ? <CustomAvatarBadge color="success" avatarData={props?.chatWithAccounts[0]?.data()} overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" /> : <CustomAvatarGroup avatars={props.chatWithAccounts} max={3} />}</div>
            <div>
              <div className={styles.login}>{lengthChatOfAccounts ? props?.chatWithAccounts[0]?.data()?.surname + " " + props?.chatWithAccounts[0]?.data()?.name : props.currentChat?.data().title}</div>
              <div className={styles.date}>{props.typingOfAccount ? `${props.typingOfAccount?.data().surname} ${props.typingOfAccount?.data().name} is typing ...` : lengthChatOfAccounts ? (!isOnline ? `In the network ${moment(lastSignInDate).fromNow()}` : "Now in the network") : undefined}</div>
            </div>
          </Box>
        ) : (
          <>Details</>
        )}
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
  accounts: Array<FirebaseType<AccountType>>;
  messages: Array<FirebaseType<MessageType>>;
  currentChat: FirebaseType<ChatType> | undefined;
  chatWithAccounts: Array<FirebaseType<AccountType>>;
  history: HistoryType;
  deleteChatThunk: (chat: ChatType) => void;
  deleteMessageThunk: (message: MessageType) => void;
}

export const ChatDetails = (props: ChatDetailsPropsType) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const currentMessagesOfChat: Array<FirebaseType<MessageType>> = props.messages.filter((message: FirebaseType<MessageType>) => message.data().chatId === props.currentChat?.data().id);
  const ownerGroupOfAccount: FirebaseType<AccountType> | undefined = props.accounts.find((account: FirebaseType<AccountType>) => account.id === props.currentChat?.data()?.ownerId);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.chat_details}>
      {/* head */}
      <div className={styles.wrapper_head_detail}>
        {/* contact of owner */}
        <div className={styles.head_detail}>
          <NavLink className={styles.detail_wrapper_avatar} to={`${profileConstant.path}/${ownerGroupOfAccount?.id}`}>
            {ownerGroupOfAccount && <CustomAvatar avatarData={ownerGroupOfAccount?.data()} />}
          </NavLink>

          <NavLink className={styles.detail_fullName} to={`${profileConstant.path}/${ownerGroupOfAccount?.id}`}>
            {ownerGroupOfAccount?.data() ? ownerGroupOfAccount?.data()?.surname + " " + ownerGroupOfAccount?.data()?.name : undefined}
          </NavLink>

          <div className={styles.detail_subtitle}>Owner</div>
        </div>

        {/* participants */}
        <div className={styles.wrapper_participants}>
          {/* <div className={styles.media_title}>Participants</div> */}
          {props.chatWithAccounts.map((account: FirebaseType<AccountType>) => (
            <NavLink key={account.data()?.id} className={styles.detail_fullName} to={`${profileConstant.path}/${account.data()?.id}`}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                  <ListItemIcon>
                    <CustomAvatar avatarData={account.data()} />
                  </ListItemIcon>
                  <ListItemText primary={account.data()?.surname + " " + account.data()?.name} />
                </ListItemButton>
              </List>
            </NavLink>
          ))}
        </div>
      </div>

      {/* body */}
      <div className={styles.body_detail}>
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
                  <div key={index} className={styles.wrapper_media}>
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
  setEditMessage: (value: MessageType | null) => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  deleteMessageThunk: (message: MessageType) => void;
}

export const ContainerOfMessage = (props: ContainerOfMessagePropsType) => {
  return (
    <Menu className={styles.conteiner_of_message} anchorEl={props.anchorEl} open={props.open} onClose={props.handleClose} transformOrigin={{ horizontal: "left", vertical: "bottom" }} anchorOrigin={{ horizontal: "left", vertical: "top" }}>
      <MenuItem className={styles.menu_item} onClick={() => props.setEditMessage(props.message.data())}>
        Edit
      </MenuItem>
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

  console.log(props.medias);

  return (
    <Dialog className={styles.media_dialog} open={props.open}>
      {/* head */}
      <DialogTitle className={styles.dialog_title}>Add message</DialogTitle>

      {/* body */}
      <DialogContent className={styles.dialog_content} dividers>
        <Box sx={{ display: "flex", position: "relative", flexDirection: "column", columnGap: "10px" }}>
          <AutoPlaySwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
            {props.medias.map((media: MediaOfMessageType, index: number) => (
              <div key={index} className={styles.wrapper_media}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <>
                    <Box className={styles.media} component="img" src={media.media} alt="" />

                    {/* position buttons */}
                    <div className={styles.wrapper_position_button}>
                      <IconButton
                        onClick={() => {
                          props.setMedias(props.medias?.filter((item: MediaOfMessageType, itemIndex: number) => index !== itemIndex));
                          props.medias.length > 1 && activeStep !== 0 && setActiveStep(activeStep - 1);
                        }}>
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </div>
                  </>
                ) : null}
              </div>
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

interface ContainerOfCreatingGroupPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  open: boolean;
  history: HistoryType;
  setOpen: (value: boolean) => void;
  createChatThunk: (data: CreateChatType) => any;
}

export const ContainerOfCreatingGroup = (props: ContainerOfCreatingGroupPropsType) => {
  const [selectedAccounts, setSelectedAccounts] = React.useState<Array<FirebaseType<AccountType>>>([]);
  const [titleValue, setTitleValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const foundAccounts: Array<FirebaseType<AccountType>> = props.accounts.filter((account: FirebaseType<AccountType>) => (account.data().surname + " " + account.data().name).toLocaleLowerCase().trim().includes(searchValue.toLocaleLowerCase().trim(), 0) && account.id !== props.account?.id);

  const handleCancel = () => {
    props.setOpen(false);
    setSelectedAccounts([]);
    setTitleValue("");
  };

  const handleCreate = () => {
    const destructuringParticipants = {
      participants: [
        ...selectedAccounts.map((account: FirebaseType<AccountType>) => ({
          id: account.id,
        })),
        { id: props.account?.id as string },
      ],
    };

    props.setOpen(false);
    props
      .createChatThunk(
        selectedAccounts.length > 1
          ? {
              title: titleValue,
              ownerId: props.account?.id,
              ...destructuringParticipants,
              dateCreated: fb.Timestamp.now(),
            }
          : {
              ownerId: props.account?.id,
              ...destructuringParticipants,
              dateCreated: fb.Timestamp.now(),
            }
      )
      .then((res: ParticipantsOfChatType) => props.history.push(`${chatConstant.path}/${res?.id}`));

    setSelectedAccounts([]);
    setTitleValue("");
  };

  return (
    <Dialog sx={{ "& .MuiDialog-paper": { height: "435px", width: "500px" } }} open={props.open}>
      <DialogTitle className={styles.dialog_of_creating_group_title}>Add group</DialogTitle>

      {selectedAccounts.length > 1 && <TextField className={styles.dialog_of_creating_group_field_title} label="Title" variant="outlined" value={titleValue} onChange={(e: any) => setTitleValue(e.target.value)} required helperText={!titleValue && "This field is required, you need to add the name of the group."} />}

      <Autocomplete id="tags-filled" multiple options={[]} freeSolo renderTags={(value: Array<FirebaseType<AccountType>>, getTagProps) => value.map((account: FirebaseType<AccountType>, index: number) => <Chip variant="outlined" label={account.data().surname + " " + account.data().name} {...getTagProps({ index })} />)} value={[...selectedAccounts]} onChange={(event, value, reason) => setSelectedAccounts(value as Array<FirebaseType<AccountType>>)} onInputChange={(event, value, reason) => setSearchValue(value)} renderInput={(params) => <TextField {...params} variant="outlined" label="Add participants & Search" value={searchValue} />} />

      <DialogContent className={styles.dialog_of_creating_group_content} dividers>
        {foundAccounts.length > 0 ? (
          foundAccounts.map((account: FirebaseType<AccountType>, index: number) => (
            <MenuItem key={account.id} onClick={() => (selectedAccounts.find((item: FirebaseType<AccountType>) => item.id === account.id) ? setSelectedAccounts(selectedAccounts.filter((selectedAccount: FirebaseType<AccountType>) => selectedAccount.id !== account.id && [...selectedAccounts])) : setSelectedAccounts([...selectedAccounts, account]))} selected={Boolean(selectedAccounts.find((item: FirebaseType<AccountType>) => item.id === account.id))}>
              {account.data().surname + " " + account.data().name}
            </MenuItem>
          ))
        ) : (
          <div>Empty</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleCreate} disabled={selectedAccounts.length > 1 ? !titleValue : selectedAccounts.length === 0}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
