import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Attitude } from '../Common/Enums/Attitude';
import { SetBoxAttitudeFromCatalog } from '../AdminPanel/Boxes/BoxAction';
import { AddBoxToCart } from '../Cart/CartAction';

export default class BoxCard extends Component {
    constructor(props) {
        super(props)
    }

    // OnSetAttitude = (newAttitude) => {
    //     const { boxes, setBoxAttitude, userId, box } = this.props;
    //     let currentBox = boxes.find(b => b.id === box.id);

    //     if (currentBox.boxCommentDetails.length) {
    //         const boxCommentDetails = currentBox.boxCommentDetails.find(bcd => bcd.userId === userId);
    //         boxCommentDetails.attitude = newAttitude;
    //     } else {
    //         currentBox.boxCommentDetails.push({userId: userId, boxId: box.id, attitude: newAttitude});
    //     }

    //     const userBoxAttitude = {
    //         userId: userId,
    //         boxId: box.id,
    //         attitude: newAttitude
    //     }
    //     setBoxAttitude(userBoxAttitude, [...boxes]);
    // }

    // OnAddBoxToCart = () => {
    //     const { userId, cartList, box, addBoxToCart } = this.props;
    //     cartList.push(box);
    //     addBoxToCart(userId, box.id, cartList);
    // }

    render() {
        const { box, isAuthenticated, attitude, OnAddBoxToCart, OnSetAttitude } = this.props;

        return (
            <div className='catalog-card'>
                <img className='card-backgroud-photo' src={'data:image/png;base64,' + box?.photoBytes?.img}/>
                <div> 
                    
                    <div className='attitude-container'>
                    {isAuthenticated && attitude === Attitude.NONE && 
                        <>
                            <img onClick={() => OnSetAttitude(Attitude.LIKE)} src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                            <img onClick={() => OnSetAttitude(Attitude.DISLIKE)} src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                        </>
                    }
                    {isAuthenticated && attitude === Attitude.LIKE &&
                        <img onClick={() => OnSetAttitude(Attitude.NONE)} src={process.env.PUBLIC_URL + '/img/Like.svg'} />
                    }
                    {isAuthenticated && attitude === Attitude.DISLIKE &&
                        <img onClick={() => OnSetAttitude(Attitude.NONE)} src={process.env.PUBLIC_URL + '/img/Dislike.svg'} />
                    }
                    </div>
                    
                    
                    <div className='catalog-card-info'>
                        <div className='card-box-name'>
                            <Link to={`/home/product/${box.id}`}>
                                <span>{box.title}</span>
                            </Link>
                        </div>
                        <div className='card-price-cart'>
                            <span className='card-price'>${box.price}</span>
                            <button>
                                <img onClick={OnAddBoxToCart} src={process.env.PUBLIC_URL + '/img/cart.svg'} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}