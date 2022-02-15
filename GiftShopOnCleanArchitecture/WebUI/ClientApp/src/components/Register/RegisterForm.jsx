import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import './Register.css';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { registerError, handleSubmit } = this.props;

        return(
            <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
                <div className='inputs-r'>
                    <div className="inputBox">
                        <Field name="firstName" placeholder="First Name" component="input" type="text" />
                    </div>
                    <div className="inputBox">
                        <Field name="lastName" placeholder="Last Name" component="input" type="text" />
                    </div>
                    <div className="inputBox">
                        <Field name="email" placeholder="Email" component="input" type="text" />
                    </div>
                    <div className="inputBox">
                        <Field name="password" placeholder="Password" component="input" type="password" />
                    </div>
                    <div className="inputBox">
                        <Field name="repeadPassword" placeholder="Repead Password" component="input" type="password" />
                    </div>
                </div>
                {registerError &&
                    <span className="registerMessage">{registerError}</span>
                }
                <div className="submit-btn">
                    <input type="submit" value="Register"/>
                </div>
            </form>
        );
    }
}

RegisterForm = reduxForm({
    form: "login-form"
})(RegisterForm);
  
export default RegisterForm;