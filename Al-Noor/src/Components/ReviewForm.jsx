import React, { useState } from "react";
import './ReviewForm.css';  // Include the external CSS file for styling

const ReviewForm = ({ onSubmitReview }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderNumber.trim() && review.trim()) {
      onSubmitReview({ orderNumber, review });
      setOrderNumber(""); // Clear fields after submission
      setReview("");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="review-form-container">
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="orderNumber">Order Number:</label>
          <input
            type="text"
            id="orderNumber"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter your order number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
