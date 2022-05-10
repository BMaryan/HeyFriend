import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Information.module.scss";
import { Route } from "react-router-dom";
import Review from "./Review/Review";
import About from "./About/About";
import Contacts from "./Contacts/Contacts";
import { profileConstant } from "../../../../core/constants/constants";
import Media from "react-media";

const Information = (props) => {
  return (
    <div>
      <div className={styles.information_container}>
        <div className={styles.menu}>
          <div className={styles.title}>Information</div>

          <div className={styles.navigation}>
            <NavLink exact to={props.id ? `${profileConstant.path}/${props.id}/information` : `${profileConstant.path}/information`} className={styles.item} activeClassName={styles.item_active}>
              Review
            </NavLink>
            <NavLink exact to={props.id ? `${profileConstant.path}/${props.id}/information/about` : `${profileConstant.path}/information/about`} className={styles.item} activeClassName={styles.item_active}>
              <Media query={{ maxWidth: 600 }}>{(matches) => (!matches ? <>Details about me</> : <>Details</>)}</Media>
            </NavLink>
            <NavLink exact to={props.id ? `${profileConstant.path}/${props.id}/information/contacts` : `${profileConstant.path}/information/contacts`} className={styles.item} activeClassName={styles.item_active}>
              <Media query={{ maxWidth: 600 }}>{(matches) => (!matches ? <>Contacts and basic information</> : <>Contacts</>)}</Media>
            </NavLink>
          </div>
        </div>

        <div className={styles.content}>
          <Route exact path={props.id ? `${profileConstant.path}/${props.id}/information` : `${profileConstant.path}/information`} render={() => <Review {...props} />} />
          <Route exact path={props.id ? `${profileConstant.path}/${props.id}/information/about` : `${profileConstant.path}/information/about`} render={() => <About {...props} />} />
          <Route exact path={props.id ? `${profileConstant.path}/${props.id}/information/contacts` : `${profileConstant.path}/information/contacts`} render={() => <Contacts {...props} />} />
        </div>
      </div>
    </div>
  );
};

export default Information;
