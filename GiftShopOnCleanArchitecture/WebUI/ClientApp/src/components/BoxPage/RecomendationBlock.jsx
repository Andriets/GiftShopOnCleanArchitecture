import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BoxPage.css';

class RecomendationBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='recomendation-block'>
                
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
)(RecomendationBlock);