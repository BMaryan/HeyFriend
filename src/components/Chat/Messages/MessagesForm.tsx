import React from "react";
import { Field, InjectedFormProps, reduxForm, WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { ContainerOfSmiles } from "../../../utils/helperForChat/helperForChat";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { AccountType } from "../../../types/types";
import { MessagesFormDataType } from "./Messages";
import IconButton from "@mui/material/IconButton";
import styles from "./Messages.module.scss";
import Divider from "@mui/material/Divider";
import { getPictureBase64 } from "../../../core/methods/methods";

interface ChatFormPropsType {
  account: AccountType | null;
  input?: WrappedFieldInputProps;
  meta?: WrappedFieldMetaProps;
  messageValue: string;
  setMessageValue: (value: string) => void;
}

const InputOfMessage = (props: ChatFormPropsType) => {
  const { input, meta, ...restProps } = props;
  const [emoji, setEmoji] = React.useState<number | null>(null);
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
        {...input}
        {...restProps}
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
            <IconButton className={styles.button_media} edge="start">
              <label>
                <CollectionsOutlinedIcon />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    // getPictureBase64({ event: event, method: props.updateAccountThunk, account: props.account, key: "coverPhoto" });
                    // props.setOpenModalCoverProfile(false);
                  }}
                />
              </label>
            </IconButton>
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
        <Field name={`send_message_${props.account?.id}`} value={props.messageValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setMessageValue(e.target.value)} type="text" placeholder="Search contact" component={InputOfMessage} />
      </div>
    </form>
  );
};

const MessagesReduxForm = reduxForm<MessagesFormDataType, ChatFormPropsType>({ form: "messages" })(MessagesForm);

export default MessagesReduxForm;
