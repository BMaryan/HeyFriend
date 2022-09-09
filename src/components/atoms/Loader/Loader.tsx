/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styles from "./Loader.module.scss";
import { CircularProgress } from "@mui/material";

interface LoaderPropsType {}

const Loader = (props: LoaderPropsType) => {
  return (
    <div className="gl_wrapper_loading">
      <CircularProgress className="loading" />
    </div>
  );
};

export default Loader;
