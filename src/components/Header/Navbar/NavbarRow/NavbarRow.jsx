import React from "react";
import { NavLink } from "react-router-dom";
import commonStyles from "../Navbar.module.scss";
import styles from "./NavbarRow.module.scss";
import { chatConstant, friendsConstant } from "../../../../core/constants/constants";
import Checkbox from "@mui/material/Checkbox";
import Home from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useLocation } from "react-router-dom";

const DuplicateCodeFunc = (props) => {
  return (
    <div className={styles.wrapper_nav_link}>
      <NavLink className={!props.isBottomNavigation ? styles.nav_linkRow : styles.nav_linkRow__bottom + " " + commonStyles.common_nav_linkRow} to={props.path} exact={props.exact}>
        <div>{props.icon}</div>
      </NavLink>
    </div>
  );
};

const NavbarRow = (props) => {
  let location = useLocation();

  return (
    <div className={!props.isBottomNavigation ? styles.navbar_row : styles.navbar_row_bottom}>
      <DuplicateCodeFunc path="/" icon={<Checkbox icon={location.pathname !== "/" ? <HomeOutlinedIcon /> : <Home color="action" />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} exact />
      <DuplicateCodeFunc path={`${chatConstant}`} icon={<Checkbox icon={location.pathname !== chatConstant ? <ChatOutlinedIcon /> : <ChatRoundedIcon color="action" />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} exact />
      <DuplicateCodeFunc path={`${friendsConstant}`} icon={<Checkbox icon={!location.pathname.includes(friendsConstant) ? <PeopleOutlineIcon /> : <PeopleRoundedIcon color="action" />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} />
    </div>
  );
};

export default NavbarRow;
