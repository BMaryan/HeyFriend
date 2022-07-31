import React from "react";
import { ReturnImageList, ToggleShowCurrentPostContainer } from "../../../../utils/helperForProfile/helperForProfile";
import { AccountType, FirebaseType, HistoryType, PostType } from "../../../../types/types";
import styles from "./Posts.module.scss";

interface PostsPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  id: string;
  history: HistoryType;
  openModalCurrentPost: boolean;
  handleOpen: () => void;
  setOpenModalCurrentPost: (isOpened: boolean) => void;
}

const Posts = (props: PostsPropsType) => {
  const currentAccount = props?.accounts && props?.accounts?.find((account: FirebaseType<AccountType>) => (account?.data() && props?.id ? account?.data()?.id === props?.id : undefined));
  const isAccountPosts = props?.posts && props?.posts?.map((post: FirebaseType<PostType>) => (post?.data()?.accountId === currentAccount?.data()?.id ? post : undefined));

  return (
    <div className={styles.posts}>
      <div className={styles.wrapper_posts}>
        {props?.id === props?.account?.id ? (
          <div className={styles.wrapper_input}>
            <input className={styles.input} onClick={() => props.handleOpen()} type="text" value="" onChange={() => undefined} placeholder="What's on your mind?" multiple />
          </div>
        ) : undefined}

        {props.id === props?.account?.id ? <ReturnImageList posts={props.posts} account={props.account} id={props.id} isAccountPosts={isAccountPosts} logicOfPagePost={true} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} /> : <ReturnImageList posts={props.posts} account={props.account} id={props.id} isAccountPosts={isAccountPosts} logicOfPagePost={true} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} />}

        {props.openModalCurrentPost ? <ToggleShowCurrentPostContainer currentPost={props.posts[0]} history={props.history} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} /> : undefined}
      </div>
    </div>
  );
};

export default Posts;
