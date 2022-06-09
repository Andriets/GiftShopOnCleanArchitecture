import React, { Component } from "react";
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { OrderStatus } from "../Common/Enums/OrderStatus";
import { UpdateOrderStatus } from "../Cart/OrderAction";
import './Board.css';


class OrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
        }
    }

    handleChangeRole = (event) => {
        this.setState({
            status: event.target.value
        });

        const { orderId, updateOrderStatus, handleClose } = this.props;

        const orderStatusInfo = {
            orderId: orderId,
            newOrderStatus: event.target.value
        };
        updateOrderStatus(orderStatusInfo);
        handleClose();
    }

    render() {
        const { isOpen, handleClose, userName, phoneNumber, destination, orderStatus, boxes } = this.props;

        return (
            <Modal open={isOpen} onClose={handleClose}>
                <Box className="order-box">
                    <div className="order-modal-box-list" key={"0"}>
                        <div className="order-modal-box-item">
                            <b>Box</b>
                            <b>Qunatity</b>
                        </div>
                        {boxes?.map(box => <>
                            <div className="order-modal-box-item" key={box.id}>
                                <span>{box.title}</span>
                                <span>{box.quantity}</span>
                            </div>
                        </>)}
                    </div>
                    <div className="order-modal-user-info">
                        <b>User Info:</b>
                        <span>{userName}</span>
                        <span>{phoneNumber}</span>
                        <span>{destination}</span>
                        <b>Status:</b>
                        <FormControl className="order-modal-order-status" variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                value={this.state.status ?? orderStatus}
                                onChange={this?.handleChangeRole}
                                label="Role">
                                <MenuItem value={OrderStatus.TODO}>TO DO</MenuItem>
                                <MenuItem value={OrderStatus.IN_PROGRESS}>IN PROGRESS</MenuItem>
                                <MenuItem value={OrderStatus.DONE}>DONE</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>
            </Modal>
        );
    }
}
  
const mapStateToProps = (state, props) => {
    const { order } = props;
    const userName = order?.userName;
    const phoneNumber = order?.phoneNumber;
    const destination = `${order?.region} ${order?.city}, №${order?.postOffice}`;
    const orderStatus = order?.orderStatus;
    const boxes = order?.boxes;
    return {
        orderId: order?.id,
        userName,
        phoneNumber,
        destination,
        orderStatus,
        boxes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateOrderStatus: (orderStatusInfo) => dispatch(UpdateOrderStatus(orderStatusInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderModal);