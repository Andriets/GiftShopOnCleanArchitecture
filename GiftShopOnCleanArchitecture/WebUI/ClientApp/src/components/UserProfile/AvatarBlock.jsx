import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { UpdateUserPhoto } from './UserAction';
import './Profile.css';

export default class AvatarBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagefile: { }
        }
    }

    handleOnDrop = (newImageFile) => {
        if(newImageFile.length > 0){
            const reader = new FileReader();
            reader.onload = (event) => {
                UpdateUserPhoto({ id: this.props.userInfo.id, photo: newImageFile[0]});
                this.setState({
                    imagefile: {
                        preview: event.target.result
                    }
                });
            };
            reader.readAsDataURL(newImageFile[0]);
        }
    };

    render() {
        return (
            <div className='avatar-block'>
                <Dropzone onDrop={acceptedFiles => this.handleOnDrop(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className='photo-background' {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img src={this.props.userInfo.photo?.img ? "data:image/png;base64," + this.props.userInfo.photo.img : process.env.PUBLIC_URL + '/img/userIcon.png'}/>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <button>
                    Change Password
                </button>
                <button>
                    Log Out
                </button>
            </div>
        );
    }
}