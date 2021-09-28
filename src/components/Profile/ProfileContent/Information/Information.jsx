import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Information.module.css";
import { Route } from "react-router-dom";
import Review from "./Review/Review";
import About from "./About/About";
import Contacts from "./Contacts/Contacts";

const Information = props => {
	return (
		<div>
			<div className={styles.information_container}>
				<div className={styles.menu}>
					<div className={styles.title}>Information</div>

					<div className={styles.navigation}>
						<NavLink exact to='/profile/information' className={styles.item} activeClassName={styles.item_active}>
							Review
						</NavLink>
						<NavLink exact to='/profile/information/about' className={styles.item} activeClassName={styles.item_active}>
							Details about you
						</NavLink>
						<NavLink exact to='/profile/information/contacts' className={styles.item} activeClassName={styles.item_active}>
							Contacts and basic information
						</NavLink>
					</div>
				</div>

				<div className={styles.content}>
					<Route exact path='/profile/information' render={() => <Review />} />
					<Route exact path='/profile/information/about' render={() => <About />} />
					<Route exact path='/profile/information/contacts' render={() => <Contacts />} />
				</div>
			</div>
		</div>
	);
};

export default Information;
