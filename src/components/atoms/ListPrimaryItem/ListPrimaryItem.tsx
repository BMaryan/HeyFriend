import React from "react";
import { AccountType } from "../../../types/types";
import styles from "./ListPrimaryItem.module.scss";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

interface ListPrimaryItemPropsType {
  currentAccountData: AccountType;
  // buttonData?: {
  //   icon: React.ReactElement;
  //   onClick: () => void;
  // };
}

const ListPrimaryItem = (props: ListPrimaryItemPropsType) => {
  return (
    <>
      <Typography className={styles.primary_fullName} variant="body1" component="span">
        {props.currentAccountData?.surname + " " + props.currentAccountData?.name}
      </Typography>

      <Typography className={styles.primary_button} variant="subtitle2" component="span">
        {/* {props.buttonData?.icon && (
          <IconButton className={styles.button_icon} onClick={props.buttonData?.onClick}>
            {props.buttonData?.icon}
          </IconButton>
        )} */}
      </Typography>
    </>
  );
};

export default ListPrimaryItem;
