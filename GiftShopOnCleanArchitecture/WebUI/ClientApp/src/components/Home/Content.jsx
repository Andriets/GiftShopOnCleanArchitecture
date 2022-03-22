import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import ProfilePage from '../UserProfile/ProfilePage';
import NotFound from '../NotFound/NotFound';
import { GetUserById } from '../UserProfile/UserAction';
import AdminPage from '../AdminPanel/AdminPage';

class Content extends Component {

    

    render() {
        const { isAuthenticated, role } = this.props.userInfo;

        return (
            <Switch> 
                {isAuthenticated && <Route path='/home/profile' render={() => <ProfilePage/>}/>}
                <Route path='/home/admin' render={() => <AdminPage/>}/>
                <Route component={NotFound} />
            </Switch>
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
)(Content);