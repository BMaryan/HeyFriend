import React from "react";
import styles from "../Post.module.scss";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { NavLink } from "react-router-dom";
import { photoConstant, profileConstant } from "../../../../core/constants/constants";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import betaVershion from "../../../../assets/images/betaVershion.png";

const HeadPost = (props) => {
  let history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // test
  let date = new Date();
  date.setMilliseconds(date.getSeconds() - props?.post?.data()?.dateCreated.nanoseconds);

  return (
    <div className={styles.head}>
      <div className={styles.wrapper_details}>
        <div className={styles.details_position}>
          <NavLink to={`${profileConstant.path}/${props?.currentAccount?.id}`}>
            <div className={styles.wrapper_profile_img}>
              <img className={styles.profile_avatar} src={props?.currentAccount?.avatar || defaultAvatar} alt="" />
            </div>
          </NavLink>

          <div className={styles.details}>
            <NavLink to={`${profileConstant.path}/${props?.currentAccount?.id}`} className={styles.fullName}>
              {props?.currentAccount?.surname + " " + props?.currentAccount?.name}
            </NavLink>
            {props?.post?.data()?.dateCreated ? <div className={styles.date}>{date.toLocaleDateString() + " " + date.toLocaleTimeString()}</div> : undefined}
          </div>
        </div>

        <div className={styles.wrapper_button}>
          <IconButton onClick={handleOpen} className={styles.button_icon}>
            <MoreHorizIcon className={styles.icon} />
          </IconButton>
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={open}>
            <Box className={styles.modalPostActions}>
              {props?.account?.id === props?.currentAccount?.id ? (
                <>
                  <Button
                    onClick={() => {
                      props.deletePostThunk(props?.post);
                      // props.deletePost(props?.post?.id);
                      history.push(`${profileConstant.path}/${props?.account?.id}`);
                    }}
                    className={styles.item + " " + styles.item__border + " " + styles.item__red}
                    variant="text">
                    Delete
                  </Button>
                  <Button
                    variant="text"
                    className={styles.item + " " + styles.item__border}
                    onClick={() => {
                      history.push(`${photoConstant.path}/${props?.post?.id}`);
                      handleClose();
                    }}>
                    Go to post
                  </Button>
                  <Button onClick={handleClose} variant="text" className={styles.item}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="text" className={styles.item + " " + styles.item__border + " " + styles.item__red}>
                    <img className={styles.item_beta_vershion_picture} src={betaVershion} alt="" />
                    Report
                  </Button>
                  <Button
                    variant="text"
                    className={styles.item + " " + styles.item__border + " " + styles.item__red}
                    onClick={() => {
                      props.unFollowing(props?.currentAccount?.id);
                      handleClose();
                    }}>
                    Unfollow
                  </Button>
                  <Button variant="text" className={styles.item + " " + styles.item__border}>
                    <img className={styles.item_beta_vershion_picture} src={betaVershion} alt="" />
                    Share to...
                  </Button>
                  <Button variant="text" className={styles.item + " " + styles.item__border}>
                    <img className={styles.item_beta_vershion_picture} src={betaVershion} alt="" />
                    Copy link
                  </Button>
                  <Button onClick={handleClose} variant="text" className={styles.item}>
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default HeadPost;
