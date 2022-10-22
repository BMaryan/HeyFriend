import React from "react";
import { RecommendationIllustration } from "../../../assets/illustrations/RecommendationIllustration";
import { heyFriendStyleConstant } from "../../../core/constants/constantsStyles";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../../core/constants/constants";
import { AccountType, FirebaseType } from "../../../types/types";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import styles from "../Friends.module.scss";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";

interface RecommendationPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
}

const Recommendation = (props: RecommendationPropsType) => {
  const recommendation: Array<FirebaseType<AccountType>> = props?.accounts?.filter((account: FirebaseType<AccountType>) => props?.account?.id !== account?.id);

  return (
    <React.Fragment>
      <div className={styles.content}>
        {recommendation?.map(
          (recommendationAccount: FirebaseType<AccountType>) =>
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

      {recommendation.length < 1 || !props.accounts ? (
        <div className={styles.content_default}>
          <div className={styles.title}>Recommendation</div>
          <RecommendationIllustration height="40%" mainColor={heyFriendStyleConstant.first} minorColor={heyFriendStyleConstant.second} />
          <div className={styles.subtitle}>Here are the people you may know</div>
        </div>
      ) : undefined}
    </React.Fragment>
  );
};

export default Recommendation;
