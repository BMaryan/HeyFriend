import React from "react";
import { profileConstant, editConstant } from "../../../../core/constants/constants";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import Settings from "@mui/icons-material/SettingsOutlined";
import Person from "@mui/icons-material/PersonOutline";
import { AccountType } from "../../../../types/types";
import ListItemIcon from "@mui/material/ListItemIcon";
import commonStyles from "../Navbar.module.scss";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import styles from "./NavbarList.module.scss";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Chip from "@mui/material/Chip";

interface NavbarListPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  signOut: any;
}

const NavbarList = (props: NavbarListPropsType) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navbar_list}>
      <div className={styles.wrapper_nav_link}>
        <Chip onClick={handleClick} sx={{ fontSize: "15px" }} className={commonStyles.nav_link_toggleList} variant="outlined" label={props.account ? props.account.surname + " " + props.account.name : undefined} avatar={<Avatar src={props.account && props.account.avatar ? props.account.avatar : defaultAvatar} alt="" />} />
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
        <NavLink className={styles.nav_linkList + " " + commonStyles.common_nav_linkList} activeClassName={styles.nav_linkList_active} to={`${profileConstant.path}/${props?.account?.id}`}>
          <MenuItem className={styles.menu_item}>
            <ListItemIcon>
              <Person className={commonStyles.icon} />
            </ListItemIcon>
            Profile
          </MenuItem>
        </NavLink>

        <NavLink className={styles.nav_linkList + " " + commonStyles.common_nav_linkList} activeClassName={styles.nav_linkList_active} to={`${profileConstant.path}/${props?.account?.id}/saved`}>
          <MenuItem className={styles.menu_item}>
            <ListItemIcon>
              <BookmarkBorderOutlined className={commonStyles.icon} />
            </ListItemIcon>
            Saved
          </MenuItem>
        </NavLink>

        <NavLink className={styles.nav_linkList + " " + commonStyles.common_nav_linkList} activeClassName={styles.nav_linkList_active} to={`${editConstant.path}`} exact>
          <MenuItem className={styles.menu_item}>
            <ListItemIcon>
              <Settings className={commonStyles.icon} />
            </ListItemIcon>
            Settings
          </MenuItem>
        </NavLink>

        <MenuItem
          onClick={() => {
            props.signOut();
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
