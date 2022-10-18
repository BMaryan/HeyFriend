/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AccountType, ChatType, CreateChatType, FirebaseType, HistoryType, MediaOfMessageType, MessageType, ParticipantsOfChatType } from "../../types/types";
import { Button, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Typography } from "@mui/material";
import { copyToClipboard, getPictureBase64, getTextOfStatusOnline } from "../../core/methods/methods";
import { chatConstant, profileConstant } from "../../core/constants/constants";
import { MessagesFormDataType } from "../../components/Chat/Messages/Messages";
import CustomAvatarBadge from "../../components/atoms/AvatarBadge/AvatarBadge";
import CustomAvatarGroup from "../../components/atoms/AvatarGroup/AvatarGroup";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import betaVershion from "../../assets/images/betaVershion.png";
import CustomAvatar from "../../components/atoms/Avatar/Avatar";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MobileStepper from "@mui/material/MobileStepper";
import { autoPlay } from "react-swipeable-views-utils";
import Autocomplete from "@mui/material/Autocomplete";
import DialogTitle from "@mui/material/DialogTitle";
import SwipeableViews from "react-swipeable-views";
import IconButton from "@mui/material/IconButton";
import styles from "./helperForChat.module.scss";
import TextField from "@mui/material/TextField";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import { fb } from "../../firebase";
import Box from "@mui/material/Box";
import moment from "moment";

// stickers
import AsleepSticker from "../../assets/Stickers/asleep.gif";
import CoolSticker from "../../assets/Stickers/cool.gif";
import FightingSticker from "../../assets/Stickers/fighting.gif";
import LikedSticker from "../../assets/Stickers/liked.gif";
import LuckySticker from "../../assets/Stickers/lucky.gif";
import NescientSticker from "../../assets/Stickers/nescient.gif";
import ShockedSticker from "../../assets/Stickers/shocked.gif";
import CryingSticker from "../../assets/Stickers/crying.gif";
import LovedSticker from "../../assets/Stickers/loved.gif";
import NervousSticker from "../../assets/Stickers/nervous.gif";
import HappySticker from "../../assets/Stickers/happy.gif";

interface HeadPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
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
  const lastSignInDate = lengthChatOfAccounts ? props.chatWithAccounts[0]?.data()?.metadata?.lastSignInTime?.toDate() : "";
  const isOnline = lengthChatOfAccounts ? Boolean(props?.chatWithAccounts[0]?.data()?.isOnline) : "";

  // const accountsWhoAreOnline = props.chatWithAccounts.filter((account: FirebaseType<AccountType>) => account.data().isOnline);

  return props.toggleShowContent ? (
    <div className={styles.head + " " + styles.head_dialogs}>
      <div className={styles.head_dialogs_title}>Chats</div>

      <div className={styles.head_dialogs_title}>
        <IconButton className={styles.icon} onClick={() => setOpenCreateGroup(!openCreateGroup)}>
          <GroupAddOutlinedIcon fontSize="medium" />
        </IconButton>

        {/* toggle container of creating group */}
        {setOpenCreateGroup && <ContainerOfCreatingGroup accounts={props.accounts} account={props.account} chats={props.chats} open={openCreateGroup} history={props.history} setOpen={setOpenCreateGroup} createChatThunk={props.createChatThunk} />}
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
              <div className={styles.date}>{props.typingOfAccount ? `${props.typingOfAccount?.data().surname} ${props.typingOfAccount?.data().name} is typing ...` : lengthChatOfAccounts ? (!isOnline ? `${getTextOfStatusOnline(!isOnline)} ${moment(lastSignInDate).fromNow()}` : getTextOfStatusOnline(isOnline)) : undefined}</div>
            </div>
          </Box>
        ) : (
          <div className={styles.detail_fullName}>Details</div>
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

interface ChatListPropsType {
  accountData: AccountType | null | undefined;
  selectedIndex: number;
  handleListItemClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
}

const ChatList = (props: ChatListPropsType) => {
  return (
    <NavLink key={props.accountData?.id} className={styles.detail_fullName} to={`${profileConstant.path}/${props.accountData?.id}`}>
      <List component="nav">
        <ListItemButton selected={props.selectedIndex === 0} onClick={(event) => props.handleListItemClick(event, 0)}>
          <ListItemIcon>{props.accountData && <CustomAvatar avatarData={props.accountData} />}</ListItemIcon>
          <ListItemText primary={props.accountData?.surname + " " + props.accountData?.name} />
        </ListItemButton>
      </List>
    </NavLink>
  );
};

interface ChatDetailsPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
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
  // check who is owner the group
  const ownerAccountOfGroup: FirebaseType<AccountType> | undefined = props.accounts.find((account: FirebaseType<AccountType>) => account.id === props.currentChat?.data()?.ownerId);
  // medias length of message
  const mediasLengthOfMessage: Array<number> = currentMessagesOfChat?.map((message: FirebaseType<MessageType>) => message.data()?.medias?.length);
  // sum of medias
  const sumOfMedias: number = mediasLengthOfMessage?.reduce((previousValue: number, currentItem: number) => previousValue + currentItem, 0);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.chat_details}>
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
            <div className={styles.detail_count}>{sumOfMedias}</div>
            <div className={styles.detail_title}>Medias</div>
          </div>
        </div>

        {/* <div className={styles.wrapper_medias}>
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
        </div> */}
      </div>

      {/* head */}
      <div className={styles.wrapper_head_detail}>
        {/* contact of owner */}
        {/* <div className={styles.head_detail}>
          <NavLink className={styles.detail_wrapper_avatar} to={`${profileConstant.path}/${ownerAccountOfGroup?.id}`}>
            {ownerAccountOfGroup && <CustomAvatar avatarData={ownerAccountOfGroup?.data()} />}
          </NavLink>

          <NavLink className={styles.detail_fullName} to={`${profileConstant.path}/${ownerAccountOfGroup?.id}`}>
            {ownerAccountOfGroup?.data() ? ownerAccountOfGroup?.data()?.surname + " " + ownerAccountOfGroup?.data()?.name : undefined}
          </NavLink>

        </div> */}

        {/* participants */}
        <div className={styles.wrapper_participants}>
          <div className={styles.media_title}>Participants</div>
          <ChatList accountData={ownerAccountOfGroup?.data() || props.account} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
          {(props.currentChat?.data()?.participants?.length as number) > 2 && <div className={styles.detail_subtitle}>Owner</div>}

          {props.chatWithAccounts.map((account: FirebaseType<AccountType>) => ownerAccountOfGroup?.id !== account.id && <ChatList key={account.data()?.id} accountData={account.data()} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />)}
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
  setSticker: (sticker: string) => void;
  setEmoji: (emoji: Array<string>) => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}

