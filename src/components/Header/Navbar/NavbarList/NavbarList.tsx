import React from "react";
import { profileConstant, editConstant } from "../../../../core/constants/constants";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
// import { removeOnlineInSessionStorage } from "../../../../core/methods/methods";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import Settings from "@mui/icons-material/SettingsOutlined";
import Person from "@mui/icons-material/PersonOutline";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AccountType } from "../../../../types/types";
import commonStyles from "../Navbar.module.scss";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import styles from "./NavbarList.module.scss";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Chip from "@mui/material/Chip";
import CustomAvatar from "../../../atoms/Avatar/Avatar";

interface NavbarListPropsType {
  account: AccountType | null;
  signOut: (account: AccountType) => void;
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
        <Chip onClick={handleClick} sx={{ fontSize: "15px" }} className={commonStyles.nav_link_toggleList} variant="outlined" label={props.account ? props.account.surname + " " + props.account.name : undefined} avatar={<CustomAvatar avatarData={props.account} size="medium" />} />
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
            props.account && props.signOut(props.account);
            // removeOnlineInSessionStorage();
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
