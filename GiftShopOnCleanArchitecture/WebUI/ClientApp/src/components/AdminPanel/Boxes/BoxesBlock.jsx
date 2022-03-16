import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoxCard from './BoxCard';
import { GetAllBoxes } from './BoxAction';
import BoxModal from './BoxModal';
import '../Admin.css';

class BoxesBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        const filterData = {
            page: 0,
            pageSize: 0,
            keyWord: ""
        }
        this.props.getAllBoxes(filterData);
    }

    handleOpen(open) {
        this.setState({
            isModalOpen: open
        })
    }

    handleClose(open) {
        this.setState({
            isModalOpen: open
        })
    }

    render() {
        const { boxes } = this.props;

        return (
            <div className='boxes-block'>
                <div className='boxes-actions'>
                    <button onClick={() => this.handleOpen(true)}>
                        ADD NEW BOX
                    </button>
                    <BoxModal isOpen={this.state.isModalOpen} handleClose={this.handleClose}/>
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
        boxes: state.boxes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBoxes: (filterData) => dispatch(GetAllBoxes(filterData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxesBlock);