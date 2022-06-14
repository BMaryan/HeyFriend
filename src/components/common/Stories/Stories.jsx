import React from "react";
import styles from "./Stories.module.scss";
import Story from "./Story/Story";

const Stories = (props) => {
  return (
    <div className={styles.stories}>
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
      <Story {...props} />
    </div>
  );
};

export default Stories;
