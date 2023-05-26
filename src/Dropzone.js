import React from "react";
// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone";
import { BsCloudArrowUpFill } from "react-icons/bs";
import Figure from 'react-bootstrap/Figure';
const Dropzone = ({ onDrop, accept,img }) => {
  // Initializing useDropzone hooks with options

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div className="dropzone-div" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {  !img?(isDragActive ? (
          <p className="dropzone-content">Release to drop the files here</p>
        ) : (
          <p className="dropzone-content">
            Drag 'n' drop some files here, or click to select files
            <BsCloudArrowUpFill/>
          </p>
        )
         ): <Figure>  <Figure.Image
        width={"70%"}
        height={"70%"}
        alt="171x180"
        src={img}
      />
      </Figure>
      } 
           </div>
    </div>
  );
};

export default Dropzone;