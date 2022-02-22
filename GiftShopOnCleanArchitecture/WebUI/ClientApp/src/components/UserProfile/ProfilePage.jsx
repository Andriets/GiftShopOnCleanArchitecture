import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetUserById } from '../UserProfile/UserAction';
import AvatarBlock from './AvatarBlock';
import UserInfoBlock from './UserInfoBlock';
import './Profile.css';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='profile-page'>
                <div className='page-name'>
                    <h3>USER PROFILE</h3>
                </div>
                <div className='profile-content'>
                    <div className='profile-content-left'>
                        <AvatarBlock userInfo={this.props.userInfo}/>
                    </div>
                    <div className='profile-content-right'>
                        <UserInfoBlock />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let userInfo = state.user;
    userInfo.isAuthenticated = !!localStorage.getItem("JwtToken");
    return {
        userInfo: userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserById: (id) => dispatch(GetUserById(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);