export const ContainerOfSmiles = (props: ContainerOfSmilesPropsType) => {
  const smiles: { smile: number }[] = [];
  const stickers: { sticker: string }[] = [{ sticker: HappySticker }, { sticker: LikedSticker }, { sticker: LuckySticker }, { sticker: AsleepSticker }, { sticker: CoolSticker }, { sticker: FightingSticker }, { sticker: NescientSticker }, { sticker: ShockedSticker }, { sticker: CryingSticker }, { sticker: LovedSticker }, { sticker: NervousSticker }];

  for (let i = 128512; i <= 128580; i++) {
    smiles.push({ smile: i });
  }

  return (
    <Menu className={styles.conteiner_of_smiles} anchorEl={props.anchorEl} open={props.open} onClose={props.handleClose} transformOrigin={{ horizontal: "left", vertical: "bottom" }} anchorOrigin={{ horizontal: "left", vertical: "top" }}>
      {/* stikers */}
      <div>
        <Typography className={styles.title_of_smiles} color="text.primary" variant="h6" component="div">
          Stickers
        </Typography>

        <div className={styles.content_of_smiles}>
          {stickers.map((sticker, index: number) => (
            <IconButton key={index} onClick={(e: any) => props.setSticker(e.target.srcset)} className={styles.sticker_button}>
              <img src={sticker.sticker} srcSet={sticker.sticker} alt="" />
            </IconButton>
          ))}
        </div>
      </div>

      {/* smiles */}
      <div>
        <Typography className={styles.title_of_smiles} color="text.primary" variant="h6" component="div">
          Smiles
        </Typography>

        <div className={styles.content_of_smiles}>
          {smiles.map((smile, index) => (
            <IconButton key={index} onClick={(e: any) => props.setEmoji([e.target.innerText])} className={styles.smile_button}>
              {String.fromCodePoint(smile.smile)}
            </IconButton>
          ))}
        </div>
      </div>
    </Menu>
  );
};

interface ContainerOfMessagePropsType {
  account: AccountType | null;
  open: boolean;
  anchorEl: null | HTMLElement;
  message: FirebaseType<MessageType>;
  currentChat: FirebaseType<ChatType> | undefined;
  chatWithAccounts: Array<FirebaseType<AccountType>>;
  setEditMessage: (value: MessageType | null) => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  deleteMessageThunk: (message: MessageType) => void;
}

