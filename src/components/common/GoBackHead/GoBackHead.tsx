import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { HistoryType } from "../../../types/types";
import IconButton from "@mui/material/IconButton";
import styles from "./GoBackHead.module.scss";

interface GoBackHeadPropsType {
  title: string;
  history: HistoryType;
}

let GoBackHead = (props: GoBackHeadPropsType) => {
  return (
    <div className={styles.go_back_head}>
      <div className={styles.wrapper_title}>
        <div className={styles.wrapper_icon}>
          <IconButton onClick={() => props.history.goBack()}>
            <ArrowBackOutlinedIcon />
          </IconButton>
        </div>

        {props.title}
      </div>
    </div>
  );
};

export default GoBackHead;
