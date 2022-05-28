import React from "react";
import styles from "./Posts.module.scss";
import { ReturnImageList, ToggleShowCurrentPostContainer } from "../../../../utils/helperForProfile/helperForProfile";
import { useHistory, useParams } from "react-router-dom";

const Posts = (props) => {
  let history = useHistory();
  let params = useParams();

  let currentAccount = props?.accounts && props?.accounts?.find((account) => (account?.data() && props?.params?.id ? account?.data()?.id === props?.params?.id : undefined));
  let isAccountPosts = props?.posts && props?.posts?.map((post) => (post?.data() && currentAccount?.data()?.id ? post?.data()?.accountId === currentAccount?.data()?.id : undefined));

  return (
    <div className={styles.posts}>
      <div className={styles.wrapper_posts}>
        {props?.id === props?.account?.id ? (
          <div className={styles.wrapper_input}>
            <input className={styles.input} onClick={() => props.handleOpen()} type="text" value="" onChange={() => undefined} placeholder="What's on your mind?" />
          </div>
        ) : undefined}

        {props.id === props.account.id ? <ReturnImageList {...props} isAccountPosts={isAccountPosts} logicOfPagePost={true} currentAccount={currentAccount} /> : <ReturnImageList {...props} isAccountPosts={isAccountPosts} logicOfPagePost={true} currentAccount={currentAccount} />}

        {props.openModalCurrentPost ? <ToggleShowCurrentPostContainer {...props} history={history} params={params} currentAccount={currentAccount} /> : undefined}
      </div>
    </div>
  );
};

export default Posts;
