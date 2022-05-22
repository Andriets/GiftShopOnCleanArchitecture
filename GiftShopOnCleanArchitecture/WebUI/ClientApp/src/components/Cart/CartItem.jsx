import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpdateQuantity, DeleteBoxFromCart, GetCartsByBoxesIds } from './CartAction';
import './Cart.css';

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    onUpdateQuantity = (newQuantity) => {
        const { isAuthenticated, cart, updateQuantity, getCartsByBoxesIds } = this.props;
        const userId = localStorage.getItem("Id");

        if (isAuthenticated) {
            const cartItemInfo = {
                userId: userId,
                boxId: cart.id,
                newQuantity: newQuantity
            };
            updateQuantity(cartItemInfo);
            return;
        }

        let stringCartList = localStorage.getItem('Cart');
        let cartList = JSON.parse(stringCartList);
        cartList = cartList.map(b => {
            if (b.id === cart.id) {
                b.quantity = newQuantity;
            }
            return b;
        });
        getCartsByBoxesIds(cartList);
    }

    onDelete = () => {
        const { isAuthenticated, cart, deleteBoxFromCart, getCartsByBoxesIds } = this.props;
        const userId = localStorage.getItem("Id");

        if (isAuthenticated) {
            deleteBoxFromCart(userId, cart.id);
            return;
        }
        
        let stringCartList = localStorage.getItem('Cart');
        let cartList = JSON.parse(stringCartList);
        cartList = cartList.filter(b => {
            return b.id !== cart.id;
        });
        stringCartList = JSON.stringify(cartList);
        localStorage.setItem('Cart', stringCartList);
        getCartsByBoxesIds(cartList);
    }

    render() {   
        const { cart } = this.props;
        cart && console.log(cart);
        return (
            <div className='cart-item'>
                <div className='cart-item-photo'>
                    <img className='' src={"data:image/png;base64," + cart?.photoBytes?.img}/>
                </div>
                <div className='cart-item-details-container'>
                    <div className='cart-item-details'>
                        <div className='cart-item-title'>
                            <span>{cart.title}</span>
                        </div>
                        <div className='cart-item-details-bottom'>
                            <div className='cart-item-quantity'>
                                <img onClick={() => cart.quantity - 1 !== 0 && this.onUpdateQuantity(cart.quantity - 1)} src={process.env.PUBLIC_URL + '/img/Minus.svg'} />
                                <span>{cart.quantity}</span>
                                <img onClick={() => this.onUpdateQuantity(cart.quantity + 1)} src={process.env.PUBLIC_URL + '/img/Plus.svg'} />
                            </div>
                            <div className='cart-item-price'>
                                <span>${cart.price * cart.quantity}</span>
                            </div>
                        </div>
                    </div>
                    <div className='cart-item-actions'>
                        <img onClick={this.onDelete} src={process.env.PUBLIC_URL + '/img/Trash.svg'}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const isAuthenticated = !!localStorage.getItem('JwtToken');
    return {
        isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateQuantity: (cartItemInfo) => dispatch(UpdateQuantity(cartItemInfo)),
        deleteBoxFromCart: (userId, boxId) => dispatch(DeleteBoxFromCart(userId, boxId)),
        getCartsByBoxesIds: (boxesIds) => dispatch(GetCartsByBoxesIds(boxesIds))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartItem);