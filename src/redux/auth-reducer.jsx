let SET_USER_SIGN_IN = "social_network/auth/SET_USER_SIGN_IN";
let SET_USER_SIGN_UP = "social_network/auth/SET_USER_SIGN_UP";

let initialState = {
	userSignIn: {
		phone_or_email: null,
		password: null,
		rememberMe: null,
	},
	userSignUp: {
		id: null,
		name: null,
		surname: null,
		phone_or_email: null,
		password: null,
	},
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_SIGN_IN: {
			return {
				...state,
				userSignIn: { ...action.data },
			};
		}
		case SET_USER_SIGN_UP: {
			return {
				...state,
				userSignUp: { ...action.data },
			};
		}

		default: {
			return state;
		}
	}
};

export const setUserSignIn = ({ phone_or_email, password, rememberMe = false }) => ({
	type: SET_USER_SIGN_IN,
	data: { phone_or_email, password, rememberMe },
});

export const setUserSignUp = ({ name, surname, phone_or_email, password }) => ({
	type: SET_USER_SIGN_UP,
	data: { name, surname, phone_or_email, password },
});

export default AuthReducer;
