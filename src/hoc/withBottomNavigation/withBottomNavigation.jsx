import React from "react";
import styles from "./withBottomNavigation.module.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Home from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { NavLink, useLocation } from "react-router-dom";
import { chatConstant, friendsConstant } from "../../core/constants/constants";

export let withBottomNavigation = Component => props => {
	const [value, setValue] = React.useState(0);
	let location = useLocation();

	return (
		<>
			<Component {...props} />

			<Paper className={styles.paper}>
				<BottomNavigation
					className={styles.paper_bottom_navigation}
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}>
					<NavLink to={`/`} exact={props.exact}>
						<BottomNavigationAction icon={location.pathname !== "/" ? <HomeOutlinedIcon /> : <Home color='action' />} />
					</NavLink>
					<NavLink to={`${chatConstant}`} exact={props.exact}>
						<BottomNavigationAction
							icon={location.pathname !== chatConstant ? <ChatOutlinedIcon /> : <ChatRoundedIcon color='action' />}
						/>
					</NavLink>
					<NavLink to={`${friendsConstant}`} exact={props.exact}>
						<BottomNavigationAction
							icon={location.pathname !== friendsConstant ? <PeopleOutlineIcon /> : <PeopleRoundedIcon color='action' />}
						/>
					</NavLink>
				</BottomNavigation>
			</Paper>
		</>
	);
};
