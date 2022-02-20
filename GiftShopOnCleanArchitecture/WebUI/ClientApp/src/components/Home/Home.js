import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import NavMenu from '../NavMenu/NavMenu';
import ProfilePage from '../UserProfile/ProfilePage';
import NotFound from '../NotFound/NotFound';
import './Home.css';

class Home extends Component {
  static displayName = Home.name;

  render () {
    const { isAuthenticated, role } = this.props.userInfo;

    return (
      <div className='page'>
        <NavMenu />
        <Switch> 
          {isAuthenticated && <Route path='/home/profile' render={() => <ProfilePage/>}/>}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let userInfo = state.user;
  userInfo.isAuthenticated = !!localStorage.getItem("JwtToken");
  return {
    userInfo: userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
