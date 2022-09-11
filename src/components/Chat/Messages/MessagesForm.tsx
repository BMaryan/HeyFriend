/* eslint-disable react-hooks/exhaustive-deps */
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
import ClearIcon from "@mui/icons-material/Clear";
import { MessagesFormDataType } from "./Messages";
import IconButton from "@mui/material/IconButton";
import styles from "./Messages.module.scss";
import Divider from "@mui/material/Divider";

interface ChatFormPropsType extends InputOfMessagePropsType {
  account: AccountType | null;
  currentChat: FirebaseType<ChatType> | undefined;
  onSubmit: (formData: MessagesFormDataType) => void;
}

interface InputOfMessagePropsType {
  input?: WrappedFieldInputProps;
  meta?: WrappedFieldMetaProps;
  medias: Array<MediaOfMessageType>;
  messageValue: string;
  editMessage: MessageType | null;
  setSticker: (sticker: string) => void;
  setEditMessage: (value: MessageType | null) => void;
  setMessageValue: (value: string) => void;
  setMedias: (medias: Array<MediaOfMessageType>) => void;
}

const InputOfMessage = (props: InjectedFormProps<MessagesFormDataType, InputOfMessagePropsType> & InputOfMessagePropsType) => {
  let [emoji, setEmoji] = React.useState<Array<string>>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // if there is edit message than remove value from input
  React.useEffect(() => {
    if (props.editMessage) {
      props.setMessageValue("");
    }
  }, [props.editMessage]);

  // if there is emoji than to set to state
  React.useEffect(() => {
    if (emoji.length > 0) {
      if (!props.editMessage) {
        return props.setMessageValue(props.messageValue + "" + emoji);
      } else {
        return props.setEditMessage({ ...props.editMessage, message: props.editMessage.message + "" + emoji });
      }
    }
  }, [emoji]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {open ? <ContainerOfSmiles open={open} anchorEl={anchorEl} setEmoji={setEmoji} setSticker={props.setSticker} handleClick={handleClick} handleClose={handleClose} /> : undefined}

      <OutlinedInput
        {...props.input}
        type="text"
        placeholder="Message..."
        fullWidth={true}
        value={props.editMessage ? props.editMessage?.message : props.messageValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.editMessage ? props.setEditMessage({ ...props.editMessage, message: e.target.value }) : props.setMessageValue(e.target.value);
        }}
        startAdornment={
          <InputAdornment sx={{ height: "100%" }} position="start">
            <IconButton onClick={handleClick} edge="start">
              <SentimentSatisfiedAltIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment sx={{ height: "100%", display: "flex", columnGap: "10px" }} position="end">
            {props.messageValue && (
              <>
                <IconButton
                  onClick={() => {
                    props.setMessageValue("");
                    props.reset();
                  }}
                  component="span">
                  <ClearIcon />
                </IconButton>
                <Divider sx={{ height: 28 }} orientation="vertical" />
              </>
            )}

            {props.editMessage ? (
              <IconButton onClick={() => props.setEditMessage(null)} component="span">
                <ClearIcon />
              </IconButton>
            ) : (
              <>
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
                  <IconButton component="span">
                    <CollectionsOutlinedIcon />
                  </IconButton>
                </label>
              </>
            )}
            <Divider sx={{ height: 28 }} orientation="vertical" />
            <IconButton type="submit" color="primary" sx={{ p: "10px" }} disabled={!props.editMessage && !props.messageValue && !props.input?.value} edge="end">
              <SendOutlinedIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

const MessagesForm = (props: InjectedFormProps<MessagesFormDataType, ChatFormPropsType> & ChatFormPropsType) => {
  const { onSubmit, ...restProps } = props;
  const nameOfMessage = `send_message_${props.currentChat?.id}_${props.account?.id}`;

  return (
    <form
      className={styles.form}
      // custom submit because full data with emijis doens't go
      onSubmit={(e: any) => {
        e.preventDefault();

        onSubmit({ [nameOfMessage]: e.target[nameOfMessage].value });
      }}>
      <div className={styles.form_content}>
        <Field {...restProps} name={nameOfMessage} component={InputOfMessage} />
      </div>
    </form>
  );
};

const MessagesReduxForm = reduxForm<MessagesFormDataType, ChatFormPropsType>({ form: "messages" })(MessagesForm);

export default MessagesReduxForm;
