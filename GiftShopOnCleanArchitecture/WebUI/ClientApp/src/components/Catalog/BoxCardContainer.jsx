import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Attitude } from '../Common/Enums/Attitude';
import { SetBoxAttitudeFromCatalog } from '../AdminPanel/Boxes/BoxAction';
import { AddBoxToCart } from '../Cart/CartAction';
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

        if (currentBox.boxCommentDetails.length) {
            const boxCommentDetails = currentBox.boxCommentDetails.find(bcd => bcd.userId === userId);
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
        const { userId, cartList, box, addBoxToCart } = this.props;
        cartList.push(box);
        addBoxToCart(userId, box.id, cartList);
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
        addBoxToCart: (userId, boxId, newCart) => dispatch(AddBoxToCart(userId, boxId, newCart))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxCardContainer);