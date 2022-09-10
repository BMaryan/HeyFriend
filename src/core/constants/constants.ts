import { NavigationType } from "../../types/types";

// * path of wabsite
export const pahtOfWebsiteConstant = "https://heyfriend.vercel.app";

// * ways to navigate the site

// main
export const mainConstant = { path: "/", title: "Main" };

// profile
export const profileConstant = { path: "/profile", title: "Profile" };
export const informationConstant = { path: "/information", title: "Information" };
export const aboutConstant = { path: "/about", title: "About" };
export const contactsConstant = { path: "/contacts", title: "Contacts" };
export const savedConstant = { path: "/saved", title: "Saved" };

// chat
export const chatConstant = { path: "/chat", title: "Chat" };

// friends
export const friendsConstant = { path: "/friends", title: "Friends" };
export const followingConstant = { path: "/following", title: "Following" };
export const followersConstant = { path: "/followers", title: "Followers" };
export const recommendationConstant = { path: "/recommendation", title: "Recommendation" };

// edit
export const editConstant = { path: "/account/edit", title: "Edit account" };
export const editProfileConstant = { path: "/profile", title: "Edit profile" };
export const editPasswordConstant = { path: "/password", title: "Edit password" };

// post
export const photoConstant = { path: "/post", title: "Post" };

// auth
export const signUpConstant = { path: "/sign/up", title: "Sign up" };
export const signInConstant = { path: "/sign/in", title: "Sign in" };

// 404 page
export const notFoundConstant = { path: "/not-found", title: "Not found" };

const navigation: Array<NavigationType> = [mainConstant, profileConstant, informationConstant, aboutConstant, contactsConstant, savedConstant, chatConstant, friendsConstant, followingConstant, followersConstant, recommendationConstant, editConstant, editProfileConstant, editPasswordConstant, photoConstant, signUpConstant, signInConstant, notFoundConstant];
export default navigation;
