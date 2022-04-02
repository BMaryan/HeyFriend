let ADD_MESSAGE = "heyfriend/chatPage/ADD_MESSAGE";
let ADD_CHAT = "heyfriend/chatPage/ADD_CHAT";

let initialState = {
  chats: [
    // {
    // 	id: 1,
    // 	messages: [
    // 		{
    // 			id: 2,
    // 			userId: 3,
    // 			message: "HEllo",
    // 		},
    // 		{
    // 			id: 1,
    // 			userId: 3,
    // 			message: "How are you",
    // 		},
    // 		{
    // 			id: 1,
    // 			userId: 1,
    // 			message: "I'm good",
    // 		},
    // 	],
    // },
    // {
    // 	id: 2,
    // 	messages: [
    // 		{
    // 			id: 2,
    // 			userId: 2,
    // 			message: "HEllo",
    // 		},
    // 		{
    // 			id: 2,
    // 			userId: 2,
    // 			message: "How are you",
    // 		},
    // 		{
    // 			id: 2,
    // 			userId: 1,
    // 			message: "I'm good",
    // 		},
    // 	],
    // },
    // {
    // 	id: 3,
    // 	messages: [
    // 		{
    // 			id: 3,
    // 			userId: 2,
    // 			message: "HEllo",
    // 		},
    // 		{
    // 			id: 3,
    // 			userId: 2,
    // 			message: "How are you",
    // 		},
    // 		{
    // 			id: 3,
    // 			userId: 3,
    // 			message: "I'm good",
    // 		},
    // 	],
    // },
  ],
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
        id: state.chats.map((chat) => (chat.id === action.id ? chat.messages.length : undefined)),
        userId: action.userId,
        message: action.message,
      };

      return {
        ...state,
        chats: state.chats.map((chat) => (chat.id === action.id ? { ...chat, messages: [...chat.messages, newMessage] } : { ...chat, messages: [...chat.messages] })),
      };
    }
    default: {
      return state;
    }
  }
};

export const addChat = (id) => ({
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
