import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoxCard from './BoxCard';
import { GetAllBoxes, SetModalOpen } from './BoxAction';
import { GetAllTags } from '../Tags/TagAction';
import BoxModal from './BoxModal';
import '../Admin.css';

class BoxesBlock extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const filterData = {
            page: 0,
            pageSize: 0,
            keyWord: ""
        }
        this.props.getAllBoxes(filterData);
        this.props.getAllTags("");
    }

    render() {
        const { boxes, isModalOpen, setModalOpen } = this.props;
        return (
            <div className='boxes-block'>
                <div className='boxes-actions'>
                    <button onClick={() => setModalOpen(true)}>
                        ADD NEW BOX
                    </button>
                    <BoxModal isOpen={isModalOpen} handleClose={setModalOpen}/>
                </div>
                <div className='boxes-list'>
                    {
                      boxes.list.map(box =>
                        <BoxCard key={box.id} boxInfo={box} />
                      )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        boxes: state.boxes,
        isModalOpen: state.addBox.isOpen
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBoxes: (filterData) => dispatch(GetAllBoxes(filterData)),
        getAllTags: (keyWord) => dispatch(GetAllTags(keyWord)),
        setModalOpen: (open) => dispatch(SetModalOpen(open))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxesBlock);