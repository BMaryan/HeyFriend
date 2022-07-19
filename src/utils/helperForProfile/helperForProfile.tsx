import React from "react";
import { AccountType, FirebaseType, HistoryType, PostType, SavedOfPostType } from "../../types/types";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { getPictureBase64, removePicture } from "../../core/methods/methods";
import { onlyBodyPostConstant } from "../../core/constants/constantsPost";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import PostContainer from "../../components/common/Post/PostContainer";
import { modalPostConstant } from "../../core/constants/constantsPost";
import { photoConstant } from "../../core/constants/constants";
import styles from "./helperForProfile.module.scss";
import Backdrop from "@mui/material/Backdrop";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

interface DuplicateCodeFuncType {
  children: React.ReactElement;
  class: string;
  open: boolean;
  close: () => void;
}

const DuplicateCodeFunc = (props: DuplicateCodeFuncType) => {
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

interface ChangeProfilePictureContainerType {
  account: AccountType | null;
  updateAccountThunk: (account: AccountType) => void;
  openModalAvatarProfile: boolean;
  setOpenModalAvatarProfile: (isOpened: boolean) => void;
}

export const ChangeProfilePictureContainer = (props: ChangeProfilePictureContainerType) => {
  return (
    <DuplicateCodeFunc open={props.openModalAvatarProfile} close={() => props.setOpenModalAvatarProfile(false)} class={styles.change_profile_picture_container}>
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

interface ContainerCoverProfileType {
  account: AccountType | null;
  updateAccountThunk: (account: AccountType) => void;
  openModalCoverProfile: boolean;
  setOpenModalCoverProfile: (isOpened: boolean) => void;
}

export const ContainerCoverProfile = (props: ContainerCoverProfileType) => {
  return (
    <DuplicateCodeFunc open={props.openModalCoverProfile} close={() => props.setOpenModalCoverProfile(false)} class={styles.change_profile_picture_container}>
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

interface ToggleShowCurrentPostContainerType {
  currentPost: FirebaseType<PostType>;
  history: HistoryType;
  openModalCurrentPost: boolean;
  setOpenModalCurrentPost: (isOpened: boolean) => void;
}

export let ToggleShowCurrentPostContainer = (props: ToggleShowCurrentPostContainerType) => {
  return (
    <DuplicateCodeFunc
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

interface DuplicateCodeReturnImageListType {
  post: FirebaseType<PostType>;
  openModalCurrentPost: boolean;
  setOpenModalCurrentPost: (isOpened: boolean) => void;
}

const DuplicateCodeReturnImageList = (props: DuplicateCodeReturnImageListType) => {
  return (
    <div className={styles.wrapper_posts}>
      <NavLink exact className={styles.post} onClick={() => (props.openModalCurrentPost ? props.setOpenModalCurrentPost(false) : props.setOpenModalCurrentPost(true))} to={`${photoConstant.path}/${props?.post?.id}`}>
        <PostContainer post={props?.post} kindOfPost={onlyBodyPostConstant} modal={false} />
      </NavLink>
    </div>
  );
};

interface ReturnDefaultContentForImageListType {
  title: string;
  subtitle?: string;
  subSubTitle?: string;
  icon: React.ReactElement;
}

const ReturnDefaultContentForImageList = (props: ReturnDefaultContentForImageListType) => {
  return (
    <div className={styles.default_content_images_list}>
      {props.icon ? <div className={styles.default_content_wrapper_icon}>{props.icon}</div> : undefined}
      {props.title ? <div className={styles.default_content_title}>{props.title}</div> : undefined}
      {props.subtitle ? <div className={styles.default_content_subtitle}>{props.subtitle}</div> : undefined}
      {props.subSubTitle ? <div className={styles.default_content_subSubTitle}>{props.subSubTitle}</div> : undefined}
    </div>
  );
};

interface ReturnImageListType {
  id: string;
  isSaved?: boolean;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  isSavedPosts?: Array<FirebaseType<PostType>>;
  isAccountPosts?: Array<FirebaseType<PostType> | undefined>;
  logicOfPagePost: boolean;
  openModalCurrentPost: boolean;
  setOpenModalCurrentPost: (isOpened: boolean) => void;
}

export let ReturnImageList = (props: ReturnImageListType) => {
  let isPosts = props?.isAccountPosts?.find((post: FirebaseType<PostType> | undefined) => post);

  return (
    <>
      {/* return posts list */}
      {isPosts && props?.logicOfPagePost && <div className={styles.posts}>{props?.posts?.sort((a: FirebaseType<PostType>, b: FirebaseType<PostType>) => b?.data()?.dateCreated?.toDate().getTime() - a?.data()?.dateCreated?.toDate().getTime()).map((post: FirebaseType<PostType>, index: number) => post?.data()?.accountId === props?.id && <DuplicateCodeReturnImageList key={post.id + index} post={post} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} />)}</div>}

      {/* return default content if posts don't have */}
      {!isPosts && !props.isSaved ? props?.logicOfPagePost && props?.id === props?.account?.id ? <ReturnDefaultContentForImageList title={"Share Photos and Videos"} subtitle={"When you share photos and videos, they'll appear on your profile."} icon={<AddAPhotoOutlinedIcon />} /> : <ReturnDefaultContentForImageList title={"No posts yet"} icon={<PhotoCameraOutlinedIcon />} /> : undefined}

      {/* return saved posts list */}
      {props.isSaved ? (
        !props.logicOfPagePost && props.posts ? (
          <div className={props?.isSavedPosts?.length !== 0 ? styles.posts : styles.posts__columns}>
            {props?.posts?.map((post: FirebaseType<PostType>) => post?.data()?.saved?.map((saved: SavedOfPostType) => (props?.account?.id === saved?.id ? <DuplicateCodeReturnImageList key={post.id} post={post} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} /> : undefined)))}

            {!props?.isSavedPosts || props?.isSavedPosts?.length === 0 ? <ReturnDefaultContentForImageList title={"Save"} subtitle={"Save photos and videos that you want to see again."} subSubTitle={"Only you can see what you have saved."} icon={<BookmarkBorderOutlinedIcon />} /> : undefined}
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
};
