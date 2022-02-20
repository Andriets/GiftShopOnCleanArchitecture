import React, { Component } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from '@material-ui/core';
import './Profile.css';

export default class LogOutModal extends Component {
    constructor(props) {
        super(props);

        this.handleOnLogOut = this.handleOnLogOut.bind(this);
    }

    handleOnLogOut = () => {
        localStorage.clear();
        window.location.replace(`/login`);
    }

    render() {
        const { isOpen, message, handleShow } = this.props;
        
        return (
            <Dialog open={isOpen}>
                <DialogContent>
                    <div className="logOutMessage">
                        {message}
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
                        type="button"
                        value="Login"
                        color="primary"
                        onClick={() => this.handleOnLogOut()}
                    >
                        Log Out
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}