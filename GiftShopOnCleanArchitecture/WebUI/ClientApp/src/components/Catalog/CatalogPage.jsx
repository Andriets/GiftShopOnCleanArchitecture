import React, { Component } from 'react';
import { connect } from 'react-redux';
import CatalogFilters from './CatalogFilters';
import { GetAllTags } from '../AdminPanel/Tags/TagAction';
import './Catalog.css';


class CatalogPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllTags("");
    }

    render() {
        return (
            <div className='catalog-page'>
               <div className='page-name'>
                    <h3>Catalog</h3>
                </div>
                <div className='catalog-content'>
                    <CatalogFilters />
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogPage);