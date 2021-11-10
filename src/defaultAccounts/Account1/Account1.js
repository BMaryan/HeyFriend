import avatar from "./assets/images/avatar1.jpg";
import coverPhoto from "./assets/images/coverPhoto6.jpg";
import post1 from "./assets/images/post1.jpg";
import post2 from "./assets/images/post2.jpg";
import post3 from "./assets/images/post3.jpg";
import post4 from "./assets/images/post4.jpg";
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
				photo: post1,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description:
					"“Turn your large-scale thoughts into large-scale actions as soon as possible. Don't let false excuses slow you down. Excuses are symptoms of fear. ”",
				id: ac1PostsId.id2,
				likes: [],
				photo: post2,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: "The pinnacle of ideality is simplicity.",
				id: ac1PostsId.id3,
				likes: [],
				photo: post3,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: "Everyone sympathizes with the misfortunes of their friends, and only a few rejoice in their success. Oscar Wilde",
				id: ac1PostsId.id4,
				likes: [],
				photo: post4,
			},
		],
		savedPosts: [ac2PostsId.id1, ac3PostsId.id2],
	},
};
