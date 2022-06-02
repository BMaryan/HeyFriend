import React from "react";
import styles from "./Dialog.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { chatConstant } from "../../../../core/constants/constants";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Dialog = (props) => {
  let messageWithAccount = props?.accounts ? props?.accounts?.find((account) => (props?.chat?.data()?.participants?.length > 0 ? props?.chat?.data()?.participants?.find((participants) => account?.id === participants?.id && account?.id !== props?.account?.id) : undefined)) : undefined;
  let params = useParams();

  console.log(props);

  return (
    <>
      {props?.chat?.data()?.participants
        ? props?.chat?.data()?.participants.map((item) =>
            item?.id === props?.account?.id ? (
              <NavLink key={item.id} to={messageWithAccount?.data() ? `${chatConstant.path}/` + props?.chat?.data()?.id : ""} className={styles.chat + " " + styles.chat_forHead} activeClassName={styles.chat_active}>
                <div className={styles.wrapper_picture}>
                  <div className={styles.have_not_picture + " " + styles.have_not_picture_forHead}>
                    {!messageWithAccount?.data() ? (
                      <div className={styles.wrapper_icon}>
                        <FontAwesomeIcon className={styles.icon} icon={faBookmark} />
                      </div>
                    ) : (
                      <img src={messageWithAccount?.data()?.avatar ? messageWithAccount?.data()?.avatar : defaultAvatar} alt="" />
                    )}
                  </div>
                </div>
                <div>
                  <div className={styles.login}>{messageWithAccount?.data() ? messageWithAccount?.data()?.surname + " " + messageWithAccount?.data()?.name : undefined}</div>
                  {/* <div className={styles.message}>{props?.chat?.data()?.messages?.length > 0 ? props?.chat?.data()?.messages[props?.chat?.data()?.messages?.length - 1].message : <></>}</div> */}
                  <div className={styles.message}>{props?.chat?.data()?.messages?.length > 0 ? props?.chat?.data()?.messages[props?.chat?.data()?.messages?.length - 1].message : <></>}</div>
                </div>
              </NavLink>
            ) : undefined
          )
        : undefined}
    </>
  );
};

export default Dialog;
