import React from "react";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { CommentType, ReplyType } from "../../../../types/types";
import { FooterPostFormDataType } from "./FooterPost";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import styles from "../Post.module.scss";

interface FooterPostFormPropsType {
  answerComment: CommentType | null;
  replyOfComment: CommentType | null;
  setReplyOfComment: (value: CommentType | null) => void;
  createReplyThunk: (reply: ReplyType) => void;
  updateCommentThunk: (comment: CommentType) => void;
}

const FooterPostForm = (props: InjectedFormProps<FooterPostFormDataType, FooterPostFormPropsType> & FooterPostFormPropsType) => {
  const [value, setValue] = React.useState("");

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <IconButton className={styles.button_icon}>
        <SentimentSatisfiedOutlinedIcon className={styles.icon} />
      </IconButton>

      <Field name="comment" type="text" className={styles.input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} placeholder={props.replyOfComment ? "Add a reply..." : "Add a comment..."} component="input" />

      {props.replyOfComment && (
        <IconButton className={styles.button_icon} onClick={() => props.setReplyOfComment(null)}>
          <CloseIcon className={styles.icon} />
        </IconButton>
      )}

      <Button
        className={styles.button_post}
        type="submit"
        disabled={!value}
        variant="text"
        onSubmit={(e: React.FormEvent<HTMLButtonElement>) => {
          setValue("");
        }}>
        {props.replyOfComment ? "Reply" : "Post"}
      </Button>
    </form>
  );
};

const FooterPostReduxForm = reduxForm<FooterPostFormDataType, FooterPostFormPropsType>({ form: "comment" })(FooterPostForm);

export default FooterPostReduxForm;
