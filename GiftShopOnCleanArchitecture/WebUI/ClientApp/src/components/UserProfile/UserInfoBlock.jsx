import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfoForm from './UserInfoForm';

class UserInfoBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openTab: "userInfoForm"
        }
    }

    render() {
        const componentByTabName = {
            userInfoForm: UserInfoForm
        }

        const CurrentComponent = componentByTabName[this.state.openTab];
        return (
            <div className='info-block'>
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