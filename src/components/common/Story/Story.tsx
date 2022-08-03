import React from "react";
import { AccountType } from "../../../types/types";
import styles from "./Story.module.scss";

interface StoryPropsType {
  // accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  // id: string;
  // history: HistoryType;
}

const Story = (props: StoryPropsType) => {
  return (
    <div className={styles.stories}>
      <div className={styles.story}>
        <div className={styles.wrapper_content}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCd-m7iQF1pBft6SEEeMl7zQTJBPQCA8vSg&usqp=CAU" alt="" />
        </div>

        <div className={styles.wrapper_footer}>
          {/* <div className={styles.wrapper_picture}>
					<img className={styles.picture} src={foundMyProfile && foundMyProfile.profile &&  foundMyProfile.profile.img ? foundMyProfile.profile.img : defaultAvatar} alt='' />
				</div> */}
          {/* <div className={styles.fullName}>
					{foundMyProfile && foundMyProfile.profile ? foundMyProfile.profile.surname + " " + foundMyProfile.profile.name : <></>}
				</div> */}
          <div className={styles.fullName}>{props.account ? props.account.surname + " " + props.account.name : <></>}</div>
        </div>
      </div>
    </div>
  );
};

export default Story;
