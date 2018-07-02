/* eslint-disable */
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';

import { Provider } from 'mobx-react';
import Layout from './layout/Index';
import './index.less';

function AppRouter(props) {
  return (
    <Provider {...props}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default AppRouter;
