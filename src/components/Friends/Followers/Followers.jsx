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
  let checkFollowers = props.account.profile.followers ? props.account.profile.followers.map((follower) => follower) : undefined;

  return (
    <React.Fragment>
      <div className={styles.content}>
        {props.accounts
          ? props.accounts.map((account) =>
              props.account && props.account.profile && props.account.profile.followers
                ? props.account.profile.followers.map((follower) =>
                    account.id === follower.id ? (
                      <Card key={account.id} className={styles.card}>
                        <CardActionArea className={styles.head}>
                          <NavLink className={styles.navLink} key={account.id} to={`${profileConstant}/` + account.id}>
                            <CardMedia className={styles.wrapper_avatar} component="img" image={account.profile && account.profile.avatar ? account.profile.avatar : defaultAvatar} alt="" />
                            <CardContent className={styles.head_content}>
                              <Typography className={styles.full_name} component="div">
                                {account.profile.surname + " " + account.profile.name}
                              </Typography>
                            </CardContent>
                          </NavLink>
                        </CardActionArea>
                      </Card>
                    ) : undefined
                  )
                : undefined
            )
          : undefined}
      </div>

      {(checkFollowers && checkFollowers.length < 1) || !checkFollowers ? (
        <div className={styles.content_default}>
          <div className={styles.title}>Followers</div>
          <div className={styles.subtitle}>People who are watching you will be displayed here</div>
        </div>
      ) : undefined}
    </React.Fragment>
  );
};

export default Followers;
