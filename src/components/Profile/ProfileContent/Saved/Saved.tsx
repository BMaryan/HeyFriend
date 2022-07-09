import React from "react";
import { AccountType, FirebaseType, PostType, SavedOfPostType } from "../../../../types/types";
import { ReturnImageList } from "../../../../utils/helperForProfile/helperForProfile";

interface SavedPropsType {
  id: string;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  openModalCurrentPost: boolean;
  setOpenModalCurrentPost: (isOpened: boolean) => void;
}

const Saved = (props: SavedPropsType) => {
  const isSavedPosts = props?.posts ? props?.posts?.filter((post: FirebaseType<PostType>) => (post?.data()?.saved ? post?.data()?.saved?.find((saved: SavedOfPostType) => saved?.id === props?.account?.id) : undefined)) : undefined;

  return <ReturnImageList account={props.account} posts={props.posts} id={props.id} logicOfPagePost={false} isSaved={true} isSavedPosts={isSavedPosts} openModalCurrentPost={props.openModalCurrentPost} setOpenModalCurrentPost={props.setOpenModalCurrentPost} />;
};

export default Saved;
