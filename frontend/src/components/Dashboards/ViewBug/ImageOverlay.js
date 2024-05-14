import React from 'react';
import './ImageOverlay.css'; // Ensure you have appropriate styles for the overlay

const ImageOverlay = ({ image, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="image-overlay" onClick={handleOverlayClick}>
            <div className="image-overlay-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={image} alt="Overlay" className="overlay-image" />
            </div>
        </div>
    );
};

export default ImageOverlay;
