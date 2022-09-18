import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { HistoryType } from "../../../types/types";
import IconButton from "@mui/material/IconButton";
import styles from "./GoBackHead.module.scss";

interface GoBackHeadPropsType {
  title?: string;
  history: HistoryType;
  endIcon?: React.ReactNode;
  content?: React.ReactNode;
  onClickIcon?: () => void;
}

const GoBackHead = (props: GoBackHeadPropsType) => {
  return (
    <div className={styles.go_back_head}>
      <div className={styles.wrapper_title}>
        <div className={`${styles.wrapper_icon} ${styles.wrapper_icon__start}`}>
          <IconButton onClick={() => props.history.goBack()} size="small">
            <ArrowBackOutlinedIcon />
          </IconButton>
        </div>

        {props.title}
        {props.content}

        <div className={`${styles.wrapper_icon} ${styles.wrapper_icon__end}`}>
          {props.endIcon && (
            <IconButton onClick={props?.onClickIcon} size="small">
              {props.endIcon}
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoBackHead;
