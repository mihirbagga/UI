import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./duck/store";
import App from "./app";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#303f9f",
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important'

  }
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Route path="/" component={App} />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
