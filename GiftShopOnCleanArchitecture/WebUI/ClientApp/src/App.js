import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound.jsx';
import LoginWrapper from './components/Login/LoginWrapper.jsx';
import RegisterWrapper from './components/Register/RegisterWrapper.jsx';
import BoxPage from './components/BoxPage/BoxPage';
import CatalogPage from './components/Catalog/CatalogPage';
import CartPage from './components/Cart/CartPage';
import AdminPage from './components/AdminPanel/AdminPage';
import ProfilePage from './components/UserProfile/ProfilePage';

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
              <Redirect to="/home/catalog" />
          )}/>
        <Route path='/home/profile' component={() => (<Home needAuthentication><ProfilePage/></Home>)}/>
        <Route path='/home/product/:id' component={(props) => (<Home><BoxPage {...props}/></Home>)}/>
        <Route path='/home/catalog' component={() => <Home><CatalogPage/></Home>} />
        <Route path='/home/cart' component={() => <Home><CartPage/></Home>} />
        <Route path='/home/admin' component={() => <Home><AdminPage/></Home>} />        
        <Route path='/login' component={LoginWrapper} />
        <Route path='/register' component={RegisterWrapper} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}