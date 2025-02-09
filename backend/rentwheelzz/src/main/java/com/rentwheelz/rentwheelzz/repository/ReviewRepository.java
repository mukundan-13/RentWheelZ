package com.rentwheelz.rentwheelzz.repository;

import com.rentwheelz.rentwheelzz.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByVehicleId(Long vehicleId); 
    List<Review> findByUserId(Long userId); 
    List<Review> findByBookingId(Long bookingId); 
    boolean existsByVehicleIdAndUserId(Long vehicleId, Long userId); 
    boolean existsByBookingId(Long bookingId); 
}
