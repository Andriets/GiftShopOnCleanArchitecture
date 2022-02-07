import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <header>
          <div className='topNavMenu'>
            <div className='topNavMenuChild'>
              <img src={process.env.PUBLIC_URL + '/img/logo.png'} />
            </div>
            <div className='topNavMenuChild'>
              <img src={process.env.PUBLIC_URL + '/img/userIcon.png'} />
            </div>
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
