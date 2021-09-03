import React from "react";
import { NavLink } from "react-router-dom";

const Friends = props => {
	return (
		<div>
			{props.users.map(user => (
				<NavLink
					key={user.id}
					to={props.profileAuthorizationData && props.profileAuthorizationData.id !== user.id ? "/profile/" + user.id : "/profile"}>
					<div>{user.surname + " " + user.name}</div>
				</NavLink>
			))}
		</div>
	);
};

export default Friends;
