package com.rentwheelz.rentwheelzz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.rentwheelz.rentwheelzz.repository.BookingRepository;

@Service
public class BookingStatusUpdater {

    @Autowired
    private BookingRepository bookingRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateBookingStatuses() {
        try {
            bookingRepository.updateCompletedBookings();
            System.out.println("Booking statuses updated successfully!");
        } catch (Exception e) {
            System.err.println("Error updating booking statuses: " + e.getMessage());
        }
    }
}
