import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecomendationBlock from './RecomendationBlock';
import BoxInfoBlock from './BoxInfoBlock';
import './BoxPage.css';

class BoxPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { boxes } = this.props;
        const { id } = this.props.match.params;
        
        return (
            <div className='box-page'>
               <div className='page-name'>
                    <h3>PRODUCT</h3>
                </div>
                <div className='box-content'>
                    <RecomendationBlock />
                    <BoxInfoBlock id={id}/>
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
)(BoxPage);