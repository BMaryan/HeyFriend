import React from "react";
import dialogStyles from "../../components/Chat/Dialogs/Dialog/Dialog.module.scss";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../core/constants/constants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AccountType, FirebaseType } from "../../types/types";
import IconButton from "@mui/material/IconButton";
import styles from "./helperForChat.module.scss";
import InfoIcon from "@mui/icons-material/Info";
import ModeIcon from "@mui/icons-material/Mode";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    height: "10px",
    width: "10px",
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    borderRadius: "50%",

    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface HeadPropsType {
  account: AccountType | null;
  toggleShowContent: boolean;
  toggleDetails: boolean;
  chatWithAccount: FirebaseType<AccountType> | undefined;
  setToggleDetails: (detail: boolean) => void;
}

export const Head = (props: HeadPropsType) => {
  const lastSignInDate = new Date(props.chatWithAccount?.data()?.metadata?.lastSignInTime as string);
  const isOnline = Boolean(props?.chatWithAccount?.data()?.isOnline);

  return props.toggleShowContent ? (
    <div className={styles.head + " " + styles.head_dialogs}>
      <div className={styles.head_dialogs_title}>Messages</div>

      <div className={styles.head_dialogs_title}>
        <IconButton aria-label="Example">
          <ModeIcon />
        </IconButton>
      </div>
    </div>
  ) : (
    <div className={styles.head + " " + styles.head_messages}>
      <div>
        <NavLink key={props?.chatWithAccount?.id} to={`${profileConstant.path}/${props?.chatWithAccount?.id}`} className={dialogStyles.chat_forHead}>
          <div className={dialogStyles.wrapper_picture}>
            <div className={dialogStyles.have_not_picture_forHead}>
              {props?.chatWithAccount?.data() ? (
                <StyledBadge overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                  <img src={props?.chatWithAccount?.data()?.avatar ? props?.chatWithAccount?.data()?.avatar : defaultAvatar} alt="" />
                </StyledBadge>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <div className={dialogStyles.login}>{props?.chatWithAccount?.data() ? props?.chatWithAccount?.data()?.surname + " " + props?.chatWithAccount?.data()?.name : <></>}</div>
            <div className={dialogStyles.date}>{!isOnline ? `In the network ${lastSignInDate?.toLocaleDateString() + " " + lastSignInDate?.toLocaleTimeString()}` : "Now in the network"}</div>
          </div>
        </NavLink>
      </div>

      <div>
        <IconButton className={styles.icon} onClick={() => props.setToggleDetails(!props.toggleDetails)}>
          {props.toggleDetails ? <InfoOutlinedIcon className={styles.icon} /> : <InfoIcon className={styles.icon_active} />}
        </IconButton>
      </div>
    </div>
  );
};
