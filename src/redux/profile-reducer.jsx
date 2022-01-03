let SET_ACCOUNTS = "social_network/chatPage/SET_ACCOUNTS";
let ADD_ACCOUNT = "social_network/chatPage/ADD_ACCOUNT";
let IS_ACCOUNT = "social_network/auth/IS_ACCOUNT";
let GET_PROFILE_DATA = "social_network/profilePage/GET_PROFILE_DATA";
let SET_PROFILE_POSTS = "social_network/profilePage/SET_PROFILE_POSTS";
let SET_PROFILE_CHATS = "social_network/profilePage/SET_PROFILE_CHATS";
let GET_AUTHORIZATION_ID = "social_network/chatPage/GET_AUTHORIZATION_ID";
let GET_PARAMS_ID = "social_network/chatPage/GET_PARAMS_ID";
let PUT_LIKE = "social_network/chatPage/PUT_LIKE";
let TAKE_LIKE = "social_network/chatPage/TAKE_LIKE";
let FOLLOWING = "social_network/chatPage/FOLLOWING";
let UNFOLLOWING = "social_network/chatPage/UNFOLLOWING";
let SAVE_POST = "social_network/chatPage/SAVE_POST";
let DELETE_SAVED_POST = "social_network/chatPage/DELETE_SAVED_POST";
let DELETE_POST = "social_network/profilePage/DELETE_POST";

// in progress
let FOLLOWERS = "social_network/chatPage/FOLLOWERS";

let initialState = {
	accounts: [],
	account: null,
	authorizationId: null,
	paramsId: null,
};

const ProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACCOUNTS: {
			return {
				...state,
				accounts: action.accounts ? [...action.accounts] : [],
			};
		}
		case ADD_ACCOUNT: {
			let newProfile = {
				id: action.id,
				profile: { ...action.profile },
			};

			return {
				...state,
				accounts: state.accounts && newProfile && newProfile.id ? [...state.accounts, { ...newProfile }] : [...state.accounts],
			};
		}
		case IS_ACCOUNT: {
			return {
				...state,
				account: action.profile ? { ...action.profile } : null,
			};
		}
		case GET_PROFILE_DATA: {
			return {
				...state,
				account: {
					...state.account,
					profile:
						state.account && state.account.profile && action.profile
							? { ...state.account.profile, ...action.profile }
							: { ...state.account.profile },
				},
			};
		}
		case SET_PROFILE_POSTS: {
			let newPost = {
				id: action.data.id,
				photo: action.data.photo,
				likes: action.data.likes,
				comments: action.data.comments,
				dateCreated: action.data.dateCreated,
				description: action.data.description,
			};

			return {
				...state,
				account: {
					...state.account,
					profile:
						state.account && state.account.profile
							? {
									...state.account.profile,
									posts:
										state.account && state.account.profile && state.account.profile.posts
											? [...state.account.profile.posts, { ...newPost }]
											: [{ ...newPost }],
							  }
							: { ...state.account.profile },
				},
			};
		}
		case SET_PROFILE_CHATS: {
			return {
				...state,
				account:
					state.account && state.account.profile
						? {
								...state.account,
								profile:
									state.account && state.account.profile
										? {
												...state.account.profile,
												chats:
													state.account && state.account.profile && state.account.profile.chats
														? [...state.account.profile.chats, ...action.chats]
														: [...action.chats],
										  }
										: null,
						  }
						: null,
			};
		}
		case GET_AUTHORIZATION_ID: {
			return {
				...state,
				authorizationId: action.id,
			};
		}
		case GET_PARAMS_ID: {
			return {
				...state,
				paramsId: action.id,
			};
		}
		case FOLLOWING: {
			return {
				...state,
				account: {
					...state.account,
					profile:
						state.account && state.account.profile && action.id
							? {
									...state.account.profile,
									following:
										state.account && state.account.profile && state.account.profile.following
											? [...state.account.profile.following, { id: action.id }]
											: [{ id: action.id }],
							  }
							: { ...state.account.profile },
				},
			};
		}
		case UNFOLLOWING: {
			return {
				...state,
				account: {
					...state.account,
					profile:
						state.account && state.account.profile && action.id
							? {
									...state.account.profile,
									following:
										state.account && state.account.profile && state.account.profile.following
											? state.account.profile.following.filter(followingAc => followingAc.id !== action.id)
											: [],
							  }
							: { ...state.account.profile },
				},
			};
		}
		case SAVE_POST: {
			return {
				...state,
				account: {
					...state.account,
					profile:
						state.account && state.account.profile
							? {
									...state.account.profile,
									savedPosts:
										state.account && state.account.profile && state.account.profile.savedPosts
											? [...state.account.profile.savedPosts, action.id]
											: [action.id],
							  }
							: { ...state.account.profile },
				},
			};
		}
		case DELETE_SAVED_POST: {
			return {
				...state,
				account: {
					...state.account,
					profile:
						state.account && state.account.profile
							? {
									...state.account.profile,
									savedPosts:
										state.account && state.account.profile && state.account.profile.savedPosts
											? state.account.profile.savedPosts.filter(idPost => idPost !== action.id)
											: [],
							  }
							: { ...state.account.profile },
				},
			};
		}
		case FOLLOWERS: {
			return {
				...state,
				account: { 
					...state.account,
					profile: {
						...state.account.profile,
						followers: state.account?.profile?.followers
							? [...state.account.profile.followers, { id: action.id }]
							: [{ id: action.id }]
					}
				}
			};
		}
		case DELETE_POST: {
			return {
				...state,
				account: {
					...state.account,
					profile: {
						...state.account.profile,
						posts:
							state.account && state.account.profile && state.account.profile.posts
								? state.account.profile.posts.filter(post => post.id !== action.id)
								: [],
					},
				},
			};
		}
		case PUT_LIKE: {
			let currentAccount = state.accounts.find(account => account?.profile?.posts.find(post => post.id === action.postId));
			
			return {
				...state,
				accounts: state.accounts.map(account => account.id === currentAccount.id 
					? {...account, profile: {...account.profile, posts: account.profile.posts.map(post => post.id === action.postId 
						? {...post, likes: post.likes && post.likes.length > 0
							? [...post.likes, {id: state.account.id}]
							: [{id: state.account.id}]}
						: {...post})}}
					: {...account}),
				account: {
					...state.account, profile: {...state.account.profile, likedPosts: state.account.profile.likedPosts && state.account.profile.likedPosts.length 
						? [...state.account.profile.likedPosts, {id: action.postId}] 
						: [{id: action.postId}]}
				}
			};
		}
		case TAKE_LIKE: {
			let currentAccount = state.accounts.find(account => account?.profile?.posts.find(post => post.id === action.postId));
			
			return {
				...state,
				accounts: state.accounts.map(account => account.id === currentAccount.id 
					? {...account, profile: {...account.profile, posts: account.profile.posts.map(post => post.id === action.postId 
						? {...post, likes: post.likes && post.likes.length > 0
							? post.likes.filter(like => like.id !== state.account.id)
							: [...post]}
						: {...post})}}
					: {...account}),
				account: {
					...state.account, profile: {...state.account.profile, likedPosts: state.account.profile.likedPosts && state.account.profile.likedPosts.length > 0
						? state.account.profile.likedPosts.filter(like => like.id !== action.postId)
						: [...state.account.profile.likedPosts]}
				}
			};
		}
		default: {
			return state;
		}
	}
};

export const setAccounts = accounts => ({
	type: SET_ACCOUNTS,
	accounts,
});

export const addAccount = (id, profile) => ({
	type: ADD_ACCOUNT,
	id,
	profile,
});

export const isAccount = profile => ({
	type: IS_ACCOUNT,
	profile,
});

export const getProfileData = profile => ({
	type: GET_PROFILE_DATA,
	profile,
});

export const setProfilePosts = data => ({
	type: SET_PROFILE_POSTS,
	data,
});

export const setProfileChats = chats => ({
	type: SET_PROFILE_CHATS,
	chats,
});

export const getAuthorizationId = id => ({
	type: GET_AUTHORIZATION_ID,
	id,
});

export const getParamsId = id => ({
	type: GET_PARAMS_ID,
	id,
});

export const putLike = (postId) => ({
	type: PUT_LIKE,
	postId
});

export const takeLike = (postId) => ({
	type: TAKE_LIKE,
	postId
});

export const following = id => ({
	type: FOLLOWING,
	id,
});

export const unFollowing = id => ({
	type: UNFOLLOWING,
	id,
});

export const savePost = id => ({
	type: SAVE_POST,
	id,
});

export const deleteSavedPost = id => ({
	type: DELETE_SAVED_POST,
	id,
});

export const followers = id => ({
	type: FOLLOWERS,
	id,
});

export const deletePost = id => ({
	type: DELETE_POST,
	id,
});

export default ProfileReducer;
