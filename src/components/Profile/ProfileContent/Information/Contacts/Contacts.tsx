import React from "react";
import styles from "./Contacts.module.scss";
import { AccountType, FirebaseType } from "../../../../../types/types";

interface ContactsPropsType {
  currentAccount: FirebaseType<AccountType> | undefined;
}

const Contacts = (props: ContactsPropsType) => {
  return <div className={styles.contacts}>{props?.currentAccount?.data()?.email ? "in progress" : undefined}</div>;
};

export default Contacts;
