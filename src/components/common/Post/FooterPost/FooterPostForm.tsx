import React from "react";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { FooterPostFormDataType } from "./FooterPost";
import { CommentType, ReplyType } from "../../../../types/types";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { fb } from "../../../../firebase";
import styles from "../Post.module.scss";

interface FooterPostFormPropsType {
  answerComment: CommentType | null;
  replyOfComment: CommentType | null;
  setReplyOfComment: (value: CommentType | null) => void;
  createReplyThunk: (reply: ReplyType) => void;
  updateCommentThunk: (comment: CommentType) => void;
}

const FooterPostForm = (props: InjectedFormProps<FooterPostFormDataType, FooterPostFormPropsType> & FooterPostFormPropsType) => {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <IconButton className={styles.button_icon}>
        <SentimentSatisfiedOutlinedIcon className={styles.icon} />
      </IconButton>
      <Field name="comment" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} className={styles.input} placeholder={props.replyOfComment ? "Add a reply..." : "Add a comment..."} component="input" />
      <Button
        className={styles.button_post}
        onClick={(e: any) => {
          props.replyOfComment && e.preventDefault();
          props.replyOfComment &&
            props.createReplyThunk({
              id: "",
              accountId: props.replyOfComment.accountId,
              commentId: props.replyOfComment.id,
              dateCreated: fb.Timestamp.now(),
              reply: value ? value : "",
            });
          props.setReplyOfComment(null);
        }}
        type="submit"
        disabled={!value}
        variant="text">
        {props.replyOfComment ? "Reply" : "Post"}
      </Button>
    </form>
  );
};

const FooterPostReduxForm = reduxForm<FooterPostFormDataType, FooterPostFormPropsType>({ form: "comment" })(FooterPostForm);

export default FooterPostReduxForm;
