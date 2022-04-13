import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Attitude } from '../Common/Enums/Attitude';
import { SetBoxAttitude } from '../AdminPanel/Boxes/BoxAction';
import { AddBoxToCart } from '../Cart/CartAction';

class BoxCard extends Component {
    constructor(props) {
        super(props)
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
        const { box, isAuthenticated, userId } = this.props;
        const attitude = box.boxCommentDetails.find(x => x.userId === userId)?.attitude ?? Attitude.NONE;

        return (
            <div className='catalog-card'>
                <img className='card-backgroud-photo' src={'data:image/png;base64,' + box?.photoBytes?.img}/>
                <div> 
                    
                    <div className='attitude-container'>
                    {isAuthenticated && attitude === Attitude.NONE && 
                        <>
                            <img onClick={() => this.OnSetAttitude(Attitude.LIKE)} src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                            <img onClick={() => this.OnSetAttitude(Attitude.DISLIKE)} src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                        </>
                    }
                    {isAuthenticated && attitude === Attitude.LIKE &&
                        <img onClick={() => this.OnSetAttitude(Attitude.NONE)} src={process.env.PUBLIC_URL + '/img/Like.svg'} />
                    }
                    {isAuthenticated && attitude === Attitude.DISLIKE &&
                        <img onClick={() => this.OnSetAttitude(Attitude.NONE)} src={process.env.PUBLIC_URL + '/img/Dislike.svg'} />
                    }
                    </div>
                    
                    
                    <div className='catalog-card-info'>
                        <div className='card-box-name'>
                            <span>{box.title}</span>
                        </div>
                        <div className='card-price-cart'>
                            <span className='card-price'>${box.price}</span>
                            <button>
                                <img onClick={this.OnAddBoxToCart} src={process.env.PUBLIC_URL + '/img/cart.svg'} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartList: state.cart.list,
        boxes: state.boxes.list,
        isAuthenticated: !!localStorage.getItem('JwtToken'),
        userId: localStorage.getItem('Id')
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setBoxAttitude: (userBoxAttitude, boxes) => dispatch(SetBoxAttitude(userBoxAttitude, boxes)),
        addBoxToCart: (userId, boxId, newCart) => dispatch(AddBoxToCart(userId, boxId, newCart))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxCard);