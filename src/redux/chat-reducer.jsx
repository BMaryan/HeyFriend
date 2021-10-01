let ADD_MESSAGE = "social_network/chatPage/ADD_MESSAGE";
let ADD_CHAT = "social_network/chatPage/ADD_CHAT";

let initialState = {
	chats: [],
};

const ChatReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CHAT: {
			let newChat = {
				id: action.id,
				messages: [],
			};

			return {
				...state,
				// chats: state.chats && state.chats.filter(chat => (chat.id === action.id ? [...state.chats] : [...state.chats, { ...newChat }])),
				chats: [...state.chats, { ...newChat }],
			};
		}
		case ADD_MESSAGE: {
			let newMessage = {
				id: state.chats.map(chat => (chat.id === action.id ? chat.messages.length : undefined)),
				userId: action.userId,
				message: action.message,
			};

			return {
				...state,
				chats: state.chats.map(chat =>
					chat.id === action.id ? { ...chat, messages: [...chat.messages, newMessage] } : { ...chat, messages: [...chat.messages] }
				),
			};
		}
		default: {
			return state;
		}
	}
};

export const addChat = id => ({
	type: ADD_CHAT,
	id,
});

export const addMessage = (id, userId, message) => ({
	type: ADD_MESSAGE,
	id,
	userId,
	message,
});

export default ChatReducer;
