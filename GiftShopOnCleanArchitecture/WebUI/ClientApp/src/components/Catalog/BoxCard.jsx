import React, { Component } from 'react';
import { connect } from 'react-redux';

class BoxCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { box } = this.props;
        console.log(box);
        return (
            <div className='catalog-card'>
                <img className='card-backgroud-photo' src={'data:image/png;base64,' + box?.photoBytes?.img}/>
                <div>
                    <div className='attitude-container'>
                        <img src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
                        <img src={process.env.PUBLIC_URL + '/img/Attitude.svg'} />
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