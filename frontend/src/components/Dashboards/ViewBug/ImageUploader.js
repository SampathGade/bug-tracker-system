import React, { useState } from 'react';

function ImageUploader({ onUpload, onUploadStart }) {
    const [imageFiles, setImageFiles] = useState([]);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Bug-tracker');

        const response = await fetch(`https://api.cloudinary.com/v1_1/dvuycranr/image/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        return data.secure_url;
    };

    const handleFileChange = async (event) => {
        const files = event.target.files;
        onUploadStart(); // Notify that the upload process has started
        const urls = await Promise.all(Array.from(files).map(file => uploadImage(file)));
        setImageFiles(urls);
        onUpload(urls);
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            {imageFiles.map(url => (
                <img key={url} src={url} alt="Uploaded" style={{ width: 100, height: 100 }} />
            ))}
        </div>
    );
}

export default ImageUploader;
