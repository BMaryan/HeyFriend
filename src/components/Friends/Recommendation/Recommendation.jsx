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

const Recommendation = (props) => {
  let unFollowingAccounts = props?.account?.following ? props?.account?.following?.map((following) => (props?.account?.followers ? props?.account?.followers?.filter((followers) => following.id !== followers.id) : undefined)) : undefined;
  let recommendation = props?.accounts ? props?.accounts?.filter((account) => unFollowingAccounts.flat().find((unFollowing) => account.id === unFollowing.id)) : undefined;

  return (
    <React.Fragment>
      <div className={styles.content}>
        {recommendation?.map(
          (recommendationAccount) =>
            props?.account?.id !== recommendationAccount?.id && (
              <Card key={recommendationAccount.id} className={styles.card}>
                <CardActionArea className={styles.head}>
                  <NavLink className={styles.navLink} to={`${profileConstant.path}/` + recommendationAccount.id}>
                    <CardMedia className={styles.wrapper_avatar} component="img" image={recommendationAccount?.data()?.avatar ? recommendationAccount.data().avatar : defaultAvatar} alt="" />
                    <CardContent className={styles.head_content}>
                      <Typography className={styles.full_name} component="div">
                        {recommendationAccount.data().surname + " " + recommendationAccount.data().name}
                      </Typography>
                    </CardContent>
                  </NavLink>
                </CardActionArea>
              </Card>
            )
        )}
      </div>

      {recommendation.length < 1 || !recommendation ? (
        <div className={styles.content_default}>
          <div className={styles.title}>Recommendation</div>
          <div className={styles.subtitle}>Here are the people you may know</div>
        </div>
      ) : undefined}
    </React.Fragment>
  );
};

export default Recommendation;
