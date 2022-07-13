import React from "react";
import { chatConstant, friendsConstant, mainConstant } from "../../../../core/constants/constants";
import { FirebaseType, LocationType, MessageType } from "../../../../types/types";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import commonStyles from "../Navbar.module.scss";
import Checkbox from "@mui/material/Checkbox";
import styles from "./NavbarRow.module.scss";
import Home from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";

interface NavbarRowPropsType {
  messages: Array<FirebaseType<MessageType>>;
  location: LocationType;
  isBottomNavigation: boolean;
}

interface DuplicateCodeFuncPropsType {
  messages: Array<FirebaseType<MessageType>>;
  path: string;
  exact?: boolean;
  icon: React.ReactElement;
  isBottomNavigation: boolean;
}

const DuplicateCodeFunc = (props: DuplicateCodeFuncPropsType) => {
  let [count, setCount] = React.useState(0);
  const [invisible, setInvisible] = React.useState(false);

  React.useEffect(() => {
    setCount(++count);
  }, [props.messages.length]);

  return (
    <div className={styles.wrapper_nav_link}>
      {/* <div>
      </div> */}

      <NavLink className={props.isBottomNavigation ? styles.nav_linkRow : styles.nav_linkRow__bottom + " " + commonStyles.common_nav_linkRow} to={props.path} exact={props.exact}>
        <div className={styles.wrapper_icon}>
          {props.icon}
          <Badge className={styles.badge} color="error" badgeContent={count}></Badge>
        </div>
      </NavLink>
    </div>
  );
};

const NavbarRow = (props: NavbarRowPropsType) => {
  const [count, setCount] = React.useState(0);

  return (
    <div className={!props.isBottomNavigation ? styles.navbar_row : styles.navbar_row_bottom}>
      <DuplicateCodeFunc messages={props.messages} path={`${mainConstant.path}`} icon={<Checkbox icon={props.location.pathname !== mainConstant.path ? <HomeOutlinedIcon className={styles.icon} /> : <Home className={styles.icon_active} />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} exact isBottomNavigation={props.isBottomNavigation} />
      <DuplicateCodeFunc messages={props.messages} path={`${chatConstant.path}`} icon={<Checkbox icon={!props.location.pathname.includes(chatConstant.path) ? <ChatOutlinedIcon className={styles.icon} /> : <ChatRoundedIcon className={styles.icon_active} />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} exact isBottomNavigation={props.isBottomNavigation} />
      <DuplicateCodeFunc messages={props.messages} path={`${friendsConstant.path}`} icon={<Checkbox icon={!props.location.pathname.includes(friendsConstant.path) ? <PeopleOutlineIcon className={styles.icon} /> : <PeopleRoundedIcon className={styles.icon_active} />} sx={{ "& .MuiSvgIcon-root": { fontSize: 23 } }} />} isBottomNavigation={props.isBottomNavigation} />
    </div>
  );
};

export default NavbarRow;
