import React from "react";
import { AccountType, FirebaseType, FollowersOfAccountType, FollowingOfAccountType, PostType } from "../../types/types";
import { defaultPostConstant } from "../../core/constants/constantsPost";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { profileConstant } from "../../core/constants/constants";
import PostContainer from "../common/Post/PostContainer";
import AvatarGroup from "@mui/material/AvatarGroup";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Divider from "@mui/material/Divider";
import Loader from "../atoms/Loader/Loader";
import { NavLink } from "react-router-dom";
import styles from "./Main.module.scss";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";

interface MainPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  loading: boolean;
}

const Main = (props: MainPropsType) => {
  const followedAccountPosts: Array<FirebaseType<PostType>> = props?.account?.following ? props?.account?.following?.map((item: FollowingOfAccountType) => (props?.posts && item ? props?.posts?.filter((post: FirebaseType<PostType>) => post?.data()?.accountId === item?.id) : [])).flat() : [];
  const unFollowingAccounts: Array<FollowingOfAccountType> = props?.account?.following ? props?.account?.following?.map((following: FollowingOfAccountType) => (props?.account?.followers ? props?.account?.followers?.filter((followers: FollowersOfAccountType) => following.id !== followers.id) : [])).flat() : [];
  const recommendation: Array<FirebaseType<AccountType>> = props?.accounts ? props?.accounts?.filter((account: FirebaseType<AccountType>) => unFollowingAccounts.find((unFollowing: FollowingOfAccountType) => account.id === unFollowing.id)) : [];

  return (
    <div className={styles.main}>
      {/* // content */}
      <div className={styles.main_content}>
        {/* loading */}
        {followedAccountPosts.length === 0 && props.loading && <Loader />}

        {/* posts */}
        {props.loading
          ? followedAccountPosts.map((item: FirebaseType<PostType>) => (
              <Card key={item.id} sx={{ height: 900, display: "flex", flexDirection: "column", mb: 2 }}>
                <CardHeader avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />} title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />} subheader={<Skeleton animation="wave" height={10} width="40%" />} />

                <Skeleton sx={{ display: "flex", flex: 1 }} animation="wave" variant="rectangular" />

                <CardContent>
                  <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                  </React.Fragment>
                </CardContent>
              </Card>
            ))
          : followedAccountPosts?.length !== 0
          ? followedAccountPosts.sort((a: FirebaseType<PostType>, b: FirebaseType<PostType>) => b?.data()?.dateCreated?.toDate().getTime() - a?.data()?.dateCreated?.toDate().getTime())?.map((post: FirebaseType<PostType>) => <PostContainer key={post.id} modal={false} post={post} kindOfPost={defaultPostConstant} />)
          : undefined}

        {/* default content for content */}
        {(followedAccountPosts && followedAccountPosts?.length === 0) || !followedAccountPosts
          ? !props.loading && (
              <div className={styles.default_content}>
                <div className={styles.default_content__wrapper_icon}>{}</div>
                <div className={styles.default_content__title}>News Feed</div>
                <div className={styles.default_content__subtitle}>Get started by adding friends. You'll see their posts here.</div>
              </div>
            )
          : undefined}
      </div>

      {/* sideBar right */}
      <div className={styles.main_sideBar_right}>
        <div className={styles.sideBar_right_content}>
          <div className={styles.wrapper_contact}>
            <div className={styles.wrapper_contact_info}>
              {/* default */}
              <NavLink className={styles.wrapper_contact_info_avatar} to={`${profileConstant.path}/${props?.account?.id}`}>
                <img className={styles.avatar + " " + styles.avatar__large} src={props?.account?.avatar ? props.account.avatar : defaultAvatar} alt="" />
              </NavLink>
              <div className={styles.wrapper_contact_info_detail}>
                <NavLink className={styles.fullName} to={`${profileConstant.path}/${props?.account?.id}`}>
                  {props?.account?.surname + " " + props?.account?.name}
                </NavLink>
                <div className={styles.subtitle}>{props?.account?.status}</div>
              </div>
            </div>

            <div className={styles.wrapper_contact_button}></div>
          </div>

          <Divider sx={{ margin: "10px 0" }}>
            <Chip label="Suggestions For You" variant="outlined" />
          </Divider>

          {recommendation
            ? recommendation.slice(-5).map((account: FirebaseType<AccountType>) =>
                account?.data()?.following ? (
                  account?.data()?.following?.map((followedAccount: FollowingOfAccountType) =>
                    followedAccount?.id !== props?.account?.id ? (
                      <div key={followedAccount?.id} className={styles.wrapper_contact}>
                        <div className={styles.wrapper_contact_info}>
                          <NavLink className={styles.wrapper_contact_info_avatar} to={`${profileConstant.path}/${followedAccount?.id}`}>
                            <img className={styles.avatar + " " + styles.avatar__medium} src={props.accounts.find((account: FirebaseType<AccountType>) => account.id === followedAccount.id)?.data()?.avatar || defaultAvatar} alt="" />
                          </NavLink>

                          <div className={styles.wrapper_contact_info_detail}>
                            <NavLink className={styles.fullName} to={`${profileConstant.path}/${account?.id}`}>
                              {props.accounts.find((account: FirebaseType<AccountType>) => account.id === followedAccount.id)?.data()?.surname + " " + props.accounts.find((account: FirebaseType<AccountType>) => account?.id === followedAccount?.id)?.data()?.name}
                            </NavLink>

                            <AvatarGroup className={styles.avatar_group} max={3}>
                              <span className={styles.subtitle}>Followed by</span>
                              <NavLink to={`${profileConstant.path}/${account.id}`}>
                                <img className={styles.avatar + " " + styles.avatar__small} src={account?.data().avatar ? account?.data().avatar : defaultAvatar} alt={account?.data().surname + " " + account?.data().name} title={account?.data().surname + " " + account?.data().name} />
                              </NavLink>
                            </AvatarGroup>
                          </div>
                        </div>
                      </div>
                    ) : undefined
                  )
                ) : (
                  <div key={account?.id} className={styles.wrapper_contact}>
                    <div className={styles.wrapper_contact_info}>
                      <NavLink className={styles.wrapper_contact_info_avatar} to={`${profileConstant.path}/${account?.id}`}>
                        <img className={styles.avatar + " " + styles.avatar__medium} src={account?.data()?.avatar || defaultAvatar} alt="" />
                      </NavLink>

                      <div className={styles.wrapper_contact_info_detail}>
                        <NavLink className={styles.fullName} to={`${profileConstant.path}/${account?.id}`}>
                          {account?.data()?.surname + " " + account?.data()?.name}
                        </NavLink>
                      </div>
                    </div>
                  </div>
                )
              )
            : undefined}

          {/* default content for sidebar */}
          {recommendation.length < 1 || !recommendation ? (
            <div className={styles.default_content}>
              <div className={styles.default_content__wrapper_icon}>
                <PeopleOutlineIcon />
              </div>
              <div className={styles.default_content__subtitle}>No suggestions found</div>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default Main;
