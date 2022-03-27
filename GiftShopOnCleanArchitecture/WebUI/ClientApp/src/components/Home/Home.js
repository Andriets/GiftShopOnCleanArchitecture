import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import NavMenu from '../NavMenu/NavMenu';
import ProfilePage from '../UserProfile/ProfilePage';
import NotFound from '../NotFound/NotFound';
import Content from './Content';
import { GetUserById } from '../UserProfile/UserAction';
import './Home.css';

class Home extends Component {
  static displayName = Home.name;

  componentDidMount() {
    const userId = localStorage.getItem("Id");
    if (userId) {
        this.props.getUserById(userId);
    }
  }

  render () {
    return (
      <div className='page'>
        <NavMenu />
        <Content />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserById: (id) => dispatch(GetUserById(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
