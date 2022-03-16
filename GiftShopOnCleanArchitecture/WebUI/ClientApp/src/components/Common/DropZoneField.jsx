import React from "react";
import DropZone from "react-dropzone";

const DropZoneField = ({
    handleOnDrop,
    input: { onChange },
    imagefile,
    meta: { error, touched }
}) => { 
    return (
        <DropZone
            accept="image/jpeg, image/png, image/gif, image/bmp"
            className="upload-container"
            onDrop={file => handleOnDrop(file, onChange)}
            multiple={false}
        >
        {({getRootProps, getInputProps}) => (
            <section>
                <div className='photo-background' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src={imagefile.preview ? imagefile.preview : process.env.PUBLIC_URL + '/img/userIcon.png'}/>
                </div>
            </section>
        )}
        </DropZone>
    );
}


export default DropZoneField;