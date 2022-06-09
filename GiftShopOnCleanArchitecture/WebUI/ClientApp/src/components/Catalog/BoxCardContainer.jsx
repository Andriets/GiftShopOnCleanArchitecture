import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Attitude } from '../Common/Enums/Attitude';
import { SetBoxAttitudeFromCatalog } from '../AdminPanel/Boxes/BoxAction';
import { AddBoxToCart, SetCartList } from '../Cart/CartAction';
import BoxCard from './BoxCard';

class BoxCardContainer extends Component {
    constructor(props) {
        super(props);

        this.OnSetAttitude = this.OnSetAttitude.bind(this);
        this.OnAddBoxToCart = this.OnAddBoxToCart.bind(this);
    }

    OnSetAttitude = (newAttitude) => {
        const { boxes, setBoxAttitude, userId, box } = this.props;
        let currentBox = boxes.find(b => b.id === box.id);
        
        const boxCommentDetails = currentBox.boxCommentDetails.find(bcd => bcd.userId === userId);
        
        if (boxCommentDetails) {
            boxCommentDetails.attitude = newAttitude;
        } else {
            currentBox.boxCommentDetails.push({userId: userId, boxId: box.id, attitude: newAttitude});
        }

        const userBoxAttitude = {
            userId: userId,
            boxId: box.id,
            attitude: newAttitude
        }
        setBoxAttitude(userBoxAttitude, [...boxes]);
    }

    OnAddBoxToCart = () => {
        const { userId, cartList, box, addBoxToCart, setCartList } = this.props;

        cartList.push(box);
        if (userId) {
            addBoxToCart(userId, box.id, cartList);
            return;
        }
        
        let stringCartList = localStorage.getItem('Cart');
        let cart = stringCartList === null ? [] : JSON.parse(stringCartList);

        if (cart.length === 10) {
            alert("You can add only 10 product to the cart");
            return;
        }

        let el = cart.find(x => x.id === box.id);
        if (el === undefined) {
            cart.push({id: box.id, quantity: 1});
            stringCartList = JSON.stringify(cart);
            localStorage.setItem('Cart', stringCartList);
            setCartList(cartList);
        } else {
            alert("This product is already in the cart");
        }
    }

    render() {
        return (
            <BoxCard {...this.props} 
                OnSetAttitude={this.OnSetAttitude}
                OnAddBoxToCart={this.OnAddBoxToCart}/>
        );
    }
}

const mapStateToProps = (state, props) => {
    const userId = localStorage.getItem('Id');
    const attitude = props.box.boxCommentDetails.find(x => x.userId === userId)?.attitude ?? Attitude.NONE;

    return {
        cartList: state.cart.list,
        boxes: state.boxes.list,
        attitude: attitude,
        isAuthenticated: !!localStorage.getItem('JwtToken'),
        userId: userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setBoxAttitude: (userBoxAttitude, boxes) => dispatch(SetBoxAttitudeFromCatalog(userBoxAttitude, boxes)),
        addBoxToCart: (userId, boxId, newCart) => dispatch(AddBoxToCart(userId, boxId, newCart)),
        setCartList: (cartList) => dispatch(SetCartList(cartList))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxCardContainer);