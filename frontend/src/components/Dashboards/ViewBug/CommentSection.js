import React, { useState } from 'react';
import ImageUploader from './ImageUploader';  // Assuming you have this component set up for Cloudinary uploads

function CommentSection({ bugId, comments }) {
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(comments);
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    console.log(commentList)

    const handleAddComment = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/comments/${bugId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newComment, author: 'currentUserName', imageUrls })
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

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddComment();
            }}>
                <textarea 
                    placeholder="Enter your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px' }}
                    required
                />
                <ImageUploader onUpload={(urls) => setImageUrls(urls)} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding Comment...' : 'Add Comment'}
                </button>
            </form>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {commentList.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.author}: {comment.text}</p>
                        {comment.imageUrls && comment.imageUrls.map((url, idx) => (
                            <img key={idx} src={url} alt="Comment" style={{ width: '100px', height: 'auto', margin: '5px' }} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
