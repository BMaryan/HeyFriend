import React from "react";
import styles from "./Main.module.scss";
import PostContainer from "../common/Post/PostContainer";
import { defaultPostConstant } from "../../core/constants/constantsPost";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../core/constants/constants";
import AvatarGroup from "@mui/material/AvatarGroup";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Stories from "../common/Stories/Stories";

const Main = (props) => {
  // let followedAccounts = props.account.profile.following
  // 	? props.account.profile.following.map(followingAccount =>
  // 			props.accounts ? props.accounts.find(account => account.id === followingAccount.id) : undefined
  // 	  )
  // 	: undefined;

  // let followedByNotMe = followedAccounts
  // 	? followedAccounts.filter(account =>
  // 			account.profile.following && account.profile.following.length > 0
  // 				? account.profile.following.find(followedAccount => followedAccount.id !== props.account.id)
  // 				: undefined
  // 	  )
  // 	: undefined;

  // let checkPosts = followedAccounts
  // 	? followedAccounts.filter(account => (account.profile.posts ? account.profile.posts.map(post => post) : undefined))
  // 	: undefined;

  // let checkFollowing = followedAccounts
  // 	? followedAccounts.filter(account =>
  // 			account.profile.following && account.profile.following.length > 0 ? account.profile.following.map(following => following) : undefined
  // 	  )
  // 	: undefined;

  // props.getDefaultAccount(null);

  //   let currentAccount = props?.accounts ? props?.accounts?.filter((account) => (props?.account?.following ? props?.account?.following.find((item) => account?.data()?.id === item?.id) : undefined)) : undefined;
  let followedAccountPosts = props?.account?.following ? props?.account?.following?.map((item) => (props?.posts && item ? props?.posts?.filter((post) => (post?.data()?.accountId === item?.id ? post : undefined)) : undefined)) : undefined;

  let unFollowingAccounts = props?.account?.following ? props?.account?.following?.map((following) => (props?.account?.followers ? props?.account?.followers?.filter((followers) => following.id !== followers.id) : undefined)) : undefined;
  let recommendation = props?.accounts ? props?.accounts?.filter((account) => unFollowingAccounts?.flat().find((unFollowing) => account.id === unFollowing.id)) : undefined;

  return (
    <div className={styles.main}>
      {/* // content */}
      <div className={styles.main_content}>
        <Stories {...props} />

        {followedAccountPosts?.length !== 0
          ? followedAccountPosts
              ?.flat()
              .sort((a, b) => new Date(b?.data()?.dateCreated.toDate()) - new Date(a?.data()?.dateCreated.toDate()))
              ?.map((post) => <PostContainer key={post.id} modal={false} post={post?.data()} kindOfPost={defaultPostConstant} />)
          : undefined}

        {/* default content */}
        {(followedAccountPosts?.flat() && followedAccountPosts?.flat()?.length === 0) || !followedAccountPosts?.flat() ? (
          <div className={styles.default_content}>
            <div className={styles.default_content__wrapper_icon}>{}</div>
            <div className={styles.default_content__title}>News Feed</div>
            <div className={styles.default_content__subtitle}>Get started by adding friends. You'll see their posts here.</div>
          </div>
        ) : undefined}
      </div>

      {/* 



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
            ? recommendation.slice(-5).map((account) =>
                account?.data()?.following?.length > 0 ? (
                  account?.data()?.following?.map((followedAccount) =>
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

{
  /* {followedAccounts
						? followedAccounts
								.map(account =>
									account.profile.following && account.profile.following.length > 0
										? account.profile.following.map(followedAccount =>
												followedAccount.id !== props.account.id ? (
													<div key={followedAccount.id} className={styles.wrapper_contact}>
														<div className={styles.wrapper_contact_info}>
															<NavLink
																className={styles.wrapper_contact_info_avatar}
																to={`${profileConstant.path}/${props.accounts[followedAccount.id - 1].id}`}>
																<img
																	className={styles.avatar + " " + styles.avatar__medium}
																	src={
																		props.accounts[followedAccount.id - 1].profile.avatar
																			? props.accounts[followedAccount.id - 1].profile.avatar
																			: defaultAvatar
																	}
																	alt=''
																/>
															</NavLink>

                              <div className={styles.wrapper_contact_info_detail}>
                                <NavLink className={styles.fullName} to={`${profileConstant.path}/${props.accounts[followedAccount.id - 1].id}`}>
                                  {props.accounts[followedAccount.id - 1].profile.surname + " " + props.accounts[followedAccount.id - 1].profile.name}
                                </NavLink>

																<AvatarGroup className={styles.avatar_group} max={3}>
																	<span className={styles.subtitle}>Followed by</span>
																	<NavLink to={`${profileConstant.path}/${account.id}`}>
																		<img
																			className={styles.avatar + " " + styles.avatar__small}
																			src={account.profile.avatar ? account.profile.avatar : defaultAvatar}
																			alt={account.profile.surname + " " + account.profile.name}
																			title={account.profile.surname + " " + account.profile.name}
																		/>
																	</NavLink>
																</AvatarGroup>
															</div>
														</div>
													</div>
												) : undefined
										  )
										: undefined
								)
								.slice(followedAccounts.length - 5)
						: undefined} */
}
