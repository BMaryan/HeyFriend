import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { MessagesFormDataType } from "./Messages";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import styles from "./Messages.module.scss";
import Divider from "@mui/material/Divider";
import { InputField, WrapperCreateField } from "../../common/FormControls/FormControls";

interface ChatFormPropsType {}

const MessagesForm = (props: InjectedFormProps<MessagesFormDataType, ChatFormPropsType> & ChatFormPropsType) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.form_content}>
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <SentimentSatisfiedAltIcon />
        </IconButton>

        <WrapperCreateField name="send_message" type="text" label="Your message..." variant="standard" helperText="" placeholder="" validate={[]} component={InputField} onReset={props.reset} />

        <IconButton sx={{ p: "10px" }}>
          <CollectionsOutlinedIcon />
        </IconButton>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton type="submit" color="primary" sx={{ p: "10px" }} disabled={((props.invalid || props.submitting) && !props.anyTouched) || !props.dirty}>
          <SendOutlinedIcon />
        </IconButton>
      </div>
    </form>
  );
};

const MessagesReduxForm = reduxForm<MessagesFormDataType, ChatFormPropsType>({ form: "messages" })(MessagesForm);

export default MessagesReduxForm;
