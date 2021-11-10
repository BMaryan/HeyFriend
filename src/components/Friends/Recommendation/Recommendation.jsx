import React from "react";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../core/constants/constants";
import styles from "../Friends.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Recommendation = props => {
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

								{/* <CardActions key={account.id} className={styles.footer}>
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
								</CardActions> */}
							</Card>
						) : undefined
				  )
				: undefined}
		</div>
	);
};

export default Recommendation;
