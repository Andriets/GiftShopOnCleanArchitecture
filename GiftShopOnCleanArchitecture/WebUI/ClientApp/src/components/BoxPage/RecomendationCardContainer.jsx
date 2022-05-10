import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Attitude } from '../Common/Enums/Attitude';
import { SetBoxAttitudeFromCatalog } from '../AdminPanel/Boxes/BoxAction';
import { AddBoxToCart } from '../Cart/CartAction';
import BoxCard from '../Catalog/BoxCard';

class RecomendationCardContainer extends Component {
    constructor(props) {
        super(props);

        this.OnSetAttitude = this.OnSetAttitude.bind(this);
        this.OnAddBoxToCart = this.OnAddBoxToCart.bind(this);
    }

    OnSetAttitude = (newAttitude) => {
        console.log("Need to implement");
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
)(RecomendationCardContainer);