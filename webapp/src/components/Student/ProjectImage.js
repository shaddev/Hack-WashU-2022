import React, {useEffect} from "react";

const ProjectImage = (props) => {
  
    const [uploadedImage, setUploadedImage] = props.uploadedImageAttributes
    
    console.log(uploadedImage)

    const onChangeUploadedImage = (event) => {
        blobToBase64(event.target.files[0])
                            .then(generatedBase64Image => {
                                console.log(generatedBase64Image)
                                setUploadedImage(generatedBase64Image)
                            })

    }

    const blobToBase64 = (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };

    return (
        <div>
            <h1>Upload Image</h1>
            {uploadedImage && (
                <div>
                <img alt="not found" width={"250px"} src={uploadedImage} />
                <br />
                <button onClick={()=>setUploadedImage(null)}>Remove</button>
                </div>
            )}
            <br />
            
            <br /> 
            <input
                type="file"
                name="myImage"
                onChange={onChangeUploadedImage}
            />
        </div>
    );
};

export default ProjectImage
