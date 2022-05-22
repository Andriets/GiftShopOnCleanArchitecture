import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { CreateOrder } from './OrderAction';
import './Cart.css';

class OrderBlock extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    onSubmit = (formData) => {
        const { createOrder, cart } = this.props;
        const order = {
            userId: localStorage.getItem('Id'),
            userName: `${formData.firstName} ${formData.lastName}`,
            region: formData.region,
            city: formData.city,
            phoneNumber: formData.phoneNumber,
            postOffice: formData.postOffice,
            boxes: cart
        };

        createOrder(order);
    }

    render() {   
        const { handleSubmit, submitError } = this.props;
        return (
            <div className='order-block'>
                <h2>ENTER YOUR INFORMATION</h2>
                <form className="orderForm" onSubmit={handleSubmit(this.onSubmit)} autoComplete="off">
                    <div className="orderForm-fields">
                        <div className="orderForm-firsrow">
                            <div className="orderForm-field">
                                <label>First name</label>
                                <Field name="firstName" component="input" />
                            </div>
                            <div className="orderForm-field">
                                <label>Last name</label>
                                <Field name="lastName" component="input" />
                            </div>
                        </div>
                        
                        <div className="orderForm-field">
                            <label>Region</label>
                            <Field name="region" component="input" />
                        </div>
                        <div className="orderForm-field">
                            <label>City</label>
                            <Field name="city" component="input" />
                        </div>
                        <div className="orderForm-field">
                            <label>Phone number</label>
                            <Field name="phoneNumber" component="input" />
                        </div>
                        <div className="orderForm-field">
                            <label>Post office</label>
                            <Field name="postOffice" component="input" />
                        </div>
                    </div>
                    {submitError && <p>Error</p>}
                    <div className="orderForm-actions">
                        <button type="submit">Place an order</button>   
                    </div>   
                </form>
            </div>
        );
    }
}

OrderBlock = reduxForm({
    form: "order-form",
    enableReinitialize: true
})(OrderBlock);

const mapStateToProps = state => {
    const user = state.user;
    return {
        cart: state.cart.list,
        initialValues: { ...user }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createOrder: (order) => dispatch(CreateOrder(order))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderBlock);