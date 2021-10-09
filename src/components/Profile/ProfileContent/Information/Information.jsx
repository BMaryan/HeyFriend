import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Information.module.css";
import { Route } from "react-router-dom";
import Review from "./Review/Review";
import About from "./About/About";
import Contacts from "./Contacts/Contacts";
import { profileConstant } from "../../../../core/constants/constants";

const Information = props => {
	return (
		<div>
			<div className={styles.information_container}>
				<div className={styles.menu}>
					<div className={styles.title}>Information</div>

					<div className={styles.navigation}>
						<NavLink
							exact
							to={props.id ? `${profileConstant}/${props.id}/information` : `${profileConstant}/information`}
							className={styles.item}
							activeClassName={styles.item_active}>
							Review
						</NavLink>
						<NavLink
							exact
							to={props.id ? `${profileConstant}/${props.id}/information/about` : `${profileConstant}/information/about`}
							className={styles.item}
							activeClassName={styles.item_active}>
							Details about you
						</NavLink>
						<NavLink
							exact
							to={props.id ? `${profileConstant}/${props.id}/information/contacts` : `${profileConstant}/information/contacts`}
							className={styles.item}
							activeClassName={styles.item_active}>
							Contacts and basic information
						</NavLink>
					</div>
				</div>

				<div className={styles.content}>
					<Route
						exact
						path={props.id ? `${profileConstant}/${props.id}/information` : `${profileConstant}/information`}
						render={() => <Review {...props} />}
					/>
					<Route
						exact
						path={props.id ? `${profileConstant}/${props.id}/information/about` : `${profileConstant}/information/about`}
						render={() => <About {...props} />}
					/>
					<Route
						exact
						path={props.id ? `${profileConstant}/${props.id}/information/contacts` : `${profileConstant}/information/contacts`}
						render={() => <Contacts {...props} />}
					/>
				</div>
			</div>
		</div>
	);
};

export default Information;
