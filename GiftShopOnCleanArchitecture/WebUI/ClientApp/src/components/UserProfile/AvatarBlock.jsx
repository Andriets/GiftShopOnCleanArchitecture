import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { UpdateUserPhoto, ChangePassword } from './UserAction';
import LogOutModal from './LogOutModal';
import ChangePasswordModal from './ChangePasswordModal';
import './Profile.css';


class AvatarBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogOutModal: false,
            showChangePasswordModal: false,
        }

        this.handleOnChangePasswordClick = this.handleOnChangePasswordClick.bind(this);
        this.handleOnLogOutClick = this.handleOnLogOutClick.bind(this);
    }

    handleOnDrop = (newImageFile) => {
        if(newImageFile.length > 0){
            const reader = new FileReader();
            reader.onload = (event) => {
                const userInfo = Object.assign({}, this.props.userInfo);

                userInfo.photo.img = event.target.result;
                userInfo.photoBytes = newImageFile[0];
                this.props.updateUserPhoto(userInfo);
            };
            reader.readAsDataURL(newImageFile[0]);
        }
    };

    handleChangePasswordSubmit = (formData) => {
        formData.userId = this.props.userInfo.id;
        this.props.changePassword(formData);
        this.setState({
            showChangePasswordModal: false
        })
    }

    handleOnChangePasswordClick = (show) => {
        this.setState({
            showChangePasswordModal: show
        })
    }

    handleOnLogOutClick = (show) => {
        this.setState({
            showLogOutModal: show
        })
    }

    render() {
        const { userInfo } = this.props;
        return (
            <div className='avatar-block'>
                <Dropzone onDrop={acceptedFiles => this.handleOnDrop(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className='photo-background' {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img src={userInfo.photo?.img ? userInfo.photo.img : process.env.PUBLIC_URL + '/img/userIcon.png'}/>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <button onClick={() => this.handleOnChangePasswordClick(true)}>
                    Change Password
                </button>
                <ChangePasswordModal isOpen={this.state.showChangePasswordModal} handleShow={this.handleOnChangePasswordClick} onSubmit={this.handleChangePasswordSubmit}/>
                <button onClick={() => this.handleOnLogOutClick(true)}>
                    Log Out
                </button>
                <LogOutModal isOpen={this.state.showLogOutModal} message={"Do you really want to Log Out?"} handleShow={this.handleOnLogOutClick}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let userInfo = state.user;
    userInfo.isAuthenticated = !!localStorage.getItem("JwtToken");
    return {
        userInfo: userInfo,
        disabled: state.disabled
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUserPhoto: (userInfo) => dispatch(UpdateUserPhoto(userInfo)),
        changePassword: (changePasswordData) => dispatch(ChangePassword(changePasswordData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvatarBlock);