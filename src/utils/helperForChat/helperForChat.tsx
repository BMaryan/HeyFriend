import React from "react";
import dialogStyles from "../../components/Chat/Dialogs/Dialog/Dialog.module.scss";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { profileConstant } from "../../core/constants/constants";
import betaVershion from "../../assets/images/betaVershion.png";
import { AccountType, FirebaseType } from "../../types/types";
import styles from "./helperForChat.module.scss";
import { NavLink } from "react-router-dom";

interface HeadPropsType {
  account: AccountType | null;
  toggleShowContent: boolean;
  toggleDetails: boolean;
  chatWithAccount: FirebaseType<AccountType> | undefined;
  setToggleDetails: (detail: boolean) => void;
}

export const Head = (props: HeadPropsType) => {
  return props.toggleShowContent ? (
    <div className={styles.head + " " + styles.head_dialogs}>
      <div className={styles.head_wrapper_picture}>
        <img src={betaVershion} alt="" />
      </div>
      <div className={styles.head_dialogs_title}>{props?.account?.surname + " " + props?.account?.name}</div>
    </div>
  ) : (
    <div className={styles.head + " " + styles.head_messages}>
      <div>
        <NavLink key={props?.chatWithAccount?.id} to={`${profileConstant.path}/${props?.chatWithAccount?.id}`} className={dialogStyles.chat_forHead}>
          <div className={dialogStyles.wrapper_picture}>
            <div className={dialogStyles.have_not_picture_forHead}>{props?.chatWithAccount?.data() ? <img src={props?.chatWithAccount?.data()?.avatar ? props?.chatWithAccount?.data()?.avatar : defaultAvatar} alt="" /> : <></>}</div>
          </div>
          <div>
            <div className={dialogStyles.login}>{props?.chatWithAccount?.data() ? props?.chatWithAccount?.data()?.surname + " " + props?.chatWithAccount?.data()?.name : <></>}</div>
          </div>
        </NavLink>
      </div>
      <div>
        <FontAwesomeIcon onClick={() => (props.toggleDetails ? props.setToggleDetails(false) : props.setToggleDetails(true))} className={styles.icon} icon={faInfoCircle} />
      </div>
    </div>
  );
};
