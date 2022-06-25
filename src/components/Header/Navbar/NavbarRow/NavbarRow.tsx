import React from "react";
import { chatConstant, friendsConstant, mainConstant } from "../../../../core/constants/constants";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { LocationType } from "../../../../types/types";
import commonStyles from "../Navbar.module.scss";
import Checkbox from "@mui/material/Checkbox";
import styles from "./NavbarRow.module.scss";
import Home from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

interface DuplicateCodeFuncPropsType {
  path: string;
  exact?: boolean;
  icon: React.ReactElement;
  isBottomNavigation: boolean;
}

interface NavbarRowPropsType {
  location: LocationType;
  isBottomNavigation: boolean;
}

const DuplicateCodeFunc = (props: DuplicateCodeFuncPropsType) => {
  return (
    <div className={styles.wrapper_nav_link}>
      <NavLink className={props.isBottomNavigation ? styles.nav_linkRow : styles.nav_linkRow__bottom + " " + commonStyles.common_nav_linkRow} to={props.path} exact={props.exact}>
        <div>{props.icon}</div>
      </NavLink>
    </div>
  );
};

const NavbarRow = (props: NavbarRowPropsType) => {
  return (
    <div className={!props.isBottomNavigation ? styles.navbar_row : styles.navbar_row_bottom}>
      <DuplicateCodeFunc path={`${mainConstant.path}`} icon={<Checkbox icon={props.location.pathname !== mainConstant.path ? <HomeOutlinedIcon className={styles.icon} /> : <Home className={styles.icon_active} />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} exact isBottomNavigation={props.isBottomNavigation} />
      <DuplicateCodeFunc path={`${chatConstant.path}`} icon={<Checkbox icon={!props.location.pathname.includes(chatConstant.path) ? <ChatOutlinedIcon className={styles.icon} /> : <ChatRoundedIcon className={styles.icon_active} />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} exact isBottomNavigation={props.isBottomNavigation} />
      <DuplicateCodeFunc path={`${friendsConstant.path}`} icon={<Checkbox icon={!props.location.pathname.includes(friendsConstant.path) ? <PeopleOutlineIcon className={styles.icon} /> : <PeopleRoundedIcon className={styles.icon_active} />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} isBottomNavigation={props.isBottomNavigation} />
    </div>
  );
};

export default NavbarRow;
