import React from "react";
import { ReturnImageList } from "../../../../utils/helperForProfile/helperForProfile";

const Saved = (props) => {
  let isSavedPosts = props?.posts ? props?.posts?.filter((post) => (post?.data()?.saved ? post?.data()?.saved.find((saved) => saved?.id === props?.account?.id) : undefined)) : undefined;

  console.log(isSavedPosts);

  return <ReturnImageList {...props} logicOfPagePost={false} isSaved={true} isSavedPosts={isSavedPosts} />;
};

export default Saved;
