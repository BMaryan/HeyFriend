import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import { Provider } from "react-redux";
import store from "./redux/store";
import ReactDOM from "react-dom";
import "./index.scss";
import { ModalProvider } from "./context/ModalContext";

ReactDOM.render(
  <Provider store={store}>
    <ModalProvider>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </ModalProvider>
  </Provider>,
  document.getElementById("root")
);
