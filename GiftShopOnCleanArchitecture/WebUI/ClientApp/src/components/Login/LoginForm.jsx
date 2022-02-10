import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import './Login.css';

class LoginFrom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loginError, handleSubmit } = this.props;

        return(
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <div className='inputs'>
                    <div className="inputBox">
                        <Field name="login" placeholder="Login" component="input" type="text" />
                    </div>
                    <div className="inputBox">
                        <Field name="password" placeholder="Password" component="input" type="password" />
                    </div>
                </div>
                {loginError &&
                    <span className="errorMessage">{loginError}</span>
                }
                <div className="submit-btn">
                    <input type="submit" value="Sign in"/>
                </div>
            </form>
        );
    }
}

LoginFrom = reduxForm({
    form: "login-form"
})(LoginFrom);
  
export default LoginFrom;