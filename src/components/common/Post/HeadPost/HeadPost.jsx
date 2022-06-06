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
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

const HeadPost = (props) => {
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [fullDes, setFullDes] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (props.modal) {
      setFullDes(true);
    }
  }, [props.modal]);

  return (
    <div className={styles.head}>
      <div className={styles.wrapper_details}>
        <ListItem className={styles.details_position} alignItems="flex-start">
          <ListItemAvatar>
            <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${props?.currentAccount?.id}`}>
              <Avatar src={props?.currentAccount?.avatar || defaultAvatar} alt="" />
            </NavLink>
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="div">
                <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                  <NavLink to={`${profileConstant.path}/${props?.currentAccount?.id}`} className={styles.fullName}>
                    {props?.currentAccount?.surname + " " + props?.currentAccount?.name}
                  </NavLink>
                </Typography>

                <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                  <IconButton onClick={handleOpen} className={styles.button_icon}>
                    <MoreHorizIcon className={styles.icon} />
                  </IconButton>
                </Typography>
              </Typography>
            }
            secondary={
              <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                {props?.post?.dateCreated ? <span className={styles.date}>{props?.post?.dateCreated.toDate().toDateString() + " " + props?.post?.dateCreated.toDate().toLocaleTimeString()}</span> : undefined}
              </Typography>
            }
          />
        </ListItem>

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

      {!props.modal && <div className={styles.wrapper_description}>{props?.post?.description ? <div className={styles.description}>{props?.post?.description.length <= 100 ? props?.post?.description : fullDes ? props?.post?.description : props?.post?.description.slice(0, 100) + " ..."}</div> : undefined}</div>}
    </div>
  );
};

export default HeadPost;