export const ContainerOfMessage = (props: ContainerOfMessagePropsType) => {
  // check who is owner the group
  // const ownerAccountOfGroup: FirebaseType<AccountType> | undefined = props.chatWithAccounts.find((account: FirebaseType<AccountType>) => account.id === props.currentChat?.data()?.ownerId);

  return (
    <Menu className={styles.conteiner_of_message} anchorEl={props.anchorEl} open={props.open} onClose={props.handleClose} transformOrigin={{ horizontal: "left", vertical: "bottom" }} anchorOrigin={{ horizontal: "left", vertical: "top" }}>
      {props.account?.id === props.message.data().accountId ? (
        <MenuItem
          className={`${styles.menu_item} ${styles.menu_item_error}`}
          onClick={() => {
            props.deleteMessageThunk(props.message.data());
            props.handleClose();
          }}>
          Delete
        </MenuItem>
      ) : (
        <MenuItem
          className={`${styles.menu_item} ${styles.menu_item_error}`}
          onClick={() => {
            props.handleClose();
          }}>
          <img className={styles.item_beta_vershion_picture} src={betaVershion} alt="" />
          Report
        </MenuItem>
      )}

      {props.account?.id === props.message.data().accountId && (
        <MenuItem
          className={styles.menu_item}
          onClick={() => {
            props.setEditMessage(props.message.data());
            props.handleClose();
          }}>
          Edit
        </MenuItem>
      )}

      {props.message.data()?.message && (
        <MenuItem
          className={styles.menu_item}
          onClick={() => {
            copyToClipboard(props.message.data()?.message);
            props.handleClose();
          }}>
          Copy
        </MenuItem>
      )}
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
  const [valueOfMassage, setValueOfMassage] = React.useState(props.messageValue);
  const maxSteps = props.medias.length;

  // reset value from input in messages but save this value in container of creating media
  React.useEffect(() => {
    if (props.open) {
      props.setMessageValue("");
    }
  }, [props.open]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    props.setOpen(!props.open);
    props.setMedias([]);
    setValueOfMassage("");
  };

  const handleSend = () => {
    props.setOpen(!props.open);
    props.setMedias([]);
    setValueOfMassage("");
    props.onSubmit({ send_message: valueOfMassage });
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

          <OutlinedInput name="test" type="text" placeholder="Search contact" fullWidth={true} value={valueOfMassage} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueOfMassage(e.target.value)} />
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
  chats: Array<FirebaseType<ChatType>>;
  open: boolean;
  history: HistoryType;
  setOpen: (value: boolean) => void;
  createChatThunk: (data: CreateChatType) => any;
}

export const ContainerOfCreatingGroup = (props: ContainerOfCreatingGroupPropsType) => {
  const [selectedAccounts, setSelectedAccounts] = React.useState<Array<FirebaseType<AccountType>>>([]);
  const [titleValue, setTitleValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  // search accounts by surname & name
  const foundAccounts: Array<FirebaseType<AccountType>> = props.accounts.filter((account: FirebaseType<AccountType>) => (account.data().surname + " " + account.data().name).toLocaleLowerCase().trim().includes(searchValue.toLocaleLowerCase().trim(), 0) && account.id !== props.account?.id);

  // get chats one by one
  const getMyChatsOneByOne: Array<FirebaseType<ChatType>> = props.chats?.filter((chat: FirebaseType<ChatType>) => selectedAccounts.length < 2 && chat?.data()?.participants.length < 3 && chat?.data()?.participants?.find((participant: ParticipantsOfChatType) => props.account?.id === participant.id));

  // if in group is one by one and a person wants to create a group with the same person than redirect to this chat
  const checkCreatingOfGroup = getMyChatsOneByOne.find((chat: FirebaseType<ChatType>) => chat?.data()?.participants?.find((participant: ParticipantsOfChatType) => selectedAccounts[0]?.id === participant.id));

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
    !checkCreatingOfGroup
      ? props
          .createChatThunk(
            selectedAccounts.length > 1
              ? {
                  title: titleValue,
                  ownerId: props.account?.id,
                  ...destructuringParticipants,
                  dateCreated: fb.Timestamp.now(),
                }
              : {
                  ...destructuringParticipants,
                  dateCreated: fb.Timestamp.now(),
                }
          )
          .then((res: ParticipantsOfChatType) => props.history.push(`${chatConstant.path}/${res?.id}`))
      : props.history.push(`${chatConstant.path}/${checkCreatingOfGroup.data().id}`);

    setSelectedAccounts([]);
    setTitleValue("");
  };

  return (
    <Dialog sx={{ "& .MuiDialog-paper": { height: "100%", maxHeight: "500px", width: "500px" } }} open={props.open}>
      <DialogTitle className={styles.dialog_of_creating_group_title}>Add group</DialogTitle>

      {selectedAccounts.length > 1 && <TextField className={styles.dialog_of_creating_group_field_title} label="Title" variant="outlined" value={titleValue} onChange={(e: any) => setTitleValue(e.target.value)} required helperText={!titleValue && "This field is required, you need to add the name of the group."} />}

      <Autocomplete id="tags-filled" multiple options={[]} freeSolo renderTags={(value: Array<FirebaseType<AccountType>>, getTagProps) => value.map((account: FirebaseType<AccountType>, index: number) => <Chip variant="outlined" label={account.data().surname + " " + account.data().name} {...getTagProps({ index })} />)} value={[...selectedAccounts]} onChange={(event, value, reason) => setSelectedAccounts(value as Array<FirebaseType<AccountType>>)} onInputChange={(event, value, reason) => setSearchValue(value)} renderInput={(params) => <TextField {...params} className={styles.dialog_of_creating_group_autocomplete} variant="outlined" placeholder="Add participants & Search" value={searchValue} />} />

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
