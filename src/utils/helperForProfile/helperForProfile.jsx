import React from "react";
import styles from "./helperForProfile.module.scss";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { getPictureBase64, removePicture } from "../../core/methods/methods";
import Button from "@mui/material/Button";
import PostContainer from "../../components/common/Post/PostContainer";
import { modalPostConstant } from "../../core/constants/constantsPost";
import { NavLink } from "react-router-dom";
import { photoConstant } from "../../core/constants/constants";
import { onlyBodyPostConstant } from "../../core/constants/constantsPost";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const DuplicateCodeFunc = (props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={props.open}>
        <Box className={props.class}>{props.children}</Box>
      </Fade>
    </Modal>
  );
};

export const ChangeProfilePictureContainer = (props) => {
  return (
    <DuplicateCodeFunc {...props} open={props.openModalAvatarProfile} close={() => props.setOpenModalAvatarProfile(false)} class={styles.change_profile_picture_container}>
      <div className={styles.change_profile_picture_content}>
        <div className={styles.title}>Change profile photo</div>
        <Button className={styles.wrapper_item + " " + styles.wrapper_upload_picture}>
          <label>
            Upload photo
            <input
              onChange={(event) => {
                getPictureBase64({ event: event, method: props.updateAccountThunk, account: props.account, key: "avatar" });
                props.setOpenModalAvatarProfile(false);
              }}
              id="file-upload"
              type="file"
              accept="image/*"
            />
          </label>
        </Button>

        <Button
          className={styles.wrapper_item}
          onClick={() => {
            removePicture({ method: props.updateAccountThunk, account: props.account, key: "avatar" });
            props.setOpenModalAvatarProfile(false);
          }}>
          Remove current photo
        </Button>

        <Button className={styles.wrapper_item} onClick={() => props.setOpenModalAvatarProfile(false)}>
          Cancel
        </Button>
      </div>
    </DuplicateCodeFunc>
  );
};

export const ContainerCoverProfile = (props) => {
  return (
    <DuplicateCodeFunc {...props} open={props.openModalCoverProfile} close={() => props.setOpenModalCoverProfile(false)} class={styles.change_profile_picture_container}>
      <div className={styles.change_profile_picture_content}>
        <div className={styles.title}>Change profile cover photo</div>
        <Button className={styles.wrapper_item + " " + styles.wrapper_upload_picture}>
          <label>
            Upload cover photo
            <input
              onChange={(event) => {
                getPictureBase64({ event: event, method: props.updateAccountThunk, account: props.account, key: "coverPhoto" });
                props.setOpenModalCoverProfile(false);
              }}
              id="file-upload"
              type="file"
              accept="image/*"
            />
          </label>
        </Button>

        <Button
          className={styles.wrapper_item}
          onClick={() => {
            removePicture({ method: props.updateAccountThunk, account: props.account, key: "coverPhoto" });
            props.setOpenModalCoverProfile(false);
          }}>
          Remove cover photo
        </Button>

        <Button className={styles.wrapper_item} onClick={() => props.setOpenModalCoverProfile(false)}>
          Cancel
        </Button>
      </div>
    </DuplicateCodeFunc>
  );
};

export let ToggleShowCurrentPostContainer = (props) => {
  return (
    <DuplicateCodeFunc
      {...props}
      open={props.openModalCurrentPost}
      close={() => {
        props.setOpenModalCurrentPost(false);
        props.history.goBack();
      }}
      class={styles.modal_current_post_container}>
      <PostContainer post={props.currentPost} kindOfPost={modalPostConstant} modal={true} />
    </DuplicateCodeFunc>
  );
};

const DuplicateCodeReturnImageList = (props) => {
  return (
    // <div className={styles.posts}>
    <div className={styles.wrapper_posts}>
      <NavLink exact onClick={() => (props.openModalCurrentPost ? props.setOpenModalCurrentPost(false) : props.setOpenModalCurrentPost(true))} to={`${photoConstant.path}/${props?.post?.id}`} className={styles.post}>
        <PostContainer post={props?.post} kindOfPost={onlyBodyPostConstant} />
      </NavLink>
    </div>
    // {/* </div> */}
  );
};

const ReturnDefaultContentForImageList = (props) => {
  return (
    <div className={styles.default_content_images_list}>
      {props.icon ? <div className={styles.default_content_wrapper_icon}>{props.icon}</div> : undefined}
      {props.title ? <div className={styles.default_content_title}>{props.title}</div> : undefined}
      {props.subtitle ? <div className={styles.default_content_subtitle}>{props.subtitle}</div> : undefined}
      {props.subSubTitle ? <div className={styles.default_content_subSubTitle}>{props.subSubTitle}</div> : undefined}
    </div>
  );
};

export let ReturnImageList = (props) => {
  let isPosts = props?.isAccountPosts?.find((item) => item);

  return (
    <>
      {/* return posts list */}
      {isPosts && props?.logicOfPagePost && <div className={styles.posts}>{props?.posts?.map((post, index) => post?.data()?.accountId === props?.id && <DuplicateCodeReturnImageList key={post.id + index} {...props} post={post?.data()} currentAccount={props.currentAccount} />)}</div>}

      {/* return default content if posts don't have */}
      {!isPosts && !props.isSaved ? props?.logicOfPagePost && props?.id === props?.account?.id ? <ReturnDefaultContentForImageList icon={<AddAPhotoOutlinedIcon />} title={"Share Photos and Videos"} subtitle={"When you share photos and videos, they'll appear on your profile."} /> : <ReturnDefaultContentForImageList icon={<PhotoCameraOutlinedIcon />} title={"No posts yet"} /> : undefined}

      {/* return saved posts list */}
      {props.isSaved ? (
        !props.logicOfPagePost && props.posts ? (
          <div className={props?.isSavedPosts?.length !== 0 ? styles.posts : styles.posts__columns}>
            {props?.posts?.map((post) => post?.data()?.saved?.map((saved) => (props?.account?.id === saved?.id ? <DuplicateCodeReturnImageList key={post.id} {...props} post={post?.data()} currentAccount={props.currentAccount} /> : undefined)))}

            {!props?.isSavedPosts || props?.isSavedPosts?.length === 0 ? <ReturnDefaultContentForImageList icon={<BookmarkBorderOutlinedIcon />} title={"Save"} subtitle={"Save photos and videos that you want to see again."} subSubTitle={"Only you can see what you have saved."} /> : undefined}
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
};
