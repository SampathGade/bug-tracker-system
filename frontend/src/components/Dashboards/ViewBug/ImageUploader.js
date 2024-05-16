import React, { useState, useEffect } from "react";

function ImageUploader({ onUpload, onUploadStart, resetUploader }) {
  const [imageFiles, setImageFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (resetUploader) {
      setImageFiles([]);
    }
  }, [resetUploader]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Bug-tracker");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dvuycranr/image/upload`,
      {
        method: "POST",
        body: formData,
        onUploadProgress: (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        },
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    onUploadStart(); // Notify that the upload process has started
    setIsUploading(true); // Set isUploading to true when upload starts
    setProgress(0); // Reset progress to 0 when new upload starts
    const urls = await Promise.all(
      Array.from(files).map((file) => uploadImage(file))
    );
    setImageFiles(urls);
    onUpload(urls);
    setIsUploading(false); // Set isUploading to false when upload ends

    // Clear file input
    event.target.value = null;
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      {isUploading && <progress value={progress} max="100" />}
      {imageFiles.map((url) => (
        <img
          key={url}
          src={url}
          alt="Uploaded"
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid black",
            width: 100,
            height: 100,
            marginRight: "10px",
          }}
        />
      ))}
    </div>
  );
}

export default ImageUploader;
