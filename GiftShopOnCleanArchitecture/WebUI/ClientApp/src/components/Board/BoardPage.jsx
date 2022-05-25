import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoardColumn from './BoardColumn';
import  { GetAllOrders } from '../Cart/OrderAction';
import { OrderStatus } from '../Common/Enums/OrderStatus';
import OrderModal from './OrderModal';
import NotFound from '../NotFound/NotFound';
import './Board.css';

class BoardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            isModalOpen: false
        }
    }

    handleModalOpen = (order) => {
        this.setState({
            order: order,
            isModalOpen: true
        });
    }

    handleModalClose = () => {
        this.setState({
            order: null,
            isModalOpen: false
        })
    }

    componentDidMount() {
        this.props.getAllOrders()
    }

    render() {
        const { userRole, todoOrders, inProgressOrders, doneOrders } = this.props;
        return(
            <>
                {userRole === "SuperAdmin" || userRole === "Moderator" ? 
                    <div className='board-page'>
                        <div className='page-name'>
                            <h3>BOART</h3>
                        </div>
                        <div className='board-content'>
                        <BoardColumn columnName="TO DO" orders={todoOrders} handleModalOpen={this.handleModalOpen}/>
                        <BoardColumn columnName="IN PROGRESS" orders={inProgressOrders} handleModalOpen={this.handleModalOpen}/>
                        <BoardColumn columnName="DONE" orders={doneOrders} handleModalOpen={this.handleModalOpen}/>
                        <OrderModal isOpen={this.state.isModalOpen} order={this.state.order} handleClose={this.handleModalClose}/>
                        </div> 
                    </div>
                    : <NotFound />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    const todoOrders = state?.orders?.list?.filter(order => order.orderStatus === OrderStatus.TODO);
    const inProgressOrders = state?.orders?.list?.filter(order => order.orderStatus === OrderStatus.IN_PROGRESS);
    const doneOrders = state?.orders?.list?.filter(order => order.orderStatus === OrderStatus.DONE);
    return {
        userRole: state?.user?.role,
        todoOrders,
        inProgressOrders,
        doneOrders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllOrders: () => dispatch(GetAllOrders())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardPage);