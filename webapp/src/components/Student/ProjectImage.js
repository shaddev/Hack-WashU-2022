import React from "react";

const ProjectImage = (props) => {
  
    const [uploadedImage, setUploadedImage] = props.uploadedImageAttributes
    console.log(uploadedImage)

    return (
        <div>
            <h1>Upload Image</h1>
            {uploadedImage && (
                <div>
                <img alt="not found" width={"250px"} src={URL.createObjectURL(uploadedImage)} />
                <br />
                <button onClick={()=>setUploadedImage(null)}>Remove</button>
                </div>
            )}
            <br />
            
            <br /> 
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                console.log(event.target.files[0]);
                setUploadedImage(event.target.files[0]);
                }}
            />
        </div>
    );
};

export default ProjectImage
