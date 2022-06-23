import React from "react";
import { ReturnImageList, ToggleShowCurrentPostContainer } from "../../../../utils/helperForProfile/helperForProfile";
import { AccountType, PostType } from "../../../../types/types";
import { useHistory } from "react-router-dom";
import styles from "./Posts.module.scss";

interface PostsPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  posts: Array<PostType>;
  id: string;
  openModalCurrentPost: boolean;
  setOpenModalCurrentPost: (isOpened: boolean) => void;
  handleOpen: () => void;
}

const Posts = (props: PostsPropsType) => {
  let history = useHistory();

  let currentAccount = props?.accounts && props?.accounts?.find((account: AccountType) => (account?.data() && props?.id ? account?.data()?.id === props?.id : undefined));
  let isAccountPosts = props?.posts && props?.posts?.map((post: PostType) => (post?.data()?.accountId === currentAccount?.data()?.id ? post : undefined));

  return (
    <div className={styles.posts}>
      <div className={styles.wrapper_posts}>
        {props?.id === props?.account?.id ? (
          <div className={styles.wrapper_input}>
            <input className={styles.input} onClick={() => props.handleOpen()} type="text" value="" onChange={() => undefined} placeholder="What's on your mind?" />
          </div>
        ) : undefined}

        {props.id === props?.account?.id ? <ReturnImageList posts={props.posts} account={props.account} id={props.id} isAccountPosts={isAccountPosts} logicOfPagePost={true} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} /> : <ReturnImageList posts={props.posts} account={props.account} id={props.id} isAccountPosts={isAccountPosts} logicOfPagePost={true} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} />}

        {props.openModalCurrentPost ? <ToggleShowCurrentPostContainer currentPost={props.posts[0]} history={history} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} /> : undefined}
      </div>
    </div>
  );
};

export default Posts;
