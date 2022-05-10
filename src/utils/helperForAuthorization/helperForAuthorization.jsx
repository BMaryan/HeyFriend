/* eslint-disable array-callback-return */
import React from "react";
import styles from "./helperForAuthorization.module.scss";
import { NavLink } from "react-router-dom";
import { accounts, account } from "../../core/constants/constantsLocalStorage";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";

export const AuthorizationHelperContainer = (props) => {
  return (
    <div className={styles.authorization_content}>
      <div className={styles.authorization_title}>{props.title}</div>
      {props.form}
    </div>
  );
};

export const InformationContainer = (props) => {
  return (
    <div className={styles.information_content}>
      <div className={styles.information_title}>{props.title}</div>
      <div className={styles.information_subtitle}>{props.subtitle}</div>
      <div>
        <NavLink className={styles.information_navLink} onClick={() => props.authSuccess()} to={props.linkTo}>
          {props.buttonText}
        </NavLink>
      </div>
    </div>
  );
};

export const ModalDefaultAccounts = (props) => {
  let filterDefaultAccounts = props.accounts && props.accounts.slice(0, 3) ? props.accounts.slice(0, 3).map((defaultAccount) => defaultAccount) : undefined;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={props.open}>
        <Box className={styles.modal_autocomplete_default_accounts}>
          <List className={styles.list}>
            <div className={styles.list_title}>Default accounts</div>
            <div className={styles.list_subtitle}>Autofill will work by selecting an account</div>

            {filterDefaultAccounts
              ? filterDefaultAccounts.map((account) => (
                  <ListItem className={styles.list_item} key={account.id}>
                    <ListItemButton
                      onClick={() => {
                        props.getDefaultAccount(account);
                        props.handleClose();
                      }}>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={account.avatar ? account.avatar : defaultAvatar} />
                      </ListItemAvatar>
                      <ListItemText primary={account.surname + " " + account.name} secondary={account.status && account.status.length > 70 ? account.status.slice(0, 70) + "..." : account.status} />
                    </ListItemButton>
                  </ListItem>
                ))
              : undefined}
          </List>
        </Box>
      </Fade>
    </Modal>
  );
};

// form data to local storage and push to state
export const setSignUpDataToLocalStorage = (props) => {
  if (props.accounts && props.userSignUp && props.userSignUp.id) {
    localStorage.setItem(accounts, JSON.stringify(props.accounts));
  }
};

// check authorization
export const helpCheckAuthorization = (props) => {
  props.users.find((user) => {
    if (props.userSignIn && props.userSignIn.email) {
      if (user.email === props.userSignIn.email && user.password === props.userSignIn.password) {
        return user;
      }
    }
  });
};

export const deleteAuthorizationUser = (props) => {
  if (!props.account) {
    props.isAccount(null);
    localStorage.removeItem(account);
  }
};
