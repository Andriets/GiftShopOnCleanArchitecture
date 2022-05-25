import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Board.css';

class OrderCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { order, userPhoto, userName, phoneNumber, destination, handleModalOpen } = this.props;
        
        return(
            <div className='order-card'>
                <div className='order-card-photo'>
                    <img src={userPhoto}/>
                </div>
                <div className='order-info'>
                    <span>{userName}</span>
                    <span>{phoneNumber}</span>
                    <span>{destination}</span>
                </div>
                <div className='order-actions'>
                    <span onClick={() => handleModalOpen(order)}>details</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { order } = props;
    const userPhoto = order?.user?.photo?.img ? "data:image/png;base64," + order?.user?.photo?.img 
                                              : process.env.PUBLIC_URL + '/img/userIcon.png';
    const userName = order.userName;
    const phoneNumber = order?.phoneNumber;
    const destination = `${order?.region} ${order?.city}, №${order?.postOffice}`;
    return {
        order,
        userPhoto,
        userName,
        phoneNumber,
        destination
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderCard);