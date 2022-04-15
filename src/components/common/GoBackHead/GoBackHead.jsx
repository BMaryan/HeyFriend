import React from "react";
import styles from "./GoBackHead.module.scss";
import { useHistory } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import IconButton from "@mui/material/IconButton";

let GoBackHead = (props) => {
  let history = useHistory();

  return (
    <div className={styles.go_back_head}>
      <div className={styles.wrapper_title}>
        <div className={styles.wrapper_icon}>
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackOutlinedIcon />
          </IconButton>
        </div>

        {props.title}
      </div>
    </div>
  );
};

export default GoBackHead;
