import React from "react";
import { ReturnImageList } from "../../../../utils/helperForProfile/helperForProfile";

const Saved = props => {
	return (
		<ReturnImageList
			accounts={props.accounts}
			account={props.account}
			openModalCurrentPost={props.openModalCurrentPost}
			setOpenModalCurrentPost={props.setOpenModalCurrentPost}
			otherProfile={props.otherProfile}
			oftenCheckOtherProfile={props.oftenCheckOtherProfile}
			logicOfPagePost={false}
			id={props.id}
			isSaved={true}
		/>
	);
};

export default Saved;
