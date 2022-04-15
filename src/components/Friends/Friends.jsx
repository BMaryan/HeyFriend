import React from "react";
import styles from "./Friends.module.scss";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { friendsConstant } from "../../core/constants/constants";
import Following from "./Following/Following";
import Followers from "./Followers/Followers";
import Recommendation from "./Recommendation/Recommendation";
import DefaultFriends from "./DefaultFriends/DefaultFriends";
import { useLocation } from "react-router-dom";
import GoBackHead from "../common/GoBackHead/GoBackHead";
import Media from "react-media";

const Friends = (props) => {
  let location = useLocation();

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

  let checkFollowing = location.pathname.includes(path.following);
  let checkFollowers = location.pathname.includes(path.followers);
  let checkRecommendation = location.pathname.includes(path.recommendation);

  return (
    <div className={styles.friends}>
      <div className={styles.wrapper_friends}>
        {/* head for go back */}
        {checkFollowing || checkFollowers || checkRecommendation ? <Media query={{ maxWidth: 399 }}>{(matches) => (matches ? <GoBackHead title={checkFollowing ? title.following : checkFollowers ? title.followers : checkRecommendation ? title.recommendation : undefined} /> : <></>)}</Media> : undefined}

        {/* menu */}
        <div className={!(checkFollowing || checkFollowers || checkRecommendation) ? styles.friends_menu : styles.friends_menu__none}>
          <ul className={styles.menu}>
            <li className={styles.friends_item}>
              <NavLink exact to={`${friendsConstant}/${path.following}`} className={styles.item} activeClassName={styles.item_active}>
                Following
              </NavLink>
            </li>
            <li className={styles.friends_item}>
              <NavLink exact to={`${friendsConstant}/${path.followers}`} className={styles.item} activeClassName={styles.item_active}>
                Followers
              </NavLink>
            </li>
            <li className={styles.friends_item}>
              <NavLink exact to={`${friendsConstant}/${path.recommendation}`} className={styles.item} activeClassName={styles.item_active}>
                Recommendation
              </NavLink>
            </li>
          </ul>
        </div>

        {/* content */}
        <div className={styles.friends_content}>
          <Route exact path={`${friendsConstant}/${path.following}`} render={() => <Following {...props} />} />
          <Route exact path={`${friendsConstant}/${path.followers}`} render={() => <Followers {...props} />} />
          <Route exact path={`${friendsConstant}/${path.recommendation}`} render={() => <Recommendation {...props} />} />
          <Route exact path={`${friendsConstant}`} render={() => <DefaultFriends {...props} />} />
        </div>
      </div>
    </div>
  );
};

export default Friends;
