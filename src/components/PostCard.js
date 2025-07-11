import React from 'react';
import './PostCard.css';

function PostCard({ post }) {
  const imageUrl = post.medium_image?.url || post.small_image?.url;
  const publishDate = new Date(post.published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="card post-card shadow-sm">
      <img
        src={imageUrl}
        alt={post.title}
        loading="lazy"
        className="card-img-top post-thumbnail"
      />
      <div className="card-body">
        <p className="post-date">{publishDate}</p>
        <h5 className="post-title">{post.title}</h5>
      </div>
    </div>
  );
}

export default PostCard;
