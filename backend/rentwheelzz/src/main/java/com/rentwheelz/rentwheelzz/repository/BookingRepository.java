package com.rentwheelz.rentwheelzz.repository;

import com.rentwheelz.rentwheelzz.model.Booking;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    @Query("SELECT u.email FROM Booking b JOIN b.user u WHERE b.id = :bookingId")
    String findUserEmailByBookingId(@Param("bookingId") Long bookingId);

    @Query("UPDATE Booking b SET b.status = 'Completed' WHERE b.endDate < CURRENT_DATE AND b.status != 'Completed'")
    @Modifying
    @Transactional
    void updateCompletedBookings();
}
