import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { GetUserById } from '../UserProfile/UserAction';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { GetUserCart, SetCartList } from '../Cart/CartAction';
import './NavMenu.css';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 28,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    background: '#FFDD00',
    color: '#FA4032',
    fontWeight: 'bold'
  },
}));

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
  }

  componentWillMount() {
    const userId = localStorage.getItem("Id");
    if (userId) {
      this.props.getUserCart(userId);
      return;
    }

    let stringCartList = localStorage.getItem('Cart');
    let cartList = stringCartList === null ? [] : JSON.parse(stringCartList);
    this.props.setCartList(cartList);
  }

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
              <div>
                <a href={"/home/main"}>
                  <li className='menu_list'>
                    <img src={process.env.PUBLIC_URL + '/img/home_icon.svg'} />
                  </li>
                </a>
                <a href={"/home/catalog"}>
                  <li className='menu_list'>
                    <img src={process.env.PUBLIC_URL + '/img/content_details_grid_list_list.svg'} />
                  </li>
                </a>
                <a href={"/home/cart"}>
                  <li className='menu_list'>
                    <StyledBadge badgeContent={this.props.cart.list.length} invisible={this.props.cart.list.length === 0}>
                      <img src={process.env.PUBLIC_URL + '/img/cart.svg'} />
                    </StyledBadge>
                  </li>  
                </a>
              </div>
              <div> 
                {(role === "SuperAdmin" || role === "Moderator") &&
                  <a href={"/home/board"}>
                    <li className='menu_list'>
                      <img src={process.env.PUBLIC_URL + '/img/Board.svg'} />
                    </li> 
                  </a>
                }
                {role === "SuperAdmin" &&
                  <a href={"/home/admin"}>
                    <li className='menu_list'>
                      <img src={process.env.PUBLIC_URL + '/img/DashBoard.svg'} />
                    </li>  
                  </a>
                }
              </div>
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
    cart: state.cart,
    userInfo: userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserCart: (userId) => dispatch(GetUserCart(userId)),
    setCartList: (cartList) => dispatch(SetCartList(cartList))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu);