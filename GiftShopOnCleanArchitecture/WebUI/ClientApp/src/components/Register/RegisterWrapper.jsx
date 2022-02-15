import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import { Register } from './RegisterAction';
import './Register.css';

class RegisterWrapper extends Component {
    constructor(props) {
        super(props);
    }

    submitRegister = registerData => {
        debugger;
        registerData.role = 'User';
        this.props.register(registerData);
    }

    render() {
        const { registerStatus } = this.props;

        return (
            <div className="background">
                <div className='registerContainer'>
                    <div className='leftPart'>
                        <img src={process.env.PUBLIC_URL + '/img/wtopog.png'}/>
                    </div>
                    <div className='rightPart'>
                        <div className='register'>
                            <span>Register</span>
                        </div>
                        <RegisterForm  onSubmit={this.submitRegister} registerError={registerStatus.registerError}/>
                        <div className='links'>
                            <a href='/home'>Already have account?</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        registerStatus: state.register
    }
};

const mapDispatchToProps = dispatch => {
    return {
        register: (registerData) => dispatch(Register(registerData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterWrapper);