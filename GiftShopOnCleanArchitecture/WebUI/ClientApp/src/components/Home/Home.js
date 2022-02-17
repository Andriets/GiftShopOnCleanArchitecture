import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import NavMenu from '../NavMenu/NavMenu';
import ProfilePage from '../UserProfile/ProfilePage';
import NotFound from '../NotFound/NotFound';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className='page'>
        <NavMenu />
        <Switch>
          <Route path='/home/profile' render={() => <ProfilePage/>}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
