import React from "react";
import { chatConstant, friendsConstant, mainConstant } from "../../core/constants/constants";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import BottomNavigation from "@mui/material/BottomNavigation";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import styles from "./withBottomNavigation.module.scss";
import { HistoryType } from "../../types/types";
import Home from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import Paper from "@mui/material/Paper";

interface WithBottomNavigationPropsType {
  history: HistoryType;
}

export const withBottomNavigation = (Component: React.FunctionComponent<WithBottomNavigationPropsType>) => (props: WithBottomNavigationPropsType) => {
  const [value, setValue] = React.useState(0);

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
          <BottomNavigationAction component={NavLink} to={`/`} label="" icon={props.history.location.pathname !== mainConstant.path ? <HomeOutlinedIcon color="action" /> : <Home color="action" />} />
          <BottomNavigationAction component={NavLink} to={`${chatConstant.path}`} label="" icon={props.history.location.pathname !== chatConstant.path ? <ChatOutlinedIcon color="action" /> : <ChatRoundedIcon color="action" />} />
          <BottomNavigationAction component={NavLink} to={`${friendsConstant.path}`} label="" icon={props.history.location.pathname !== friendsConstant.path ? <PeopleOutlineIcon color="action" /> : <PeopleRoundedIcon color="action" />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};
