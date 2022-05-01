import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
    }

    onSubmit = (formData) => {
        const { box } = this.props;
        const commentMessage = {
            rating: this.state.rating,
            message: formData.commentMessage
        }
        console.log(commentMessage);
        this.closeModal();
    }

    closeModal = () => {
        this.props.handleClose(false);
        this.props.reset();
    }

    onChangeRating = (event, newRating) => {
        this.setState({
            rating: newRating
        });
    }

    render() {
        const { isOpen, handleSubmit } = this.props;

        return (
            <Modal open={isOpen} onClose={this.closeModal}>
                <Box className="modal-box">
                    <form className="commentForm" onSubmit={handleSubmit(this.onSubmit)} autoComplete="off">
                        <div className="commentForm-fields">
                            <Rating onChange={this.onChangeRating} className="custom-large-adjust" name="half-rating" precision={0.1} size="large"/>
                            <Field name="commentMessage" placeholder="Comment" component="textarea"/>
                        </div>
                        <div className="commentForm-actions">
                            <button onClick={this.closeModal}>Cancel</button>   
                            <button type="submit">Submit</button>   
                        </div>   
                    </form>
                </Box>
            </Modal>
        );
    }
}

CommentModal = reduxForm({
    form: "comment-form",
    enableReinitialize: true
})(CommentModal);
  
const mapStateToProps = state => {
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
)(CommentModal);