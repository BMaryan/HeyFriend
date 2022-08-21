import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType } from "../../../types/types";
import ListSecondaryItem from "../../atoms/ListSecondaryItem/ListSecondaryItem";
import CustomAvatarGroup from "../../atoms/AvatarGroup/AvatarGroup";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import styles from "./ListGroup.module.scss";
import { IconButton } from "@mui/material";

interface ListGroupPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chat: ChatType;
  messages: Array<FirebaseType<MessageType>>;
  buttonData?: {
    icon: React.ReactElement;
    onClick: () => void;
  };
}

const ListGroup = (props: ListGroupPropsType) => {
  return (
    <ListItem className={styles.list_item} alignItems="flex-start">
      <ListItemAvatar className={styles.item_avatar}>
        <CustomAvatarGroup avatars={props.accounts} max={2} />
      </ListItemAvatar>

      <ListItemText
        className={styles.list_text}
        primary={
          <Typography className={styles.wrapper_primary} component="div">
            <Typography className={styles.primary_title} variant="body1" component="span">
              {props.chat.title}
            </Typography>

            <Typography className={styles.primary_button} variant="subtitle2" component="span">
              {props.buttonData?.icon && (
                <IconButton className={styles.button_icon} onClick={props.buttonData?.onClick}>
                  {props.buttonData?.icon}
                </IconButton>
              )}
            </Typography>
          </Typography>
        }
        secondary={
          <ListSecondaryItem
            chat={{
              accounts: props.accounts,
              account: props.account,
              chat: props.chat,
              messages: props.messages,
            }}
          />
        }
      />
    </ListItem>
  );
};

export default ListGroup;
