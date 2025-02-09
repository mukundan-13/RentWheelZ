package com.rentwheelz.rentwheelzz.service;

import com.rentwheelz.rentwheelzz.model.Review;
import com.rentwheelz.rentwheelzz.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByVehicle(Long vehicleId) {
        return reviewRepository.findByVehicleId(vehicleId);
    }

    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    public List<Review> getReviewsByBooking(Long bookingId) {
        return reviewRepository.findByBookingId(bookingId);
    }

    public Review addReview(Review review) {
        if (reviewRepository.existsByBookingId(review.getBooking().getId())) {
            throw new IllegalArgumentException("Booking already has a review.");
        }
        return reviewRepository.save(review);
    }

    public Review updateReview(Long reviewId, Review updatedReview) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));

        existingReview.setComment(updatedReview.getComment());
        existingReview.setRating(updatedReview.getRating());
        return reviewRepository.save(existingReview);
    }

    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
