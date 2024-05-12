import React, { useState } from 'react';

function ImageUploader({ onUpload }) {
    const [imageFiles, setImageFiles] = useState([]);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'YOUR_UNSIGNED_PRESET_NAME');

        const response = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        return data.secure_url;
    };

    const handleFileChange = async (event) => {
        const files = event.target.files;
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
