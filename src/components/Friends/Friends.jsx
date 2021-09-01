import React from "react";
import { NavLink } from "react-router-dom";

const Friends = props => {
	let id = Number(props.match.params.id);
	console.log(props);

	return (
		<div>
			{props.users.map(user => (
				<NavLink key={user.id} to={"/profile/" + user.id}>
					<div>{user.surname + " " + user.name}</div>
				</NavLink>
			))}
		</div>
	);
};

export default Friends;
