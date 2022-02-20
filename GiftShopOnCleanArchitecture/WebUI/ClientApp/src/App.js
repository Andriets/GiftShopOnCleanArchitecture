import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound.jsx';
import LoginWrapper from './components/Login/LoginWrapper.jsx';
import RegisterWrapper from './components/Register/RegisterWrapper.jsx';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
              <Redirect to="/home" />
          )}/>
        <Route path='/home' component={Home} />
        <Route path='/login' component={LoginWrapper} />
        <Route path='/register' component={RegisterWrapper} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
