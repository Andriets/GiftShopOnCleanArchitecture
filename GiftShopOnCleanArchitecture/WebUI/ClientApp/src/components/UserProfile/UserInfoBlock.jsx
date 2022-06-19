import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfoForm from './UserInfoForm';
import OrdersHistory from './OrdersHistory';
import './Profile.css';

const userInfoForm = "userInfoForm";
const ordersHistory = "ordersHistory";

class UserInfoBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openTab: userInfoForm
        }
    }

    handleChangeTab = (tabName) => {
        this.setState({
            openTab: tabName
        });
    }

    render() {
        const componentByTabName = {
            userInfoForm: UserInfoForm,
            ordersHistory: OrdersHistory
        }

        const CurrentComponent = componentByTabName[this.state.openTab];
        return (
            <div className='info-block'>
                <nav className='info-block_navbar'>
                    <ul className='info-block_navbar-list'>
                        <li onClick={() => this.handleChangeTab(userInfoForm)}>Basic Info</li>
                        {/* <li onClick={() => this.handleChangeTab(ordersHistory)}>Orders History</li> */}
                    </ul>
                </nav>
                <CurrentComponent />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoBlock);