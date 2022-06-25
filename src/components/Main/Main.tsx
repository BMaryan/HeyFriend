import React from "react";
import { defaultPostConstant } from "../../core/constants/constantsPost";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { profileConstant } from "../../core/constants/constants";
import PostContainer from "../common/Post/PostContainer";
import AvatarGroup from "@mui/material/AvatarGroup";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import styles from "./Main.module.scss";
import Chip from "@mui/material/Chip";
import { AccountType, FollowersOfAccountType, FollowingOfAccountType, PostType } from "../../types/types";

interface MainPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  posts: Array<PostType>;
}

const Main = (props: MainPropsType) => {
  const followedAccountPosts: Array<PostType> = props?.account?.following ? props?.account?.following?.map((item: FollowingOfAccountType) => (props?.posts && item ? props?.posts?.filter((post: PostType) => (post?.data()?.accountId === item?.id ? post : [])) : [])).flat() : [];
  const unFollowingAccounts: Array<FollowingOfAccountType> = props?.account?.following ? props?.account?.following?.map((following: FollowingOfAccountType) => (props?.account?.followers ? props?.account?.followers?.filter((followers: FollowersOfAccountType) => following.id !== followers.id) : [])).flat() : [];
  const recommendation: Array<AccountType> = props?.accounts ? props?.accounts?.filter((account: AccountType) => unFollowingAccounts.find((unFollowing: FollowingOfAccountType) => account.id === unFollowing.id)) : [];

  return (
    <div className={styles.main}>
      {/* // content */}
      <div className={styles.main_content}>
        {followedAccountPosts?.length !== 0 ? followedAccountPosts.sort((a: PostType, b: PostType) => b?.data()?.dateCreated?.toDate() - a?.data()?.dateCreated?.toDate())?.map((post: PostType) => <PostContainer key={post.id} modal={false} post={post?.data()} kindOfPost={defaultPostConstant} />) : undefined}

        {/* default content */}
        {(followedAccountPosts && followedAccountPosts?.length === 0) || !followedAccountPosts ? (
          <div className={styles.default_content}>
            <div className={styles.default_content__wrapper_icon}>{}</div>
            <div className={styles.default_content__title}>News Feed</div>
            <div className={styles.default_content__subtitle}>Get started by adding friends. You'll see their posts here.</div>
          </div>
        ) : undefined}
      </div>

      {/* 



      /* sideBar right */}
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
            ? recommendation.slice(-5).map((account: AccountType) =>
                account?.data()?.following?.length > 0 ? (
                  account?.data()?.following?.map((followedAccount: FollowingOfAccountType) =>
                    followedAccount?.id !== props?.account?.id ? (
                      <div key={followedAccount?.id} className={styles.wrapper_contact}>
                        <div className={styles.wrapper_contact_info}>
                          <NavLink className={styles.wrapper_contact_info_avatar} to={`${profileConstant.path}/${followedAccount?.id}`}>
                            <img className={styles.avatar + " " + styles.avatar__medium} src={props.accounts.find((account) => account.id === followedAccount.id)?.data()?.avatar || defaultAvatar} alt="" />
                          </NavLink>

                          <div className={styles.wrapper_contact_info_detail}>
                            <NavLink className={styles.fullName} to={`${profileConstant.path}/${account?.id}`}>
                              {props.accounts.find((account) => account.id === followedAccount.id)?.data()?.surname + " " + props.accounts.find((account) => account.id === followedAccount.id)?.data()?.name}
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

          {/* default content */}
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
