import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { UpdateUserInfo } from './UserAction';
import './Profile.css';

class UserInfoForm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (formData) => {
        formData.id = localStorage.getItem("Id");
        this.props.updateUserInfo(formData);
    }

    render() {
        const { handleSubmit, reset } = this.props;

        return (
            <form className="userInfoForm" onSubmit={handleSubmit(this.onSubmit)}>
                <div className="userInfo-fieldsRow">
                    <div className="userInfo-fieldBox">
                        <label>First Name</label>
                        <Field name="firstname" type="text" component="input"/>
                    </div>
                    <div className="userInfo-fieldBox">
                        <label>Last Name</label>
                        <Field name="lastname" type="text" component="input"/>
                    </div>                    
                </div>

                <div className="userInfo-fieldsRow">
                    <div className="userInfo-fieldBox">
                        <label>Email</label>
                        <Field name="email" type="text" component="input"/>
                    </div>
                    <div className="userInfo-fieldBox">
                        <label>Phone Number</label>
                        <Field name="phonenumber" type="text" component="input"/>
                    </div>                    
                </div>

                <div className="userInfo-fieldsRow">
                    <div className="userInfo-fieldBox">
                        <label>Region</label>
                        <Field name="region" type="text" component="input"/>
                    </div>
                    <div className="userInfo-fieldBox">
                        <label>City</label>
                        <Field name="city" type="text" component="input"/>
                    </div>                    
                </div>

                <div className="userInfo-fieldsRow">
                    <div className="userInfo-fieldBox">
                        <label>Post office</label>
                        <Field name="postoffice" type="text" component="input"/>
                    </div>                 
                </div>

                <div className="userInfo-fieldsRow">
                    <button onClick={reset}>Reset</button>   
                    <button type="submit">Submit</button>              
                </div>
            </form>
        );
    }
}

UserInfoForm = reduxForm({
    form: "userInfo-form",
    enableReinitialize: true
})(UserInfoForm);
  
const mapStateToProps = (state) => {
    const userData = {
        firstname: state.user.firstName,
        lastname: state.user.lastName,
        email: state.user.email,
        phonenumber: state.user.phoneNumber,
        region: state.user.region,
        city: state.user.city,
        postoffice: state.user.postOffice
    }
    return {
        initialValues: userData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: (userInfo) => dispatch(UpdateUserInfo(userInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoForm);