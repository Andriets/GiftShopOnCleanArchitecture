import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector  } from 'redux-form';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import './Catalog.css';

const PriceSlider = styled(Slider)(({ theme }) => ({
    color: "#FA812F",
    height: 6,
    '& .MuiSlider-thumb': {
        '&.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0px 0px 0px 8px rgba(245, 78, 0, 0.3)',
        },
        '&:hover': {
            boxShadow: '0px 0px 0px 14px rgba(245, 78, 0, 0.3)',
        }
    },
    '& .MuiSlider-track': {
        height: 6,
    },
    '& .MuiSlider-rail': {
        color: "#F5D29C",
        borderRadius: "5px"
    },
}));

class CatalogFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            priceRange: null
        }
    }

    OnSubmit = (formData) => {
        const notTagKeys = ["minPrice", "maxPrice", "search"];
        const tagKeys = Object.keys(formData).filter(key => !notTagKeys.includes(key));
        const filtersData = {
            minPrice: formData.minPrice,
            maxPrice: formData.maxPrice,
            tags: []
        };
        tagKeys.forEach(tagKey => {
            if (formData[tagKey]) {
                filtersData.tags.push(this.props.tags.find(tag => tag.tagName === tagKey));
            }            
        });
    }

    OnChangeMinPrice = (event, newValue, prevValue) => {
        newValue = parseInt(newValue);
        const newPriceRange = [this.state.priceRange[1] > newValue ? newValue : this.state.priceRange[1], this.state.priceRange[1]];
        this.setState({
            priceRange: newPriceRange
        });
    }

    OnChangeMaxPrice = (event, newValue, prevValue) => {
        newValue = parseInt(newValue);
        const newPriceRange = [this.state.priceRange[0], this.state.priceRange[0] < newValue ? newValue : this.state.priceRange[0]];
        this.setState({
            priceRange: newPriceRange
        });
    }

    handleChange = (event, newValue) => {
        this.setState({
            priceRange: newValue
        });

        this.props.change('minPrice', newValue[0]);
        this.props.change('maxPrice', newValue[1]);
    }

    renderCheckBox = (props) => {
        const { change, checkboxes } = this.props;
        const checkBoxColor = {
            color: "#FA812F",
            "&.Mui-checked": {
                color: "#FA812F"
            }
        }
        
        const value = checkboxes && checkboxes[props.input.name] ? !checkboxes[props.input.name] : true;
        return <FormControlLabel 
                    onClick={() => {change(props.input.name, value)}} 
                    control={<Checkbox sx={checkBoxColor}/>} 
                    label={props.input.name} />
    }

    render() {
        const { handleSubmit, initialValues, tags } = this.props;
        const priceRangeVelue = this.state.priceRange ? this.state.priceRange : [initialValues.minPrice, initialValues.maxPrice];
        
        return (
            <div className="filters-form-container">
                <form className="filters-form" onSubmit={handleSubmit(this.OnSubmit)} autoComplete="off">
                    <div className="search-input">
                        <Field name="search" placeholder="Search" component="input" />
                    </div>
                    <div className="price-filter-container">
                        <div className="price-filter">
                            <Field name="minPrice" onChange={this.OnChangeMinPrice} component="input"/>
                            <span>&#8211;</span>
                            <Field name="maxPrice" onChange={this.OnChangeMaxPrice} component="input"/>
                            <button type="submit">
                                OK
                            </button>
                        </div>
                        <Box className="price-slider">
                            <PriceSlider
                                getAriaLabel={() => 'Price range'}
                                value={priceRangeVelue}
                                onChange={this.handleChange}
                                min={initialValues.minPrice}
                                max={initialValues.maxPrice}
                                disableSwap
                            />
                        </Box>
                    </div>
                    <div className="categories-container">
                        <h4 className="">
                            Categories
                        </h4>
                        <div className="categories">
                            {tags.map((tag, key) => {
                                return <Field
                                    key={key}
                                    name={tag.tagName}
                                    id={tag.id}
                                    component={this.renderCheckBox}
                                    type="checkbox"/>
                            })
                            }
                        </div>
                    </div>
                    
                    
                </form>
            </div>
        );
    }
}

CatalogFilters = reduxForm({
    form: "filters-form"
})(CatalogFilters);

const selector = formValueSelector("filters-form");
const mapStateToProps = state => {
    const checkboxes = {};
    state.tags.list.forEach(tag => {
        checkboxes[tag.tagName] = selector(state, tag.tagName);
    });

    return {
        checkboxes,
        tags: state.tags.list,
        initialValues: {
            minPrice: 0,
            maxPrice: 520
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogFilters);