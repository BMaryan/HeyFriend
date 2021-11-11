import avatar from "./assets/images/avatar1.jpg";
import coverPhoto from "./assets/images/coverPhoto.jpg";
import postPhoto1 from "./assets/images/postPhoto1.jpg";
import postPhoto2 from "./assets/images/postPhoto2.jpg";
import { ac2PostsId } from "../Account2/Account2";
import { ac3PostsId } from "../Account3/Account3";

export const ac1PostsId = {
	id1: "1nBgGE4mh9jE",
	id2: "1c3gGF4fhr6M",
	id3: "1WB6G84mhDhjO",
	id4: "1vK6g8jmJHhGv",
};

export const account1 = {
	id: 1,
	profile: {
		name: "Christopher",
		surname: "Pierce",
		phone_or_email: "ChristopherPierce@gmail.com",
		password: "12345678",
		coverPhoto: coverPhoto,
		avatar: avatar,
		status: "Everyone is wrong. Admits a mistake - worthy. Apologizes - courageous. Restores the relationship - strong.",
		aboutMe: "Based in Chicago. I love playing tennis and loud music. I have a persistent enthusiasm to create new things.",
		following: [{ id: 2 }],
		posts: [
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `Rest after active brain activity does not mean that you do not need to do anything else, you just need to change things: physical work is not only nice, but also a fairly healthy rest after mental work. Konstantin Ushinsky`,
				id: ac1PostsId.id1,
				likes: [],
				photo: postPhoto1,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description:
					"“Turn your large-scale thoughts into large-scale actions as soon as possible. Don't let false excuses slow you down. Excuses are symptoms of fear. ”",
				id: ac1PostsId.id2,
				likes: [],
				photo: postPhoto2,
			},
		],
		savedPosts: [ac2PostsId.id1, ac3PostsId.id2],
	},
};
