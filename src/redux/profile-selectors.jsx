export const getAccountsSelector = (state) => {
  return state.profilePage.accounts;
};

export const getAccountSelector = (state) => {
  return state.profilePage.account;
};

export const setPostsSelector = (state) => {
  return state.profilePage.posts;
};

export const getAuthorizationIdSelector = (state) => {
  return state.profilePage.id;
};
