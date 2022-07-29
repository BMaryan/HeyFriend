import React from "react";
import { Field, InjectedFormProps, reduxForm, WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import { AccountType, ChatType, FirebaseType, MediaOfMessageType, MessageType } from "../../../types/types";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { ContainerOfSmiles } from "../../../utils/helperForChat/helperForChat";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { getPictureBase64 } from "../../../core/methods/methods";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MessagesFormDataType } from "./Messages";
import IconButton from "@mui/material/IconButton";
import styles from "./Messages.module.scss";
import Divider from "@mui/material/Divider";

interface ChatFormPropsType extends InputOfMessagePropsType {
  account: AccountType | null;
  currentChat: FirebaseType<ChatType> | undefined;
}

interface InputOfMessagePropsType {
  input?: WrappedFieldInputProps;
  meta?: WrappedFieldMetaProps;
  medias: Array<MediaOfMessageType>;
  messageValue: string;
  setMessageValue: (value: string) => void;
  setMedias: (medias: Array<MediaOfMessageType>) => void;
}

const InputOfMessage = (props: InjectedFormProps<MessagesFormDataType, InputOfMessagePropsType> & InputOfMessagePropsType) => {
  let [emoji, setEmoji] = React.useState<string | null>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {open ? <ContainerOfSmiles open={open} anchorEl={anchorEl} setEmoji={setEmoji} handleClick={handleClick} handleClose={handleClose} /> : undefined}

      <OutlinedInput
        {...props.input}
        type="text"
        placeholder="Search contact"
        fullWidth={true}
        startAdornment={
          <InputAdornment sx={{ height: "100%" }} position="start">
            <IconButton onClick={handleClick} edge="start">
              <SentimentSatisfiedAltIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment sx={{ height: "100%", display: "flex", columnGap: "10px" }} position="end">
            <label htmlFor="icon-button-file">
              <input
                id="icon-button-file"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  getPictureBase64({ event }).then((image: string | undefined) => {
                    image && props.setMedias([...props.medias, { media: image }]);
                  });
                }}
              />
              <IconButton component="span" edge="start">
                <CollectionsOutlinedIcon />
              </IconButton>
            </label>

            <Divider sx={{ height: 28 }} orientation="vertical" />
            <IconButton type="submit" color="primary" sx={{ p: "10px" }} disabled={((props.meta?.invalid || props.meta?.submitting) && !props.meta?.touched) || !props.meta?.dirty} edge="end">
              <SendOutlinedIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

const MessagesForm = (props: InjectedFormProps<MessagesFormDataType, ChatFormPropsType> & ChatFormPropsType) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.form_content}>
        <Field {...props} name={`send_message_${props.currentChat?.id}_${props.account?.id}`} value={props.messageValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setMessageValue(e.target.value)} component={InputOfMessage} />
      </div>
    </form>
  );
};

const MessagesReduxForm = reduxForm<MessagesFormDataType, ChatFormPropsType>({ form: "messages" })(MessagesForm);

export default MessagesReduxForm;
