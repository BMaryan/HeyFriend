import React from "react";
import commonStyles from "../Navbar.module.scss";
import styles from "./NavbarList.module.scss";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Person from "@mui/icons-material/PersonOutline";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import Settings from "@mui/icons-material/SettingsOutlined";
import Logout from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { profileConstant, editConstant } from "../../../../core/constants/constants";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const NavbarList = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  let dataFromAccountToAccounts = () => {
    if (props.accounts) {
      props.accounts.find((account) => {
        return account.id === props.account.id ? (props.accounts[account.id - 1] = { ...props.account }) : undefined;
      });
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navbar_list}>
      <div className={styles.wrapper_nav_link}>
        <Chip className={commonStyles.nav_link_toggleList} onClick={handleClick} variant="outlined" label={props.account && props.account.profile ? props.account.profile.surname + " " + props.account.profile.name : undefined} avatar={<Avatar src={props.account && props.account.profile && props.account.profile.avatar ? props.account.profile.avatar : defaultAvatar} alt="" />} />
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
        }}>
        <NavLink className={styles.nav_linkList + " " + commonStyles.common_nav_linkList} activeClassName={styles.nav_linkList_active} to={`${profileConstant}`}>
          <MenuItem className={styles.menu_item}>
            <ListItemIcon>
              <Person className={commonStyles.icon} />
            </ListItemIcon>
            Profile
          </MenuItem>
        </NavLink>

        <NavLink className={styles.nav_linkList + " " + commonStyles.common_nav_linkList} activeClassName={styles.nav_linkList_active} to={`${profileConstant}/saved`}>
          <MenuItem className={styles.menu_item}>
            <ListItemIcon>
              <BookmarkBorderOutlined className={commonStyles.icon} />
            </ListItemIcon>
            Saved
          </MenuItem>
        </NavLink>

        <NavLink className={styles.nav_linkList + " " + commonStyles.common_nav_linkList} activeClassName={styles.nav_linkList_active} to={`${editConstant}`} exact>
          <MenuItem className={styles.menu_item}>
            <ListItemIcon>
              <Settings className={commonStyles.icon} />
            </ListItemIcon>
            Settings
          </MenuItem>
        </NavLink>

        <MenuItem
          className={styles.menu_item}
          onClick={() => {
            dataFromAccountToAccounts();
            props.isAccount(null);
            props.getAuthorizationId(null);
            props.getParamsId(null);
          }}>
          <ListItemIcon>
            <Logout className={commonStyles.icon} />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavbarList;
