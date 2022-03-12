import React from "react";
import styles from "./Comment.module.css";
import commonStyles from "../Comments.module.css";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../../core/constants/constants";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import defaultAvatar from "../../../../../assets/images/DefaultAvatar.png";

const Comment = (props) => {
  return (
    <div className={styles.comment}>
      {props.post && props.post.comments
        ? props.accounts.map((account) =>
            account.id === props.comment.idAccount ? (
              <List key={account.id} className={commonStyles.list}>
                <ListItem className={commonStyles.list_item}>
                  <ListItemAvatar>
                    <NavLink to={`${profileConstant}/${account.id && account.id !== props.account.id ? account.id : ""}`}>
                      <Avatar src={account.profile.avatar ? account.profile.avatar : defaultAvatar} alt={account.profile.surname + " " + account.profile.name} />
                    </NavLink>
                  </ListItemAvatar>
                  <ListItemText
                    className={commonStyles.list_item__text}
                    primary={
                      <React.Fragment>
                        <NavLink className={commonStyles.full_name_comment} to={`${profileConstant}/${account.id && account.id !== props.account.id ? account.id : ""}`}>
                          {account.profile.surname + " " + account.profile.name}
                        </NavLink>

                        {props.comment.comment}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            ) : undefined
          )
        : undefined}
    </div>
  );
};

export default Comment;
