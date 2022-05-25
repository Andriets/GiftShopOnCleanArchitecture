import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderCard from './OrderCard';
import './Board.css';

class BoardPage extends Component {
    constructor(props) {
        super(props);
    }

    handleChangeTab = (tabName) => {
        this.setState({
            openTab: tabName
        });
    }

    render() {
        const { columnName, orders, handleModalOpen } = this.props;
        return(
            <div className='board-column'>
                <div className='column-head'>
                    <span>{columnName}</span>
                </div>
                <div className='column-content'>
                    {orders?.map(order => <OrderCard order={order} key={order.id} handleModalOpen={handleModalOpen}/>)}
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
)(BoardPage);