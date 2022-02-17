import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Profile.css';

export default class AvatarBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagefile: []
        }
    }

    handleOnDrop = (newImageFile, onChange) => {
        if(newImageFile.length > 0){
            const reader = new FileReader();
            reader.onload = (event) => {
                this.setState({
                    imagefile: {
                        preview: event.target.result
                    }
                });
            };
            reader.readAsDataURL(newImageFile[0]);
            const imagefile = {
                file: newImageFile[0],
                name: newImageFile[0].name,
                preview: reader.result,
                size: 1
            };
            //this.setState({ imagefile: [imagefile] }, () => onChange(imagefile));
        }
    };

    render() {
        console.log(this.state.imagefile.preview);
        return (
            <div className='avatar-block'>
                {/* <img src={process.env.PUBLIC_URL + '/img/userIcon.png'}/> */}
                <Dropzone onDrop={acceptedFiles => this.handleOnDrop(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className='photo-background' {...getRootProps()}>
                                <input {...getInputProps()} />
                                <img src={this.state.imagefile.preview ? this.state.imagefile.preview : process.env.PUBLIC_URL + '/img/userIcon.png'}/>
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