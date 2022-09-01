import React from "react";
import { CommentType, ReplyType } from "../../../types/types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./ListDateWithIcon.module.scss";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import moment from "moment";

interface ListDateWithIconPropsType {
  data: CommentType | ReplyType;
  onClick: () => void;
}

const ListDateWithIcon = (props: ListDateWithIconPropsType) => {
  return (
    <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="div">
      <Typography sx={{ display: "inline" }} color="text.primary" variant="subtitle2" title={props.data?.dateCreated?.toDate()?.toDateString() + " | " + props.data?.dateCreated?.toDate()?.toLocaleTimeString()} component="div">
        {moment(props.data?.dateCreated?.toDate()).fromNow()}
      </Typography>

      <Typography sx={{ display: "inline" }} color="text.primary" variant="subtitle2" component="div">
        <IconButton className={styles.button_icon} onClick={props.onClick}>
          <MoreHorizIcon fontSize="small" className={styles.icon} />
        </IconButton>
      </Typography>
    </Typography>
  );
};

export default ListDateWithIcon;
