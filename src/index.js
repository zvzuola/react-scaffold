/* eslint-disable */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './router';
import store from './store'
import actions from './actions'

render(
  <AppContainer>
    <App store={store} actions={actions} />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./router', () => {
    const NextApp = require('./router').default;
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}

