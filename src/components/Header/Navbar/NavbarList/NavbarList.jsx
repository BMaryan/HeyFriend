import React from "react";
import commonStyles from "../Navbar.module.css";
import styles from "./NavbarList.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Person from "@mui/icons-material/PersonOutline";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import Settings from "@mui/icons-material/SettingsOutlined";
import Logout from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { profileConstant, editConstant } from "../../../../core/constants/constants";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const NavbarList = props => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	let dataFromAccountToAccounts = () => {
		if (props.accounts) {
			props.accounts.find(account => {
				if (account.id === props.account.id) {
					return (props.accounts[account.id - 1] = { ...props.account });
				}
			});
		}
	};

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={styles.navbar_list}>
			<div className={styles.wrapper_nav_link}>
				<Chip
					onClick={handleClick}
					sx={{ fontSize: "15px" }}
					className={commonStyles.nav_link_toggleList}
					variant='outlined'
					label={props.account && props.account.profile ? props.account.profile.surname + " " + props.account.profile.name : undefined}
					avatar={
						<Avatar
							src={
								props.account && props.account.profile && props.account.profile.avatar ? props.account.profile.avatar : defaultAvatar
							}
							alt=''
						/>
					}
				/>
			</div>

			<Menu
				className={styles.menu}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}>
				<NavLink
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to={`${profileConstant}`}>
					<MenuItem className={styles.menu_item}>
						<ListItemIcon>
							<Person className={commonStyles.icon} />
						</ListItemIcon>
						Profile
					</MenuItem>
				</NavLink>

				<NavLink
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to={`${profileConstant}/saved`}>
					<MenuItem className={styles.menu_item}>
						<ListItemIcon>
							<BookmarkBorderOutlined className={commonStyles.icon} />
						</ListItemIcon>
						Saved
					</MenuItem>
				</NavLink>

				<NavLink
					className={styles.nav_linkList + " " + commonStyles.common_nav_linkList}
					activeClassName={styles.nav_linkList_active}
					to={`${editConstant}`}
					exact>
					<MenuItem className={styles.menu_item}>
						<ListItemIcon>
							<Settings className={commonStyles.icon} />
						</ListItemIcon>
						Settings
					</MenuItem>
				</NavLink>

				<MenuItem
					onClick={() => {
						dataFromAccountToAccounts();
						props.isAccount(null);
						props.getAuthorizationId(null);
						props.getParamsId(null);
					}}
					sx={{ borderTop: "1px solid var(--bgWhite233)" }}
					className={styles.menu_item}>
					<ListItemIcon>
						<Logout sx={{ fontSize: 20 }} className={commonStyles.icon} />
					</ListItemIcon>
					Log Out
				</MenuItem>
			</Menu>
		</div>
	);
};

export default NavbarList;
