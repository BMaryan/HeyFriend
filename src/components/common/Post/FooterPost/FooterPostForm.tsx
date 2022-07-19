import React from "react";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { FooterPostFormDataType } from "./FooterPost";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import styles from "../Post.module.scss";

interface FooterPostFormPropsType {}

const FooterPostForm = (props: InjectedFormProps<FooterPostFormDataType, FooterPostFormPropsType> & FooterPostFormPropsType) => {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <IconButton className={styles.button_icon}>
        <SentimentSatisfiedOutlinedIcon className={styles.icon} />
      </IconButton>
      <Field name="comment" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} className={styles.input} placeholder="Add a comment..." component="input" />
      <Button className={styles.button_post} type="submit" disabled={!value} variant="text">
        Post
      </Button>
    </form>
  );
};

const FooterPostReduxForm = reduxForm<FooterPostFormDataType, FooterPostFormPropsType>({ form: "comment" })(FooterPostForm);

export default FooterPostReduxForm;
