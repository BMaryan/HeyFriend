import React from "react";
import { friendsConstant } from "../../core/constants/constants";
import { AccountType, LocationType } from "../../types/types";
import Recommendation from "./Recommendation/Recommendation";
import DefaultFriends from "./DefaultFriends/DefaultFriends";
import GoBackHead from "../common/GoBackHead/GoBackHead";
import Following from "./Following/Following";
import Followers from "./Followers/Followers";
import styles from "./Friends.module.scss";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import Media from "react-media";

interface FriendsPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  location: LocationType;
}

const Friends = (props: FriendsPropsType) => {
  let title = {
    following: "Following",
    followers: "Followers",
    recommendation: "Recommendation",
  };

  let path = {
    following: "following",
    followers: "followers",
    recommendation: "recommendation",
  };

  let checkFollowing = props.location.pathname.includes(path.following);
  let checkFollowers = props.location.pathname.includes(path.followers);
  let checkRecommendation = props.location.pathname.includes(path.recommendation);

  return (
    <div className={styles.friends}>
      <div className={styles.wrapper_friends}>
        {/* head for go back */}
        {checkFollowing || checkFollowers || checkRecommendation ? <Media query={{ maxWidth: 399 }}>{(matches) => (matches ? <GoBackHead title={checkFollowing ? title.following : checkFollowers ? title.followers : checkRecommendation ? title.recommendation : undefined} /> : <></>)}</Media> : undefined}

        {/* menu */}
        <div className={!(checkFollowing || checkFollowers || checkRecommendation) ? styles.friends_menu : styles.friends_menu__none}>
          <ul className={styles.menu}>
            <li className={styles.friends_item}>
              <NavLink exact to={`${friendsConstant.path}/${path.following}`} className={styles.item} activeClassName={styles.item_active}>
                Following
              </NavLink>
            </li>
            <li className={styles.friends_item}>
              <NavLink exact to={`${friendsConstant.path}/${path.followers}`} className={styles.item} activeClassName={styles.item_active}>
                Followers
              </NavLink>
            </li>
            <li className={styles.friends_item}>
              <NavLink exact to={`${friendsConstant.path}/${path.recommendation}`} className={styles.item} activeClassName={styles.item_active}>
                Recommendation
              </NavLink>
            </li>
          </ul>
        </div>

        {/* content */}
        <div className={styles.friends_content}>
          <Route exact path={`${friendsConstant.path}/${path.following}`} render={() => <Following accounts={props.accounts} account={props.account} />} />
          <Route exact path={`${friendsConstant.path}/${path.followers}`} render={() => <Followers accounts={props.accounts} account={props.account} />} />
          <Route exact path={`${friendsConstant.path}/${path.recommendation}`} render={() => <Recommendation accounts={props.accounts} account={props.account} />} />
          <Route exact path={`${friendsConstant.path}`} render={() => <DefaultFriends {...props} />} />
        </div>
      </div>
    </div>
  );
};

export default Friends;
