import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import dialogStyles from "../../components/Chat/Dialogs/Dialog/Dialog.module.scss";
import styles from "./helperForChat.module.scss";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../core/constants/constants";
import betaVershion from "../../assets/images/betaVershion.png";

export const Head = (props) => {
  let id = Number(props.match.params.id);
  let otherProfile = props.accounts ? props.accounts.find((profile) => (id ? profile.id === id : undefined)) : undefined;

  return props.toggleShowContent ? (
    <div className={styles.head + " " + styles.head_dialogs}>
      <div className={styles.head_wrapper_picture}>
        <img src={betaVershion} alt="" />
      </div>
      <div className={styles.head_dialogs_title}>{props.account.surname + " " + props.account.name}</div>
    </div>
  ) : (
    <div className={styles.head + " " + styles.head_messages}>
      <div>
        {props.accounts.map((account) =>
          account && id && account.id === id ? (
            <NavLink key={account.id} to={props.account && props.account.id !== id ? `${profileConstant.path}/` + account.id : `${profileConstant.path}`} className={dialogStyles.chat_forHead}>
              <div className={dialogStyles.wrapper_picture}>
                <div className={dialogStyles.have_not_picture_forHead}>{account ? <img src={otherProfile?.avatar ? otherProfile.avatar : defaultAvatar} alt="" /> : <></>}</div>
              </div>
              <div>
                <div className={dialogStyles.login}>{account ? account.surname + " " + account.name : <></>}</div>
              </div>
            </NavLink>
          ) : undefined
        )}
      </div>
      <div>
        <FontAwesomeIcon onClick={() => (props.toggleDetails ? props.setToggleDetails(false) : props.setToggleDetails(true))} className={styles.icon} icon={faInfoCircle} />
      </div>
    </div>
  );
};
