let SET_ACCOUNTS = "social_network/chatPage/SET_ACCOUNTS";
let ADD_ACCOUNT = "social_network/chatPage/ADD_ACCOUNT";
let IS_ACCOUNT = "social_network/auth/IS_ACCOUNT";
let GET_PROFILE_DATA = "social_network/profilePage/GET_PROFILE_DATA";
let SET_PROFILE_POSTS = "social_network/profilePage/SET_PROFILE_POSTS";
let SET_PROFILE_CHATS = "social_network/profilePage/SET_PROFILE_CHATS";
let GET_AUTHORIZATION_ID = "social_network/chatPage/GET_AUTHORIZATION_ID";
let GET_PARAMS_ID = "social_network/chatPage/GET_PARAMS_ID";
let PUT_LIKE = "social_network/chatPage/PUT_LIKE";
let FOLLOW = "social_network/chatPage/FOLLOW";

let initialState = {
	accounts: [],
	account: null,
	authorizationId: null,
	paramsId: null,
};

const ProfileReducer = (state = initialState, action) => {
	let myProfile =
		state.accounts && state.accounts.length
			? state.accounts.find(profile => (profile && state.authorizationId && !state.paramsId ? profile.id === state.authorizationId : undefined))
			: undefined;

	switch (action.type) {
		case SET_ACCOUNTS: {
			return {
				...state,
				accounts: action.accounts ? [...action.accounts] : [],
				// accounts: action.accounts ? action.accounts.filter((v, i, a) => a.findIndex(t => t.card_id === v.id) === i) : [],
				// accounts: action.accounts ? action.accounts.filter(profile => (profile && profile.profile.name ? profile : undefined)) : [],
				// cars.filter((v, i, a) => a.findIndex(t => (t.card_id === v.id)) === i)
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
			// return {
			// 	...state,
			// 	accounts:
			// 		myProfile && !otherProfile
			// 			? [...arrayNoCurrentAccounts, { ...myProfile, profile: { ...myProfile.profile, ...action.profile } }]
			// 			: otherProfile && !myProfile
			// 			? [...arrayNoCurrentAccounts, { ...otherProfile, profile: { ...otherProfile.profile, ...action.profile } }]
			// 			: state.accounts && state.accounts.length
			// 			? state.accounts.map(profile => ({ ...profile }))
			// 			: [],
			// };
		}
		case SET_PROFILE_POSTS: {
			let newPost = {
				id:
					state.account && state.account.profile && state.account.profile.posts && state.account.profile.posts.length
						? state.account.profile.posts.length + 1
						: 1,
				postPhoto: action.postPhoto,
				likes: action.likes,
				comments: action.comments,
				createPostDate: action.createPostDate,
				ownerCommentToPost: action.ownerCommentToPost,
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
			let arrayAccounts = state.accounts
				? state.accounts.filter(profile => (myProfile ? profile.id !== myProfile.profile.id : undefined))
				: undefined;

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
				// accounts: myProfile
				// 	? arrayAccounts && myProfile
				// 		? [
				// 				...arrayAccounts,
				// 				{
				// 					...myProfile,
				// 					profile: { ...myProfile.profile, chats: myProfile ? action.chats.map(chat => ({ ...chat })) : [] },
				// 				},
				// 		  ]
				// 		: myProfile
				// 		? {
				// 				...myProfile,
				// 				profile: { ...myProfile.profile, chats: myProfile ? action.chats.map(chat => ({ ...chat })) : [] },
				// 		  }
				// 		: undefined
				// 	: state.accounts.map(profile => ({ ...profile })),
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
		case PUT_LIKE: {
			return {
				...state,
			};
		}
		case FOLLOW: {
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

export const setProfilePosts = (postPhoto, likes, comments, createPostDate, ownerCommentToPost) => ({
	type: SET_PROFILE_POSTS,
	postPhoto,
	likes,
	comments,
	createPostDate,
	ownerCommentToPost,
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

export const putLike = id => ({
	type: GET_PARAMS_ID,
	id,
});

export const follow = id => ({
	type: FOLLOW,
	id,
});

export default ProfileReducer;
