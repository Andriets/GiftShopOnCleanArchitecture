import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BoxPage.css';

class BoxInfoBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='box-info-block'>
                
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
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
)(BoxInfoBlock);