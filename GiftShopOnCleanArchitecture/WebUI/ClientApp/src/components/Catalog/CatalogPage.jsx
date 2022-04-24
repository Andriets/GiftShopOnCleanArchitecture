import React, { Component } from 'react';
import { connect } from 'react-redux';
import CatalogFilters from './CatalogFilters';
import CatalogList from './CatalogList';
import { GetAllTags } from '../AdminPanel/Tags/TagAction';
import { GetBasicFiltersInfo, GetAllBoxes } from '../AdminPanel/Boxes/BoxAction';
import './Catalog.css';


class CatalogPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllTags("");
        this.props.getBasicFiltersInfo();
        this.props.getAllBoxes({page: 1, pageSize: 6, keyWord: ""});
    }

    render() {
        return (
            <div className='catalog-page'>
               <div className='page-name'>
                    <h3>Catalog</h3>
                </div>
                <div className='catalog-content'>
                    <CatalogFilters />
                    <CatalogList />
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
        getAllTags: (keyWord) => dispatch(GetAllTags(keyWord)),
        getBasicFiltersInfo: () => dispatch(GetBasicFiltersInfo()),
        getAllBoxes: (filtersData) => dispatch(GetAllBoxes(filtersData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogPage);