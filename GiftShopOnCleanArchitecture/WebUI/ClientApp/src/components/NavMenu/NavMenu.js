import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { GetUserById } from '../UserProfile/UserAction';
import './NavMenu.css';

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
  }

  // componentWillMount() {
  //   const userId = localStorage.getItem("Id");
  //   if (userId) {
  //     this.props.getUserById(userId);
  //   }
  // }

  render () {
    const { isAuthenticated, role } = this.props.userInfo;

    return (
      <header>
          <div className='topNavMenu'>
            <div className='topNavMenuChild'>
              <img src={process.env.PUBLIC_URL + '/img/logo.png'} />
            </div>
            <a href={isAuthenticated ? "/home/profile" : "/login"}>
              <div className='topNavMenuChild'>
                  <img src={this.props.userInfo.photo?.img ? this.props.userInfo.photo.img : process.env.PUBLIC_URL + '/img/userIcon.png'} />
              </div>
            </a>
          </div>
          
          <nav>
            <ul className='menu'>
              <li className='menu_list'>
                <img src={process.env.PUBLIC_URL + '/img/home_icon.svg'} />
              </li>
              <li className='menu_list'>
                <img src={process.env.PUBLIC_URL + '/img/content_details_grid_list_list.svg'} />
              </li>
              <li className='menu_list'>
                <img src={process.env.PUBLIC_URL + '/img/cart.svg'} />
              </li>             
            </ul>
          </nav>
      </header>
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
)(NavMenu);