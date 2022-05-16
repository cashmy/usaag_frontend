import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppThemeProvider from "./app/AppThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <Router>
        <AppThemeProvider />
      </Router>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
