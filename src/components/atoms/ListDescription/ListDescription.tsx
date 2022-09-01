import React from "react";
import { AccountType, CommentType, ReplyType } from "../../../types/types";
import { profileConstant } from "../../../core/constants/constants";
import styles from "./ListDescription.module.scss";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

interface ListDescriptionPropsType {
  accountOfDescription?: AccountType;
  data: CommentType | ReplyType | any;
}

const ListDescription = (props: ListDescriptionPropsType) => {
  const [isFullDescription, setIsFullDescription] = React.useState(false);
  const checkDataDescription = props.data?.comment || props.data?.reply;

  return (
    <Typography component="div">
      {props.accountOfDescription && (
        <Typography sx={{ display: "inline" }} color="text.primary" variant="body1" component="div">
          <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${props.accountOfDescription?.id}`}>
            {props.accountOfDescription?.surname + " " + props.accountOfDescription?.name}
          </NavLink>
        </Typography>
      )}

      <Typography sx={{ display: "inline" }} color="text.primary" variant="body2" component="div">
        {checkDataDescription?.length <= 100 ? (
          checkDataDescription
        ) : (
          <>
            <Typography className={styles.description} sx={{ display: "inline" }} color="text.primary" variant="body2" component="span">
              {isFullDescription ? checkDataDescription : checkDataDescription?.slice(0, 100) + "..."}
            </Typography>

            <button
              className={styles.button_more}
              onClick={(e: React.MouseEvent<HTMLButtonElement> & React.ChangeEvent<HTMLButtonElement>) => {
                setIsFullDescription(true);
                e.target.hidden = true;
              }}>
              more
            </button>
          </>
        )}
      </Typography>
    </Typography>
  );
};

export default ListDescription;
