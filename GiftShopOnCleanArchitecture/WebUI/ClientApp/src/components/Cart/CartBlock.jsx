import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import { GetCartsByBoxesIds } from './CartAction';
import './Cart.css';

class CartBlock extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { isAuthenticated, getCartsByBoxesIds } = this.props;
        if (!isAuthenticated) {
            const cartList = JSON.parse(localStorage.getItem('Cart'));
            getCartsByBoxesIds(cartList ?? []);
        }
    }

    render() {   
        const { onCheckout, cartList, totalPrice, isCheckout } = this.props;

        return (
            <div className='cart-block'>
                <div className='cart-block-top'>
                    <h3 className='cart-block-total'>Total: ${totalPrice}</h3>
                    <button onClick={onCheckout} className='checkout-button'>
                        <span>{!isCheckout ? "Checkout" : "Cancel"}</span>
                    </button>
                </div>
                <div className='cart-block-bottom'>
                    {cartList?.map((cart, key) => <CartItem cart={cart} key={key}/> )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const cartList = state.cart.list;
    const totalPrice = cartList.reduce((total, box) => total += (box.price * box.quantity), 0);

    return {
        cartList,
        totalPrice,
        isAuthenticated: !!localStorage.getItem('JwtToken')
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCartsByBoxesIds: (boxesIds) => dispatch(GetCartsByBoxesIds(boxesIds))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartBlock);