import React, { useState, useEffect } from 'react';
import { FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getReviews, createReview, deleteReview } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const StarInput = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button" onClick={() => onChange(star)}
        className="focus:outline-none transition-transform hover:scale-110">
        <FiStar
          size={24}
          className={star <= value ? 'text-yellow-400' : 'text-gray-600'}
          fill={star <= value ? 'currentColor' : 'none'}
        />
      </button>
    ))}
  </div>
);

const StarDisplay = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <FiStar
        key={star}
        size={14}
        className={star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'}
        fill={star <= Math.round(rating) ? 'currentColor' : 'none'}
      />
    ))}
  </div>
);

const ReviewSection = ({ productId, productRating, reviewCount }) => {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ rating: 5, title: '', comment: '' });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews(productId);
        setReviews(res.data.reviews);
      } catch {
        // reviews not critical
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await createReview({ productId, ...form });
      setReviews((prev) => [res.data.review, ...prev]);
      setForm({ rating: 5, title: '', comment: '' });
      setShowForm(false);
      toast.success('Review submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success('Review deleted');
    } catch {
      toast.error('Failed to delete review');
    }
  };

  const ratingBars = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length > 0 ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  return (
    <div className="mt-8">
      <h2 className="font-gaming text-xl font-bold text-white mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="bg-dark-800 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-1">{productRating?.toFixed(1) || '0.0'}</div>
            <StarDisplay rating={productRating || 0} />
            <p className="text-gray-400 text-sm mt-1">{reviewCount || reviews.length} reviews</p>
          </div>
          <div className="flex-grow space-y-2">
            {ratingBars.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-4">{star}</span>
                <FiStar size={12} className="text-yellow-400" fill="currentColor" />
                <div className="flex-grow h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm text-gray-500 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {isAuthenticated && !showForm && (
          <button onClick={() => setShowForm(true)}
            className="mt-4 btn-primary text-sm flex items-center gap-2">
            <FiEdit2 size={14} /> Write a Review
          </button>
        )}
        {!isAuthenticated && (
          <p className="mt-4 text-sm text-gray-400">
            <a href="/login" className="text-purple-400 hover:text-purple-300">Sign in</a> to write a review
          </p>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-dark-800 border border-purple-500/30 rounded-xl p-6 mb-6">
          <h3 className="font-gaming text-sm text-white mb-4">Write Your Review</h3>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Rating</label>
            <StarInput value={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Sum up your review" maxLength={100}
              className="input-gaming" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Review</label>
            <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="Share your experience..." maxLength={1000} rows={4}
              className="input-gaming resize-none" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="btn-primary text-sm">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {loading ? (
        <p className="text-gray-400 text-center py-6">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-400 text-center py-6">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-dark-800 border border-gray-700 rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
                      {review.user?.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="font-semibold text-white text-sm">{review.user?.name}</span>
                  </div>
                  <StarDisplay rating={review.rating} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  {user && user._id === review.user?._id && (
                    <button onClick={() => handleDelete(review._id)}
                      className="text-gray-500 hover:text-red-400 transition-colors">
                      <FiTrash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">{review.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
