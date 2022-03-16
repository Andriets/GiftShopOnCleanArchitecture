import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from 'react-select';
import DropZoneField from "../../Common/DropZoneField";
import '../Admin.css';

const options = [
    { id: 1, value: 'chocolate', label: 'Chocolate', isSelected: true },
    { id: 2, value: 'strawberry', label: 'Strawberry' },
    { id: 3, value: 'vanilla', label: 'Vanilla' },
    { id: 4, value: 'vanilla1', label: 'Vanilla1' },
    { id: 5, value: 'vanilla2', label: 'Vanilla2' },
    { id: 6, value: 'vanilla3', label: 'Vanilla3' },
    { id: 7, value: 'vanilla4', label: 'Vanilla4' },
]

const selectedOptions = [
    { id: 2, value: 'strawberry', label: 'Strawberry' },
    { id: 3, value: 'vanilla', label: 'Vanilla' }
]

class BoxModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            imagefile: {},
            checked: false
        }
    }

    onSubmit = (formData) => {
        debugger;
        const test = {
            ...formData,
            tags: this.state.tags
        }
        console.log(test);
    }

    handleInputChange = (newValue, wtf) => {
        console.log(newValue, wtf)
        this.setState({
            tags: newValue
        })
    }

    handleOnDrop = (newImageFile, onChange) => {
        debugger;
        if (newImageFile.length > 0) {
            const imagefile = {
                file: newImageFile[0],
                name: newImageFile[0].name,
                preview: URL.createObjectURL(newImageFile[0]),
                size: 1
            };
            this.setState({ imagefile: imagefile }, () => onChange(imagefile));
        }
    };

    MultiSelect = () => (
        <Select 
            name="tags"
            options={options} 
            isMulti 
            onChange={this.handleInputChange} 
            defaultValue={selectedOptions} 
            className="tags-multi-select"
            classNamePrefix="select"/>
    )

    render() {
        const { isOpen, handleClose, handleSubmit } = this.props;
        console.log(this.props);
        return (
            <Modal open={isOpen} onClose={() => handleClose(false)}>
                <Box className="modal-box">
                    <form className="userInfoForm" onSubmit={handleSubmit(this.onSubmit)}>
                        <div className="userInfoForm-photo">
                            <Field
                                id="image-field"
                                name="image"
                                component={DropZoneField}
                                type="file"
                                imagefile={this.state.imagefile}
                                handleOnDrop={this.handleOnDrop}
                            />
                        </div>
                        <div className="userInfoForm-fields">
                            <Field name="title" placeholder="Title" component="input" />
                            <Field name="price" placeholder="Price" component="input" />
                            <Field name="description" placeholder="Description" component="textarea"/>
                            <Field name="tags" component={this.MultiSelect}/>
                        </div>
                        <div className="userInfoForm-actions">
                            <button onClick={() => handleClose(false)}>Cancel</button>  
                            <button type="submit">Submit</button>   
                        </div>   
                    </form>
                </Box>
            </Modal>
        );
    }
}

BoxModal = reduxForm({
    form: "box-form",
    enableReinitialize: true
})(BoxModal);
  
const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxModal);