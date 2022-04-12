import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Attitude } from '../Common/Enums/Attitude';

class BoxCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { box, isAuthenticated, userId } = this.props;
        const attitude = box.boxCommentDetails.find(x => x.userId === userId)?.attitude ?? Attitude.NONE;
        debugger;
        return (
            <div className='catalog-card'>
                <img className='card-backgroud-photo' src={'data:image/png;base64,' + box?.photoBytes?.img}/>
                <div> 
                    
                    <div className='attitude-container'>
                    {isAuthenticated && attitude === Attitude.NONE && 
                        <>
                            <img src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                            <img src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                        </>
                    }
                    {isAuthenticated && attitude === Attitude.LIKE &&
                        <img src={process.env.PUBLIC_URL + '/img/Like.svg'} />
                    }
                    {isAuthenticated && attitude === Attitude.DISLIKE &&
                        <img src={process.env.PUBLIC_URL + '/img/Dislike.svg'} />
                    }
                    </div>
                    
                    
                    <div className='catalog-card-info'>
                        <div className='card-box-name'>
                            <span>{box.title}</span>
                        </div>
                        <div className='card-price-cart'>
                            <span className='card-price'>${box.price}</span>
                            <button>
                                <img src={process.env.PUBLIC_URL + '/img/cart.svg'} />
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
        isAuthenticated: !!localStorage.getItem('JwtToken'),
        userId: localStorage.getItem('Id')
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxCard);