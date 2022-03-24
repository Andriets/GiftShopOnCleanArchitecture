import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { CreateBox, EditBox, SetBoxImage } from './BoxAction';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from 'react-select';
import DropZoneField from "../../Common/DropZoneField";
import '../Admin.css';

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

class BoxModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            checked: false
        }
    }

    onSubmit = (formData) => {
        const boxData = {
            ...formData,
            tags: this.state.tags
        }
        if (this.props.editMode) {
            boxData.id = this.props.initialValues.id;
            this.props.editBox(boxData);
        } else {
            this.props.createBox(boxData);
        }
    }

    handleInputChange = (newValue) => {
        this.setState({
            tags: newValue
        })
    }

    handleOnDrop = (newImageFile, onChange) => {
        if (newImageFile.length > 0) {
            const imagefile = {
                file: newImageFile[0],
                name: newImageFile[0].name,
                preview: URL.createObjectURL(newImageFile[0]),
                size: 1
            };
            this.props.setBoxImage(imagefile);
            onChange(imagefile);
        }
    };

    closeModal = () => {
        this.props.setBoxImage({});
        this.props.handleClose(false);
    }

    MultiSelect = () => (
        <Select 
            name="tags"
            options={this.props.tagsList} 
            isMulti 
            onChange={this.handleInputChange} 
            defaultValue={this.props.initialTags} 
            className="tags-multi-select"
            classNamePrefix="select"/>
    )

    render() {
        const { isOpen, editMode, handleSubmit, submitError, imagefile, initialValues } = this.props;

        if (editMode && !imagefile.preview) {
            const contentType = 'image/png';
            const blob = b64toBlob(initialValues.photoBytes.img, contentType);
            const blobUrl = URL.createObjectURL(blob);
            imagefile.preview = blobUrl;
        }
        return (
            <Modal open={isOpen} onClose={() => this.closeModal()}>
                <Box className="modal-box">
                    <form className="boxInfoForm" onSubmit={handleSubmit(this.onSubmit)} autoComplete="off">
                        <div className="boxInfoForm-photo">
                            <Field
                                id="image-field"
                                name="image"
                                component={DropZoneField}
                                type="file"
                                imagefile={imagefile}
                                handleOnDrop={this.handleOnDrop}
                            />
                        </div>
                        <div className="boxInfoForm-fields">
                            <Field name="title" placeholder="Title" component="input" />
                            <Field name="price" placeholder="Price" component="input" />
                            <Field name="description" placeholder="Description" component="textarea"/>
                            <Field name="tags" component={this.MultiSelect}/>
                        </div>
                        {submitError && <p>Error</p>}
                        <div className="boxInfoForm-actions">
                            <button onClick={() => this.closeModal()}>Cancel</button>  
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
    });
    const initialTags = state.boxModal?.initialValues?.tags?.map(t => {
        return {
            id: t.id,
            value: t.tagName,
            label: t.tagName.toLowerCase()
        }
    });
    return {
        isTagsPending: state.tags.isPending,
        tagsList: tags,
        initialTags: initialTags,
        editMode: state.boxModal.editMode,
        submitError: state.addBox.addBoxError,
        imagefile: state.boxModal.imagefile,
        initialValues: state.boxModal.initialValues
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createBox: (boxData) => dispatch(CreateBox(boxData)),
        editBox: (boxData) => dispatch(EditBox(boxData)),
        setBoxImage: (imageFile) => dispatch(SetBoxImage(imageFile))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoxModal);