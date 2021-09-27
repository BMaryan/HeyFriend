import React from "react";
import { NavLink } from "react-router-dom";

const Friends = props => {
	return (
		<div>
			{props.accounts.map(profile =>
				profile.id !== props.account.id ? (
					<NavLink key={profile.id} to={"/profile/" + profile.id}>
						<div>{profile.profile.surname + " " + profile.profile.name}</div>
					</NavLink>
				) : undefined
			)}
		</div>
	);
};

export default Friends;
