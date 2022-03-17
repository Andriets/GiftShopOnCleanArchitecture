import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { CreateBox } from './BoxAction';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from 'react-select';
import DropZoneField from "../../Common/DropZoneField";
import '../Admin.css';


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
        const boxData = {
            ...formData,
            tags: this.state.tags
        }
        console.log(boxData);
        this.props.createBox(boxData)
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
            options={this.props.tagsList} 
            isMulti 
            onChange={this.handleInputChange} 
            defaultValue={this.props.selectedTags} 
            className="tags-multi-select"
            classNamePrefix="select"/>
    )

    render() {
        const { isOpen, handleClose, handleSubmit, submitError } = this.props;
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
                        {submitError && <p>Error</p>}
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
    const tags = state.tags.list.map(t => {
        return {
            id: t.id,
            value: t.tagName,
            label: t.tagName.toLowerCase()
        }
    })
    return {
        isTagsPending: state.tags.isPending,
        tagsList: tags,
        submitError: state.addBox.addBoxError
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createBox: (boxData) => dispatch(CreateBox(boxData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxModal);