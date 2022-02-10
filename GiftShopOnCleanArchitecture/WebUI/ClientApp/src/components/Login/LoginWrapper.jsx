import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SignIn } from './LoginAction';
import LoginFrom from './LoginForm';
import './Login.css';

class LoginWrapper extends Component {
    constructor () {
        super();
    }

    submitLogin = data => {
        this.props.SignIn(data.login, data.password);
    }

    render() {
        const { loginStatus } = this.props;

        return (
            <div className="background">
                <div className='loginContainer'>
                    <div className='leftPart'>
                        <img src={process.env.PUBLIC_URL + '/img/wwybt.png'}/>
                    </div>
                    <div className='rightPart'>
                        <div className='signIn'>
                            <span>SIGN IN</span>
                        </div>
                        <LoginFrom  onSubmit={this.submitLogin} loginError={loginStatus.loginError}/>
                        <div className='links'>
                            <a href='/home'>Forgot password?</a>
                            <a href='/home'>Don't have account?</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginStatus: state.login
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SignIn: (email, password) => dispatch(SignIn(email, password))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginWrapper);