import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import CartBlock from './CartBlock';
import './Cart.css';

class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCheckout: false
        };
    }

    handleClick = () => {
        this.setState(state => ({
            isCheckout: !state.isCheckout
        }));
    }

    render() {   
        return (
            <div className='cart-page'>
               <div className='page-name'>
                    <h3>CART</h3>
                </div>
                <div className='cart-content'>                  
                    <CartBlock onCheckout={this.handleClick} isCheckout={this.state.isCheckout}/>
                    <Collapse className='order-block-collapse' orientation="horizontal" in={this.state.isCheckout} >
                        <div onClick={this.handleClick} className='order-block'>

                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartPage);