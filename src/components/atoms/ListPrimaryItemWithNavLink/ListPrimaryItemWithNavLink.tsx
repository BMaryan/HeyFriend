import React from "react";
import { profileConstant } from "../../../core/constants/constants";
import styles from "./ListPrimaryItemWithNavLink.module.scss";
import { AccountType } from "../../../types/types";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";

interface ListPrimaryItemWithNavLinkPropsType {
  account: AccountType;
  buttonData: {
    icon: React.ReactElement;
    onClick: () => void;
  };
}

const ListPrimaryItemWithNavLink = (props: ListPrimaryItemWithNavLinkPropsType) => {
  return (
    <>
      <Typography className={styles.primary_fullName} variant="body1" component="span">
        <NavLink to={`${profileConstant.path}/${props?.account?.id}`}>{props.account?.surname + " " + props.account?.name}</NavLink>
      </Typography>

      <Typography className={styles.primary_button} variant="subtitle2" component="span">
        {props.buttonData?.icon && (
          <IconButton className={styles.button_icon} onClick={props.buttonData?.onClick}>
            {props.buttonData?.icon}
          </IconButton>
        )}
      </Typography>
    </>
  );
};

export default ListPrimaryItemWithNavLink;
