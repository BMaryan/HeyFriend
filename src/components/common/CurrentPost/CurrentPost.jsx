import React from "react";
import styles from "./CurrentPost.module.scss";
import { useParams } from "react-router-dom";
import PostContainer from "../Post/PostContainer";
import { modalPostConstant, defaultPostConstant } from "../../../core/constants/constantsPost";
import Media from "react-media";

const CurrentPost = (props) => {
  let params = useParams();

  // let foundAccount = props.accounts ? props.accounts.find((account) => (account.profile && account.profile.posts ? account.profile.posts.find((post) => (params && post.id === props.account.id ? post : undefined)) : undefined)) : undefined;
  // let currentAccount = props.accounts ? props.accounts.find((item) => item.data().accountId === params.id) : undefined;
  // let currentPost = foundAccount && foundAccount.profile && foundAccount.profile.posts ? foundAccount.profile.posts.find((post) => (post.id === params.id ? post : undefined)) : props.account && props.account.profile && props.account.profile.posts ? props.account.profile.posts.find((post) => post.id === params.id) : undefined;
  let currentPost = props.posts.length !== 0 ? props.posts.find((post) => (post?.data()?.id && params?.id ? post?.data()?.id === params?.id : undefined)) : undefined;
  // let test = props.posts.length !== 0 ? props.posts.filter((post) => (post?.id && params?.id ? post?.id === params?.id : undefined)) : undefined;

  return (
    <div className={styles.current_post}>
      <div className={styles.current_post_content}>
        <Media query={{ maxWidth: 720 }}>{(matches) => (matches ? <PostContainer modal={false} kindOfPost={defaultPostConstant} post={currentPost?.data()} currentAccount={props.account} /> : <PostContainer modal={true} kindOfPost={modalPostConstant} post={currentPost?.data()} currentAccount={props.account} isCurrentPost={true} />)}</Media>
      </div>
    </div>
  );
};

export default CurrentPost;
