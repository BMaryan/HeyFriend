import React from "react";
import { connect } from "react-redux";
import Main from "./Main";

const MainContainer = props => {
	return <Main {...props} />;
};

const mapStateToProps = state => {
	return {
		a: "MainContainer",
	};
};

export default connect(mapStateToProps, null)(MainContainer);
