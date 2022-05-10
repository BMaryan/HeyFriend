import React from "react";
import styles from "./withBottomNavigation.module.scss";
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
import { chatConstant, friendsConstant, mainConstant } from "../../core/constants/constants";

export let withBottomNavigation = (Component) => (props) => {
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
          <BottomNavigationAction component={NavLink} to={`/`} label="" icon={location.pathname !== mainConstant.path ? <HomeOutlinedIcon color="action" /> : <Home color="action" />} />
          <BottomNavigationAction component={NavLink} to={`${chatConstant.path}`} label="" icon={location.pathname !== chatConstant.path ? <ChatOutlinedIcon color="action" /> : <ChatRoundedIcon color="action" />} />
          <BottomNavigationAction component={NavLink} to={`${friendsConstant.path}`} label="" icon={location.pathname !== friendsConstant.path ? <PeopleOutlineIcon color="action" /> : <PeopleRoundedIcon color="action" />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};
