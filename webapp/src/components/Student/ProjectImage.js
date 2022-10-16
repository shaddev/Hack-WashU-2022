import React, {useEffect} from "react";

const ProjectImage = (props) => {
  
    const [uploadedImage, setUploadedImage] = props.uploadedImageAttributes
    const [base64Image, setBase64Image] = props.base64ImageAttributes
    
    console.log(uploadedImage)

    useEffect(() => {
        if(uploadedImage){
                blobToBase64(uploadedImage)
                            .then(generatedBase64Image => {
                                console.log(generatedBase64Image)
                                setBase64Image(generatedBase64Image)
                            }
                            )
                }
     }, [uploadedImage]);

    const onChangeUploadedImage = (event) => {
        console.log(uploadedImage)
        setUploadedImage(event.target.files[0]);
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
                <img alt="not found" width={"250px"} src={base64Image} />
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
