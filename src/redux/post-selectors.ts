import { StateType } from "./store";

export const setPostsSelector = (state: StateType) => state.postPage.posts;

export const getCommentsSelector = (state: StateType) => state.postPage.comments;
