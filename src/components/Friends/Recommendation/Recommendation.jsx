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
	let checkFollow =
		props.account && props.account.profile && props.account.profile.following
			? props.account.profile.following.map(followingAccount => followingAccount.id)
			: undefined;

	console.log(checkFollow);

	return (
		<div className={styles.content}>
			{props.accounts
				? props.accounts.map(account =>
						account?.id !== props?.account?.id ? (
							<Card key={account.id} className={styles.card}>
								<CardActionArea className={styles.head}>
									<NavLink className={styles.navLink} to={`${profileConstant}/` + account?.id}>
										<CardMedia
											className={styles.wrapper_avatar}
											component='img'
											image={account?.profile?.avatar ? account.profile.avatar : defaultAvatar}
											alt=''
										/>
										<CardContent className={styles.head_content}>
											<Typography className={styles.full_name} component='div'>
												{account?.profile?.surname + " " + account?.profile?.name}
											</Typography>
										</CardContent>
									</NavLink>
								</CardActionArea>

								<CardActions key={account.id} className={styles.footer}>
									{checkFollow
										? checkFollow.map(followingAccount =>
												followingAccount === account.id ? (
													<Button key={followingAccount} style={{ textTransform: "capitalize" }} variant='contained'>
														Unfollow
													</Button>
												) : (
													<Button
														key={followingAccount}
														style={{ textTransform: "capitalize" }}
														onClick={() => props.following(account.id)}
														variant='contained'>
														Follow
													</Button>
												)
										  )
										: undefined}
								</CardActions>
							</Card>
						) : undefined
				  )
				: undefined}
			{/* {props.accounts
				? props.accounts.map(account =>
						props.account && props.account.profile && props.account.profile.following ? (
							props.account.profile.following.map(followedAccount => {
								if (account.id !== followedAccount.id && account.id !== props.account.id) {
									return (
										<Card key={followedAccount.id} className={styles.card}>
											<CardActionArea className={styles.head}>
												<NavLink className={styles.navLink} to={`${profileConstant}/` + account.id}>
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

											<CardActions className={styles.footer}>
												{followedAccount.id !== account.id ? (
													<Button style={{ textTransform: "capitalize" }} variant='contained'>
														Unfollow
													</Button>
												) : (
													<Button
														style={{ textTransform: "capitalize" }}
														onClick={() => props.following(account.id)}
														variant='contained'>
														Follow
													</Button>
												)}
											</CardActions>
										</Card>
									);
								}
							})
						) : account.id !== props.account.id ? (
							<Card key={account.id} className={styles.card}>
								<CardActionArea className={styles.head}>
									<NavLink className={styles.navLink} to={`${profileConstant}/` + account.id}>
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
									{checkFollow ? (
										<Button style={{ textTransform: "capitalize" }} variant='contained'>
											Unfollow
										</Button>
									) : (
										<Button
											style={{ textTransform: "capitalize" }}
											onClick={() => props.following(account.id)}
											variant='contained'>
											Follow
										</Button>
									)}
								</CardActions>
							</Card>
						) : undefined
				  )
				: undefined} */}
		</div>
	);
};

export default Recommendation;
