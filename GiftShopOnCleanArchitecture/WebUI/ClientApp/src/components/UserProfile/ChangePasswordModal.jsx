import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from '@material-ui/core';
import './Profile.css';

class ChangePasswordModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, handleShow, handleSubmit } = this.props;
        return (
            <Dialog open={isOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <div className="">
                            <div className="inputBox">
                                <Field name="currentPassword" placeholder="Current Password" component="input" type="password" />
                            </div>
                            <div className="inputBox">
                                <Field name="newPassword" placeholder="New Password" component="input" type="password" />
                            </div>
                            <div className="inputBox">
                                <Field name="repeadPassword" placeholder="Repead Password" component="input" type="password" />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            fullWidth={true}
                            type="button"
                            color="primary"
                            onClick={() => handleShow(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth={true}
                            type="submit"
                            value="Save"
                            color="primary"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

ChangePasswordModal = reduxForm({
    form: "change-password-form"
})(ChangePasswordModal);
  
export default ChangePasswordModal;