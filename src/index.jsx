import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import configureStore from "redux/configureStore";
import "./global/default.css";
import "./global/grid.css";
import "./global/responsive.css";
import App from "./containers/App";

const store = configureStore();
const history = createHistory();

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById("root")
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./containers/App", () => {
    const NextApp = require("./containers/App").default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <NextApp />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
