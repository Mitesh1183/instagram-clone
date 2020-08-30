import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import axios from 'axios'

const ProfilePhotoUpload = ({id}) => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [successUploadphoto, setSuccessUploadphoto] = useState(false);
  const [url, setUrl] = useState('');

  const selectFile = (event) => {
   if (event.target.files[0]) {
      setSelectedFiles(event.target.files[0]);
    }
  };
const handleUpload =  () => {
    const uploadTask = storage.ref(`profilephoto/${id}/${selectedFiles.name}`).put(selectedFiles);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
         storage
          .ref("images")
          .child(selectedFiles.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url)
            setSuccessUploadphoto(true)
          });
      }
    );

  };

  return (
    <div>
      
        <div className="progress">
          <progress value={progress} max="100" />
        </div>
      

      <label className="btn btn-default">
        <input type="file" name='file' onChange={selectFile} />
      </label>

      <button
        className="btn btn-success"
        disabled={!selectedFiles}
        onClick={handleUpload}
      >
        Upload
      </button>

     
      <div>
        <div>List of Files</div>
        <ul>
          {url}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;