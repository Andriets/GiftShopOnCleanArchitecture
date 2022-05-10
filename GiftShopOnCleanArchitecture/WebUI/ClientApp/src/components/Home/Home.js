import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavMenu from '../NavMenu/NavMenu';
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
    const { isAuthenticated, role } = this.props.userInfo;
    const { needAuthentication } = this.props;
    let showChildren = true;

    if (needAuthentication && !isAuthenticated) {
      showChildren = false;
    }
    
    return (
      <div className='page'>
        <NavMenu />
        {showChildren && this.props?.children}
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
    getUserById: (id) => dispatch(GetUserById(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
