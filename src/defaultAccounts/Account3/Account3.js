import avatar from "./assets/images/avatar3.jpg";
import coverPhoto from "./assets/images/coverPhoto.jpg";
import postPhoto1 from "./assets/images/postPhoto1.jpg";
import postPhoto2 from "./assets/images/postPhoto2.jpg";
import postPhoto3 from "./assets/images/postPhoto3.jpg";

export const ac3PostsId = {
	id1: "3cBgОyLhh04M",
	id2: "3eSgbLSLn2f",
	id3: "3KegVdh3sls",
};

export const account3 = {
	id: 3,
	profile: {
		name: "Diana",
		surname: "Wells",
		phone_or_email: "DianaWells@gmail.com",
		password: "12345678",
		coverPhoto: coverPhoto,
		avatar: avatar,
		status: "Two things fly by the sea especially fast - time and money.",
		aboutMe: "Living in Athens, Greece. I love black and white classics, chillout music and green tea.",
		following: [{ id: 2 }],
		followers: [{ id: 1 }],
		posts: [
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `Time, like the sea, unties any knots. Iris Murdoch`,
				id: ac3PostsId.id1,
				likes: [],
				photo: postPhoto1,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `The sea attracts people with its magical beauty and mysterious grandeur.`,
				id: ac3PostsId.id2,
				likes: [
					{id: 1},
					{id: 2}
				],
				photo: postPhoto2,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `No matter how, no matter where - the sea will always be waiting for you. Alessandro Barrico.`,
				id: ac3PostsId.id3,
				likes: [],
				photo: postPhoto3,
			},
		],
	},
};
