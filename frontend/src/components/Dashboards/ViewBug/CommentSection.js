import React, { useState } from 'react';
import ImageUploader from './ImageUploader';  // Assuming you have this component set up for Cloudinary uploads
import ImageOverlay from './ImageOverlay';  // Import the ImageOverlay component

function CommentSection({ bugId, comments }) {
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(comments);
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState('');
    const [editImageUrls, setEditImageUrls] = useState([]);
    const userEmail = localStorage.getItem('userEmail')

    const handleAddComment = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/comments/${bugId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newComment, author: userEmail, imageUrls, id: commentList.length })
        });
        if (response.ok) {
            const updatedBug = await response.json();
            setCommentList(updatedBug.comments);
            setNewComment('');
            setImageUrls([]); // Reset image URLs after posting
        } else {
            alert('Failed to post comment');
        }
        setIsLoading(false);
    };

    const handleUpdateComment = async (commentId) => {
        setIsLoading(true);
        const response = await fetch(`/api/comments/${bugId}/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: editText, imageUrls: editImageUrls })
        });
        if (response.ok) {
            const updatedBug = await response.json();
            setCommentList(updatedBug.comments);
            setEditingComment(null);
            setEditText('');
            setEditImageUrls([]);
        } else {
            alert('Failed to update comment');
        }
        setIsLoading(false);
    };

    const handleDeleteComment = async (commentId) => {
        setIsLoading(true);
        const response = await fetch(`/api/comments/${bugId}/${commentId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const updatedBug = await response.json();
            setCommentList(updatedBug.comments);
        } else {
            alert('Failed to delete comment');
        }
        setIsLoading(false);
    };

    const handleImageUpload = (urls) => {
        setImageUrls(urls);
        setIsUploading(false);
    };

    const handleEditImageUpload = (urls) => {
        setEditImageUrls([...editImageUrls, ...urls]);
        setIsUploading(false);
    };

    const handleImageUploadStart = () => {
        setIsUploading(true);
    };

    const handleImageUploadReset = () => {
        setImageUrls([]);  // Reset image URLs after posting
    };

    const handleImageClick = (url) => {
        setSelectedImage(url);
    };

    const handleCloseOverlay = () => {
        setSelectedImage(null);
    };

    const startEditing = (comment) => {
        setEditingComment(comment.id);
        setEditText(comment.text);
        setEditImageUrls(comment.imageUrls);
    };

    const handleDeleteEditImage = (url) => {
        setEditImageUrls(editImageUrls.filter(imageUrl => imageUrl !== url));
    };

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddComment();
                handleImageUploadReset();  // Reset image uploader
            }}>
                <textarea 
                    placeholder="Enter your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px' }}
                    required
                />
                <ImageUploader 
                    onUpload={(urls) => handleImageUpload(urls)}
                    onUploadStart={handleImageUploadStart}
                    resetUploader={imageUrls.length === 0} // Pass a prop to reset the uploader
                />
                <button type="submit" disabled={isLoading || isUploading}>
                    {isLoading ? 'Adding Comment...' : 'Add Comment'}
                </button>
            </form>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {commentList.map((comment, index) => (
                    <div key={comment.id || index}>
                        {editingComment === comment.id ? (
                            <div>
                                <textarea 
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                    required
                                />
                                <div>
                                    {editImageUrls.map((url, idx) => (
                                        <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                                            <img 
                                                src={url} 
                                                alt="Edit" 
                                                style={{ width: '100px', height: 'auto', margin: '5px', cursor: 'pointer' }}
                                                onClick={() => handleImageClick(url)}
                                            />
                                            <button 
                                                onClick={() => handleDeleteEditImage(url)}
                                                style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer' }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <ImageUploader 
                                    onUpload={(urls) => handleEditImageUpload(urls)}
                                    onUploadStart={handleImageUploadStart}
                                    resetUploader={editImageUrls.length === 0} // Pass a prop to reset the uploader
                                />
                                <button onClick={() => handleUpdateComment(comment.id)} disabled={isLoading || isUploading}>
                                    {isLoading ? 'Updating Comment...' : 'Update Comment'}
                                </button>
                                <button onClick={() => setEditingComment(null)} disabled={isLoading}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p>{comment.author}: {comment.text}</p>
                                {comment.imageUrls && comment.imageUrls.map((url, idx) => (
                                    <img 
                                        key={idx} 
                                        src={url} 
                                        alt="Comment" 
                                        style={{ width: '100px', height: 'auto', margin: '5px', cursor: 'pointer' }} 
                                        onClick={() => handleImageClick(url)}
                                    />
                                ))}
                                <button onClick={() => startEditing(comment)}>Edit</button>
                                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedImage && <ImageOverlay image={selectedImage} onClose={handleCloseOverlay} />}
        </div>
    );
}

export default CommentSection;
