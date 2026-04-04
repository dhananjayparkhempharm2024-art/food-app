import React, { useEffect, useState } from 'react';
import { FaStar, FaTrash, FaRegCommentDots, FaStore, FaUserCircle } from 'react-icons/fa';
import { getAllReviews, deleteReview } from '../api/JsonServerApi'; 
import toast from 'react-hot-toast';

const ReviewsAndFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await getAllReviews();
      setReviews(response.data.data || []);
    } catch (error) {
      toast.error("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this review?")) return;
    try {
      await deleteReview(id);
      toast.success("Review removed");
      fetchReviews();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < rating ? "#ffc107" : "#e4e5e9"} />
    ));
  };

  if (loading) return <div className="loading">Fetching customer feedback...</div>;

  return (
    <div className="reviews-wrapper">
      <header className="page-header">
        <div className="title-section">
          <FaRegCommentDots className="header-icon" />
          <h1>Reviews & Feedback</h1>
        </div>
        <div className="review-stats">
          Total Reviews: <strong>{reviews.length}</strong>
        </div>
      </header>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="user-info">
                  <FaUserCircle className="user-icon" />
                  <div>
                    <h4>{review.customerName || "Anonymous"}</h4>
                    <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="delete-review-btn" onClick={() => handleDelete(review.id)}>
                  <FaTrash />
                </button>
              </div>

              <div className="review-content">
                <div className="rating-row">
                  {renderStars(review.rating)}
                  <span className="rating-number">({review.rating}/5)</span>
                </div>
                <p className="comment-text">"{review.comment}"</p>
              </div>

              <div className="review-footer">
                <FaStore />
                <span>Reviewed: <strong>{review.restaurantName}</strong></span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No reviews have been submitted yet.</div>
        )}
      </div>
    </div>
  );
};

export default ReviewsAndFeedback;