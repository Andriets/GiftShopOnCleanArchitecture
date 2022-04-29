import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetBoxById, SetBoxAttitudeFromProduct } from '../AdminPanel/Boxes/BoxAction';
import { Attitude } from '../Common/Enums/Attitude';
import { AddBoxToCart } from '../Cart/CartAction';
import Rating from '@mui/material/Rating';
import './BoxPage.css';

class BoxInfoBlock extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.getBoxById(id);
    }

    OnSetBoxAttitude = newAttitude => {
        const userId = localStorage.getItem("Id");
        const { box, setBoxAttitude } = this.props;
        const userBoxAttitude = {
            userId: userId,
            boxId: box.id,
            attitude: newAttitude
        };
        box.attitude = newAttitude;
        setBoxAttitude(userBoxAttitude, box)
    }

    OnAddBoxToCart = () => {
        const { cartList, box, addBoxToCart } = this.props;
        cartList.push(box);
        addBoxToCart(localStorage.getItem("Id"), box.id, cartList);
    }

    render() {
        const { box, attitude, rating } = this.props;

        return (
            <div className='box-info-block'>
                <div className='boxInfo-boxContent'>
                    <div className='boxInfo-left'>
                        <div className='boxInfo-photo'>
                            <img className='boxInfo-boxImage' src={"data:image/png;base64," + box?.photoBytes?.img}/>
                            <div className='boxInfo-attitudeContainer'>
                                {attitude === Attitude.NONE &&
                                    <>
                                        <img onClick={() => this.OnSetBoxAttitude(Attitude.LIKE)} className='boxInfo-attitude' src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                                        <img onClick={() => this.OnSetBoxAttitude(Attitude.DISLIKE)} className='boxInfo-attitude' src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                                    </>
                                }
                                {attitude === Attitude.LIKE &&
                                    <img onClick={() => this.OnSetBoxAttitude(Attitude.NONE)} src={process.env.PUBLIC_URL + '/img/Like.svg'} />
                                }
                                {attitude === Attitude.DISLIKE &&
                                    <img onClick={() => this.OnSetBoxAttitude(Attitude.NONE)} src={process.env.PUBLIC_URL + '/img/Dislike.svg'} />
                                }
                            </div>
                            
                        </div>
                        <div className='boxInfo-left-bottom'>
                            <span className='boxInfo-price'>${box?.price}</span>
                            <button onClick={this.OnAddBoxToCart} className='boxInfo_toCartButton'>
                                <span>To cart</span>
                                <img src={process.env.PUBLIC_URL + '/img/cart.svg'} />
                            </button>
                        </div>
                    </div>
                    <div className='boxInfo-right'>
                        <h2 className="boxInfo-title">{box?.title}</h2>
                        <div>
                            {!!rating &&  
                                <Rating className="custom-large-adjust" name="half-rating" defaultValue={rating} precision={0.1} size="large" readOnly/>
                            }
                        </div>
                        <div className="boxInfo-description">{box?.description}</div>
                    </div>
                </div>
               
            </div>
        );
    }
}

const mapStateToProps = state => {
    const isAuthenticated = !!localStorage.getItem('JwtToken');
    const box = state.box.box;
    let attitude;
    if (isAuthenticated) {
        const userId = localStorage.getItem("Id");
        let boxCommentDetails = box?.boxCommentDetails?.find(x => x.userId === userId);
        attitude = boxCommentDetails?.attitude;
    }

    const rating = box?.boxCommentDetails
        ?.filter(x => x.score !== null)
        .reduce((rating, boxCommentDetails, _, { length }) => {
            return rating + boxCommentDetails.score / length;
        }, 0);
    
    return {
        isAuthenticated,
        box,
        rating,
        cartList: state.cart.list,
        attitude
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBoxById: (id) => dispatch(GetBoxById(id)),
        setBoxAttitude: (userBoxAttitude, box) => dispatch(SetBoxAttitudeFromProduct(userBoxAttitude, box)),
        addBoxToCart: (userId, boxId, newCart) => dispatch(AddBoxToCart(userId, boxId, newCart))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxInfoBlock);