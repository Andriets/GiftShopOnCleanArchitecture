import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoxCard from './BoxCard';

class CatalogList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentPage, totalPages, boxes, isBoxesPending } = this.props;
        return (
            <div className='catalog-right'>
                <div className='filters-info'>
                    <span>{`${currentPage ? currentPage : 1} of ${totalPages}`}</span>
                </div>
                <div className='catalog-list-content'>
                    <div className='prev-page'>
                        <img alt="prev-arrow" src={process.env.PUBLIC_URL + '/img/prev-arrow.svg'}/>
                    </div>
                    <div className='catalog-list'>
                        {boxes.map((box, key) => <BoxCard key={key} box={box}/>)}
                    </div>
                    <div className='next-page'>
                        <img alt="next-arrow" src={process.env.PUBLIC_URL + '/img/next-arrow.svg'}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentPage: state.filters.currentPage,
        totalPages: state.filters.totalPages,
        boxes: state.boxes.list,
        isBoxesPending: state.boxes.isPending
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogList);