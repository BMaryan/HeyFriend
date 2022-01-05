import React from "react";
import styles from "../Friends.module.css";
import ownStyles from "./Recommendation.module.css";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../core/constants/constants";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Recommendation = props => {
	// let checkFollowing = props.account.profile.followers ? props.account.profile.followers.map(follower => follower) : undefined;
	let checkRecommendation = props.account.profile.followers ? props.account.profile.followers.filter(follower => props.account.profile.following 
			? props.account.profile.following.map(following => follower.id === following.id)
			: undefined)
		: undefined;

		console.log(checkRecommendation)

	return (
		<React.Fragment>
			<div className={styles.content}>
				{props.accounts
					? props.accounts.map(account =>
							props.account && props.account.profile && props.account.profile.followers
								? props.account.profile.followers.map(follower =>
										account.id !== props.account.id ? (
											<Card key={account.id} className={styles.card}>
												<CardActionArea className={styles.head}>
													<NavLink className={styles.navLink} key={account.id} to={`${profileConstant}/` + account.id}>
														<CardMedia
															className={styles.wrapper_avatar}
															component='img'
															image={account.profile && account.profile.avatar ? account.profile.avatar : defaultAvatar}
															alt=''
														/>
														<CardContent className={styles.head_content}>
															<Typography className={styles.full_name} component='div'>
																{account.profile.surname + " " + account.profile.name}
															</Typography>
														</CardContent>
													</NavLink>
												</CardActionArea>
											</Card>
										) : undefined
								  )
								: undefined
					  )
					: undefined}
			</div>

			{/* {(checkFollowing && checkFollowing.length < 1) || !checkFollowing ? (
				<div className={ownStyles.content}>
				<div className={ownStyles.title}>Followers</div>
				<div className={ownStyles.subtitle}>People who are watching you will be displayed here</div>
			</div>
			) : undefined} */}
		</React.Fragment>
	);
};

export default Recommendation;
