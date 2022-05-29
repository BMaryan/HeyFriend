import React from "react";
import styles from "../Friends.module.scss";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../core/constants/constants";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Following = (props) => {
  let checkFollowingAccount = props?.account?.following ? props?.account?.following?.map((item) => item) : undefined;

  return (
    <React.Fragment>
      <div className={styles.content}>
        {props?.accounts
          ? props?.accounts?.map((account) =>
              props?.account?.following
                ? props?.account?.following.map(
                    (item) =>
                      account.data().id === item.id && (
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
          <div className={styles.subtitle}>The people you are following will be displayed here</div>
        </div>
      ) : undefined}
    </React.Fragment>
  );
};

export default Following;
