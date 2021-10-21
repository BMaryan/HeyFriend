import React from "react";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../core/constants/constants";
import styles from "../Friends.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Recommendation = props => {
	return (
		<div className={styles.content}>
			{props.accounts
				? props.accounts.map(account =>
						props.account && props.account.profile && props.account.profile.following ? (
							props.account.profile.following.map(followedAccount => {
								if (account.id !== followedAccount.id) {
									return (
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
														<Typography variant='body2' className={styles.subtitle}>
															3 common friends.
														</Typography>
													</CardContent>
												</NavLink>
											</CardActionArea>

											<CardActions className={styles.footer}>
												<Button variant='contained' color='primary'>
													Follow
												</Button>
											</CardActions>
										</Card>
									);
								}
							})
						) : (
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
											<Typography variant='body2' className={styles.subtitle}>
												3 common friends.
											</Typography>
										</CardContent>
									</NavLink>
								</CardActionArea>

								<CardActions className={styles.footer}>
									<Button variant='contained' color='primary'>
										Follow
									</Button>
								</CardActions>
							</Card>
						)
				  )
				: undefined}
		</div>
	);
};

export default Recommendation;
