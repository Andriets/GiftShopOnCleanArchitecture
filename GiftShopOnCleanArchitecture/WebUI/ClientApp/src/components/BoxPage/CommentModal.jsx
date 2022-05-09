import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { AddBoxComment, SetBoxRating } from '../AdminPanel/Boxes/BoxAction'
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
        const { addBoxComment, setBoxRating, userId, box } = this.props;

        if (this.state.rating > 0) {
            const boxRating = {
                userId,
                boxId: box.id,
                score: this.state.rating
            };
            setBoxRating(boxRating);
        }

        if (formData.commentMessage) {
            const boxComment = {
                userId,
                boxId: box.id,
                commentText: formData.commentMessage
            };
            addBoxComment(boxComment);
        }

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
                            <Rating onChange={this.onChangeRating} className="custom-large-adjust commentForm-rating" name="half-rating" precision={0.1} size="large"/>
                            <Field className="comment-textarea" name="commentMessage" placeholder="Comment" component="textarea"/>
                        </div>
                        <div className="commentForm-actions">
                            <button onClick={this.closeModal}>
                                <span>Cancel</span>
                            </button>   
                            <button type="submit">
                                <span>Submit</span>
                            </button>   
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
        addBoxComment: (boxComment) => dispatch(AddBoxComment(boxComment)),
        setBoxRating: (boxRating) => dispatch(SetBoxRating(boxRating))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentModal);