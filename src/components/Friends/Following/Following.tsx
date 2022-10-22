import React from "react";
import { FollowingIllustration } from "../../../assets/illustrations/FollowingIllustration";
import { AccountType, FirebaseType, FollowingOfAccountType } from "../../../types/types";
import { heyFriendStyleConstant } from "../../../core/constants/constantsStyles";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../../core/constants/constants";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import styles from "../Friends.module.scss";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";

interface FollowingPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
}

const Following = (props: FollowingPropsType) => {
  const checkFollowingAccount: Array<FollowingOfAccountType> = props?.account?.following ? props?.account?.following?.map((following: FollowingOfAccountType) => following) : [];

  return (
    <React.Fragment>
      <div className={styles.content}>
        {props?.accounts
          ? props?.accounts?.map((account: FirebaseType<AccountType>) =>
              props?.account?.following
                ? props?.account?.following.map(
                    (following: FollowingOfAccountType) =>
                      account.data().id === following.id && (
                        <Card key={account.id} className={styles.card}>
                          <CardActionArea className={styles.head}>
                            <NavLink className={styles.navLink} key={account.id} to={`${profileConstant.path}/` + account.id}>
                              <CardMedia className={styles.wrapper_avatar} component="img" image={account?.data()?.avatar ? account?.data()?.avatar : defaultAvatar} alt="" />
                              <CardContent className={styles.head_content}>
                                <Typography className={styles.full_name} component="div">
                                  {account?.data()?.surname + " " + account?.data()?.name}
                                </Typography>
                              </CardContent>
                            </NavLink>
                          </CardActionArea>
                        </Card>
                      )
                  )
                : undefined
            )
          : undefined}
      </div>

      {(checkFollowingAccount && checkFollowingAccount.length === 0) || !checkFollowingAccount ? (
        <div className={styles.content_default}>
          <div className={styles.title}>Following</div>
          <FollowingIllustration height="40%" mainColor={heyFriendStyleConstant.first} minorColor={heyFriendStyleConstant.second} />
          <div className={styles.subtitle}>The people you are following will be displayed here</div>
        </div>
      ) : undefined}
    </React.Fragment>
  );
};

export default Following;
