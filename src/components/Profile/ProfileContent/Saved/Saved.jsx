import React from "react";
import { ReturnImageList } from "../../../../utils/helperForProfile/helperForProfile";

const Saved = (props) => {
  return <ReturnImageList {...props} logicOfPagePost={false} isSaved={true} />;
};

export default Saved;
