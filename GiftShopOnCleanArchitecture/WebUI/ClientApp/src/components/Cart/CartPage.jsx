import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import CartBlock from './CartBlock';
import OrderBlock from './OrderBlock';
import './Cart.css';

class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCheckout: false
        };
    }

    handleClick = () => {
        this.setState(state => ({
            isCheckout: !state.isCheckout
        }));
    }

    render() {
        const { cart } = this.props;   
        return (
            <div className='cart-page'>
               <div className='page-name'>
                    <h3>CART</h3>
                </div>
                <div className='cart-content'>                  
                    <CartBlock onCheckout={this.handleClick} isCheckout={this.state.isCheckout}/>
                    <Collapse className='order-block-collapse' orientation="horizontal" in={cart.length > 0 && this.state.isCheckout} >
                        <OrderBlock />
                    </Collapse>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartPage);