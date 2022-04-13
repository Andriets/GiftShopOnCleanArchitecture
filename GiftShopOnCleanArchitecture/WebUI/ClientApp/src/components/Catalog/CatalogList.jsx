import { ThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetAllBoxes } from '../AdminPanel/Boxes/BoxAction';
import BoxCard from './BoxCard';

class CatalogList extends Component {
    constructor(props) {
        super(props);
    }

    OnNextPage = () => {
        const { currentPage, totalPages } = this.props;

        if (currentPage !== totalPages) {
            const filtersData = {
                page: currentPage + 1,
                pageSize: 6,
                keyWord: "",
                minPrice: this.props.filters.minPrice,
                maxPrice: this.props.filters.maxPrice
            }

            this.props.getAllBoxes(filtersData);
        }
    }

    OnPrevPage = () => {
        const { currentPage, totalPages } = this.props;

        if (currentPage !== 1) {
            const filtersData = {
                page: currentPage - 1,
                pageSize: 6,
                keyWord: "",
                minPrice: this.props.filters.minPrice,
                maxPrice: this.props.filters.maxPrice
            }

            this.props.getAllBoxes(filtersData);
        }
    }

    render() {
        const { currentPage, totalPages, boxes, isBoxesPending } = this.props;
        
        return (
            <div className='catalog-right'>
                <div className='filters-info'>
                    <span>{`${currentPage ? currentPage : 1} of ${totalPages}`}</span>
                </div>
                <div className='catalog-list-content'>
                    <div className='prev-page' onClick={this.OnPrevPage}>
                        <img alt="prev-arrow" src={process.env.PUBLIC_URL + '/img/prev-arrow.svg'} />
                    </div>
                    <div className='catalog-list'>
                        {boxes.map((box, key) => <BoxCard key={key} box={box}/>)}
                    </div>
                    <div className='next-page' onClick={this.OnNextPage}>
                        <img  alt="next-arrow" src={process.env.PUBLIC_URL + '/img/next-arrow.svg'}/>
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
        isBoxesPending: state.boxes.isPending,
        filters: state.filters
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBoxes: (filtersData) => dispatch(GetAllBoxes(filtersData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogList);