import React from "react";
import { NavLink } from "react-router-dom";
import commonStyles from "../Navbar.module.css";
import styles from "./NavbarRow.module.css";
import { chatConstant, friendsConstant } from "../../../../core/constants/constants";
import Checkbox from "@mui/material/Checkbox";
import Home from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const DuplicateCodeFunc = props => {
	return (
		<div className={styles.wrapper_nav_link}>
			<NavLink
				className={styles.nav_linkRow + " " + commonStyles.common_nav_linkRow}
				activeClassName={commonStyles.nav_linkRow_active}
				to={props.path}
				exact={props.exact}>
				<div>{props.icon}</div>
			</NavLink>
		</div>
	);
};

const NavbarRow = props => {
	return (
		<div className={styles.navbar_row}>
			<DuplicateCodeFunc path='/' icon={<Checkbox icon={<HomeOutlinedIcon />} checkedIcon={<Home color='action' />} />} exact />
			<DuplicateCodeFunc
				path={`${chatConstant}`}
				icon={<Checkbox icon={<ChatOutlinedIcon />} checkedIcon={<ChatRoundedIcon color='action' />} />}
				exact
			/>
			<DuplicateCodeFunc
				path={`${friendsConstant}`}
				icon={<Checkbox icon={<PeopleOutlineIcon />} checkedIcon={<PeopleRoundedIcon color='action' />} />}
				exact
			/>
		</div>
	);
};

export default NavbarRow;
