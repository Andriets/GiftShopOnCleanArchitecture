import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetBoxById, SetBoxAttitudeFromProduct, DeleteBoxComment } from '../AdminPanel/Boxes/BoxAction';
import { Attitude } from '../Common/Enums/Attitude';
import { AddBoxToCart } from '../Cart/CartAction';
import Rating from '@mui/material/Rating';
import CommentModal from './CommentModal';
import './BoxPage.css';

class BoxInfoBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openCommentModal: false
        }
    }

    setModalOpen = status => {
        this.setState({
            openCommentModal: status
        });
    }

    componentDidMount() {
        const { id } = this.props;
        this.props.getBoxById(id);
    }

    OnSetBoxAttitude = newAttitude => {
        const { box, setBoxAttitude, userId } = this.props;
        const userBoxAttitude = {
            userId: userId,
            boxId: box.id,
            attitude: newAttitude
        };
        box.attitude = newAttitude;
        setBoxAttitude(userBoxAttitude, box)
    }

    OnDeleteComment = commentId => {
        const { box } = this.props;
        this.props.deleteBoxComment(box.id, commentId);
    }

    OnAddBoxToCart = () => {
        const { cartList, box, addBoxToCart } = this.props;
        cartList.push(box);
        addBoxToCart(localStorage.getItem("Id"), box.id, cartList);
    }

    render() {
        const { box, attitude, rating, comments, userId, isAuthenticated } = this.props;

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
                            {isAuthenticated && 
                            <>
                                <button onClick={() => this.setModalOpen(true)} className='boxInfo_addCommentButton'>
                                    <img src={process.env.PUBLIC_URL + '/img/talk-bubble.svg'} />  
                                </button>
                                <CommentModal isOpen={this.state.openCommentModal} box={box} userId={userId} handleClose={this.setModalOpen}/>
                            </>
                            }
                            
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
                                <Rating className="custom-large-adjust" name="half-rating" value={rating} precision={0.1} size="large" readOnly/>
                            }
                        </div>
                        <div className="boxInfo-description">{box?.description}</div>
                    </div>
                </div>
                <div className='boxInfo-commentsContainer'>
                    <div className='boxInfo-comments'>
                        {comments?.map((c, key) => (
                         <div className='comment-item' key={key}>
                             <div className='comment-item-top'>
                                <img className='commentItem-user-photo' src={"data:image/png;base64," + c?.userPhoto?.img}/>
                                <div className='commentItem-userInfo'>
                                    <span className='commentItem-userName'>{c.userName}</span>
                                    {c.score > 0 && 
                                        <Rating className="custom-medium-adjust" name="half-rating" value={c.score} precision={0.1} readOnly/>
                                    }
                                </div>
                                {c.canDelete &&
                                    <img onClick={() => this.OnDeleteComment(c.commentId)} className='commentItem-trash' src={process.env.PUBLIC_URL + '/img/Trash.svg'}/>
                                }
                             </div>
                             <div className='comment-item-bottom'>
                                <span>{c.commentMessage}</span>
                             </div>
                         </div>   
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const isAuthenticated = !!localStorage.getItem('JwtToken');
    const userId = localStorage.getItem("Id");
    const box = state.box.box;
    let attitude;
    if (isAuthenticated) {
        let boxCommentDetails = box?.boxCommentDetails?.find(x => x.userId === userId);
        attitude = boxCommentDetails?.attitude;
    }

    const rating = box?.boxCommentDetails
        ?.filter(x => x.score !== null)
        .reduce((rating, boxCommentDetails, _, { length }) => {
            return rating + boxCommentDetails.score / length;
        }, 0);

    let comments = box?.boxCommentDetails?.filter(x => x.commentMessage !== null);
    comments = comments?.map(c => {
        let canDelete = c.userId === localStorage.getItem("Id") || state?.user?.role === "SuperAdmin" 
                                                                || state?.user?.role === "Moderator";
        return { ...c, canDelete }
    });
    
    return {
        cartList: state.cart.list,
        isAuthenticated,
        box,
        rating,
        comments,
        attitude,
        userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBoxById: (id) => dispatch(GetBoxById(id)),
        setBoxAttitude: (userBoxAttitude, box) => dispatch(SetBoxAttitudeFromProduct(userBoxAttitude, box)),
        addBoxToCart: (userId, boxId, newCart) => dispatch(AddBoxToCart(userId, boxId, newCart)),
        deleteBoxComment: (boxId, commentId) => dispatch(DeleteBoxComment(boxId, commentId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxInfoBlock);