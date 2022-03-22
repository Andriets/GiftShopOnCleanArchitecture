import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteBoxById, SetEditMode } from './BoxAction';

class BoxCard extends Component {
    constructor(props) {
        super(props);

        this.DeleteBox = this.DeleteBox.bind(this);
    }

    DeleteBox = () => {
        const { boxInfo, boxes, deleteBoxById } = this.props;
        const newBoxList = boxes.filter(box => box.id !== boxInfo.id);
        deleteBoxById(boxInfo.id, newBoxList);
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
                    <img onClick={() => this.DeleteBox()} src={process.env.PUBLIC_URL + '/img/Trash.svg'}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        boxes: state.boxes.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setEditMode: (boxInfo) => dispatch(SetEditMode(boxInfo)),
        deleteBoxById: (boxId, boxes) => dispatch(DeleteBoxById(boxId, boxes))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxCard);