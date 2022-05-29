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

const Followers = (props) => {
  let checkFollowerAccount = props?.account?.followers ? props?.account?.followers?.map((item) => item) : undefined;

  return (
    <React.Fragment>
      <div className={styles.content}>
        {props?.accounts
          ? props?.accounts?.map((account) =>
              props?.account?.followers
                ? props?.account?.followers.map(
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

      {(checkFollowerAccount && checkFollowerAccount.length === 0) || !checkFollowerAccount ? (
        <div className={styles.content_default}>
          <div className={styles.title}>Followers</div>
          <div className={styles.subtitle}>People who are watching you will be displayed here</div>
        </div>
      ) : undefined}
    </React.Fragment>
  );
};

export default Followers;
