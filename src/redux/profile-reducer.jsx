let GET_PROFILE_DATA = "social_network/profilePage/GET_PROFILE_DATA";
let SET_PROFILE_POSTS = "social_network/profilePage/SET_PROFILE_POSTS";
let SET_PROFILE_CHATS = "social_network/profilePage/SET_PROFILE_CHATS";
let ADD_PROFILE = "social_network/chatPage/ADD_PROFILE";

let initialState = {
	profiles: [],
	profile: {
		id: null,
		name: null,
		surname: null,
		img: null,
		status: null,
		aboutMe: null,
		posts: [],
		chats: [],
	},
	// profile: null,
};

const ProfileReducer = (state = initialState, action) => {
	let foundProfile =
		state.profiles && state.profiles.length
			? state.profiles.find(profile => (profile && profile.profile ? profile.id === profile.profile.id : undefined))
			: undefined;
	let getProfileData =
		state.profiles && state.profiles.length
			? state.profiles.find(profile => (profile && action.profile ? profile.id === action.profile.id : undefined))
			: undefined;
	let noMyProfile =
		state.profiles && state.profiles.length
			? state.profiles.find(profile => (profile && profile.profile && action.profile ? profile.profile.id === action.profile.id : undefined))
			: undefined;
	let arrayNoCurrentProfiles =
		state.profiles && state.profiles.length
			? state.profiles.filter(profile => {
					if (profile && action.profile && profile.id !== action.profile.id) {
						return profile;
					}
			  })
			: console.log("Empty");

	switch (action.type) {
		case ADD_PROFILE: {
			let newProfile = {
				id: action.id,
				profile: {
					id: null,
					name: null,
					surname: null,
					img: null,
					status: null,
					aboutMe: null,
					posts: [],
					chats: [],
				},
			};

			return {
				...state,
				profiles: state.profiles && newProfile && newProfile.id ? [...state.profiles, { ...newProfile }] : [...state.profiles],
			};
		}
		case GET_PROFILE_DATA: {
			return {
				...state,
				profile: action.profile ? { ...state.profile, ...action.profile } : null,
				profiles: getProfileData
					? [...arrayNoCurrentProfiles, { ...getProfileData, profile: { ...getProfileData.profile, ...action.profile } }]
					: noMyProfile
					? [{ ...noMyProfile, profile: { ...noMyProfile.profile, ...action.profile } }]
					: state.profiles && state.profiles.length
					? state.profiles.map(profile => ({ ...profile }))
					: [],

				// profiles: getProfileData
				// 	? [{ ...getProfileData, profile: { ...getProfileData.profile, ...action.profile } }]
				// 	: noMyProfile
				// 	? [{ ...noMyProfile, profile: { ...noMyProfile.profile, ...action.profile } }]
				// 	: state.profiles
				// 	? state.profiles.map(profile => ({ ...profile }))
				// 	: [],

				// profiles: [
				// 	getProfileData
				// 		? { ...getProfileData, profile: { ...getProfileData.profile, ...action.profile } }
				// 		: { ...getProfileData, profile: { ...getProfileData.profile } },
				// ],
				// profiles:
				// 	state.profiles &&
				// 	state.profiles.map(item => {
				// 		return item && action.profile && item.id === action.profile.id && getProfileData
				// 			? item && { ...item, profile: { ...item.profile, ...action.profile } }
				// 			: item && { ...item, profile: { ...item.profile } };
				// 	}),
			};
		}
		case SET_PROFILE_POSTS: {
			let newPost = {
				id: state.profile.posts ? (state.profile.posts.length !== 0 ? state.profile.posts.length + 2 : 2) : 1,
				img: action.img,
				likes: action.likes,
				comments: action.comments,
			};

			console.log(arrayNoCurrentProfiles);

			return {
				...state,
				profile: { ...state.profile, posts: state.profile.posts && newPost ? [...state.profile.posts, { ...newPost }] : [] },
				// profiles:
				// 	state.profiles &&
				// 	state.profiles.map(profile => {
				// 		return {
				// 			...profile,
				// 			profile: {
				// 				...profile.profile,
				// 				posts: foundProfile && profile.id === profile.profile.id ? [...profile.profile.posts, { ...newPost }] : [],
				// 			},
				// 		};
				// 	}),

				profiles: arrayNoCurrentProfiles
					? [
							...arrayNoCurrentProfiles,
							{
								...foundProfile,
								profile: { ...foundProfile.profile, posts: foundProfile ? [...foundProfile.profile.posts, { ...newPost }] : [] },
							},
					  ]
					: [
							{
								...foundProfile,
								profile: { ...foundProfile.profile, posts: foundProfile ? [...foundProfile.profile.posts, { ...newPost }] : [] },
							},
					  ],
				// profiles:
				// 	state.profiles &&
				// 	state.profiles.map(item => {
				// 		return {
				// 			...item,
				// 			profile: {
				// 				...item.profile,
				// 				posts:
				// 					item && item.profile && item.id === item.profile.id
				// 						? item && item.profile && [...item.profile.posts, { ...newPost }]
				// 						: [],
				// 			},
				// 		};
				// 	}),
			};
		}
		case SET_PROFILE_CHATS: {
			// console.log(foundProfile);

			return {
				...state,
				profiles: foundProfile
					? arrayNoCurrentProfiles
						? [
								...arrayNoCurrentProfiles,
								{
									...foundProfile,
									profile: { ...foundProfile.profile, chats: foundProfile ? action.chats.map(chat => ({ ...chat })) : [] },
								},
						  ]
						: {
								...foundProfile,
								profile: { ...foundProfile.profile, chats: foundProfile ? action.chats.map(chat => ({ ...chat })) : [] },
						  }
					: state.profiles.map(profile => ({ ...profile })),

				// profiles:
				// 	state.profiles &&
				// 	state.profiles.map(item => {
				// 		return {
				// 			...item,
				// 			profile: {
				// 				...item.profile,
				// 				chats:
				// 					item && item.profile && item.id === item.profile.id
				// 						? item && item.profile && action.chats.map(chat => ({ ...chat }))
				// 						: [],
				// 			},
				// 		};
				// 	}),
			};
		}
		default: {
			return state;
		}
	}
};

export const addProfile = id => ({
	type: ADD_PROFILE,
	id,
});

export const getProfileData = profile => ({
	type: GET_PROFILE_DATA,
	profile,
});

export const setProfilePosts = (img, likes, comments) => ({
	type: SET_PROFILE_POSTS,
	img,
	likes,
	comments,
});

export const setProfileChats = chats => ({
	type: SET_PROFILE_CHATS,
	chats,
});

export default ProfileReducer;
