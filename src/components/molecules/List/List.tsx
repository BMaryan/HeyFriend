import React from "react";
import ListPrimaryItemWithNavLink from "../../atoms/ListPrimaryItemWithNavLink/ListPrimaryItemWithNavLink";
import { mainConstant, profileConstant } from "../../../core/constants/constants";
import ListSecondaryItem from "../../atoms/ListSecondaryItem/ListSecondaryItem";
import ListPrimaryItem from "../../atoms/ListPrimaryItem/ListPrimaryItem";
import CustomAvatarBadge from "../../atoms/AvatarBadge/AvatarBadge";
import { AccountType, PostType } from "../../../types/types";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { NavLink, useHistory } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import CustomAvatar from "../../atoms/Avatar/Avatar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import styles from "./List.module.scss";

interface ListPropsType {
  currentAccountData: AccountType;
  primaryData: {
    invisible?: boolean;
    buttonData?: {
      icon: React.ReactElement;
      onClick: () => void;
    };
  };
  secondaryData: {
    post?: PostType;
  };
}

const List = (props: ListPropsType) => {
  const history = useHistory();
  const checkMain = history.location.pathname === mainConstant.path;

  return (
    <ListItem className={styles.list_item} alignItems="flex-start">
      <ListItemAvatar className={styles.item_avatar}>
        <NavLink to={`${profileConstant.path}/${props.currentAccountData?.id}`}>{!props.primaryData.invisible ? props.currentAccountData && <CustomAvatar avatarData={props.currentAccountData} /> : props.currentAccountData && <CustomAvatarBadge color="success" avatarData={props?.currentAccountData} overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" invisible={props?.primaryData.invisible} />}</NavLink>
      </ListItemAvatar>

      <ListItemText
        className={styles.list_text}
        primary={
          <Typography className={styles.wrapper_primary} component="div">
            {!checkMain ? (
              <ListPrimaryItem
                currentAccountData={props.currentAccountData}
                // buttonData={
                //   props.primaryData.buttonData && {
                //     icon: props.primaryData.buttonData?.icon,
                //     onClick: props.primaryData.buttonData?.onClick,
                //   }
                // }
              />
            ) : (
              props.primaryData.buttonData && (
                <ListPrimaryItemWithNavLink
                  account={props.currentAccountData}
                  buttonData={{
                    icon: props.primaryData.buttonData?.icon,
                    onClick: props.primaryData.buttonData?.onClick,
                  }}
                />
              )
            )}
          </Typography>
        }
        secondary={<ListSecondaryItem post={props?.secondaryData.post} />}
      />
    </ListItem>
  );
};

export default List;
{
  /* //   <Typography className={styles.primary_fullName} variant="body1" component="span">
          //     <NavLink to={`${profileConstant.path}/${props?.currentAccountData?.id}`}>{props.currentAccountData?.surname + " " + props.currentAccountData?.name}</NavLink>
          //   </Typography>
          //   <Typography className={styles.primary_button} variant="subtitle2" component="span">
          //     {props.buttonData?.icon && (
          //       <IconButton className={styles.button_icon} onClick={props.buttonData?.onClick}>
          //         {props.buttonData?.icon}
          //       </IconButton>
          //     )}
          //   </Typography> */
}
