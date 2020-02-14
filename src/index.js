/* eslint-disable */
import 'babel-polyfill';
import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotLoaderAppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './Routes/App';
import configureStore from './store/configureStore';
import { Grid, Row } from 'react-bootstrap';

export const history = createBrowserHistory();
export const store = configureStore({}, history);

const renderApp = () => {
  ReactDOM.render(
    <HotLoaderAppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {/* <Grid> */}
          {/* <Row className="show-grid"> */}
          <App />
          {/* </Row> */}
          {/* </Grid> */}
        </ConnectedRouter>
      </Provider>
    </HotLoaderAppContainer>,
    document.getElementById('root'),
  );
};
renderApp();
if (module.hot) {
  // the module update from this path onwards... */
  module.hot.accept();
}
