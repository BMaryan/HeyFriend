import React from "react";
import { ProfileDataIllustration } from "../../../../../assets/illustrations/ProfileDataIllustration";
import { heyFriendStyleConstant } from "../../../../../core/constants/constantsStyles";
import { AccountType, FirebaseType } from "../../../../../types/types";
import styles from "./Contacts.module.scss";

interface ContactsPropsType {
  currentAccount: FirebaseType<AccountType> | undefined;
}

const Contacts = (props: ContactsPropsType) => {
  // const accountData = props?.currentAccount?.data();

  return (
    <div className={styles.contacts}>
      {/* {accountData?.aboutMe || accountData?.status || (accountData?.aboutMe && accountData?.status) ? (
        <>
          {accountData?.aboutMe && (
            <div className={styles.wrapper_item}>
              <div className={styles.title}>About me</div>
              <div>{accountData?.aboutMe}</div>
            </div>
          )}

          {accountData?.status && (
            <div className={styles.wrapper_item}>
              <div className={styles.title}>Status</div>
              <div>{accountData?.status}</div>
            </div>
          )}
        </>
      ) : ( */}
      <div className={styles.default_content}>
        <ProfileDataIllustration height="50%" width="50%" mainColor={heyFriendStyleConstant.first} minorColor={heyFriendStyleConstant.second} />
      </div>
      {/* // )} */}
    </div>
  );
};

export default Contacts;
