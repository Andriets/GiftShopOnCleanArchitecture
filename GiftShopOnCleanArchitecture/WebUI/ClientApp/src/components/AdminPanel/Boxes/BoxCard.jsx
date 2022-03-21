import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SetModalOpen, SetEditMode } from './BoxAction';

class BoxCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, description, price, photoBytes } = this.props.boxInfo;
        const { setEditMode } = this.props;
        return (
            <div className='box-card'>
                <div className='box-left'>
                    <div className='box-photo'>
                        <img src={"data:image/png;base64," + photoBytes?.img}/>
                    </div>
                    <div className='box-info'>
                        <h4 className='box-title'>{title}</h4>
                        <h5 className='box-price'>${price}</h5>
                        <p className='box-description'>{description}</p>
                    </div>
                </div>
                <div className='box-actions'>
                    <img onClick={() => setEditMode(this.props.boxInfo)} src={process.env.PUBLIC_URL + '/img/Edit.svg'}/>
                    <img src={process.env.PUBLIC_URL + '/img/Trash.svg'}/>
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
        setEditMode: (boxInfo) => dispatch(SetEditMode(boxInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxCard);