package com.rentwheelz.rentwheelzz.service;

import com.rentwheelz.rentwheelzz.model.Booking;
import com.rentwheelz.rentwheelzz.model.Booking.Status;
import com.rentwheelz.rentwheelzz.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    public String getUserEmailByBookingId(Long bookingId) {
        return bookingRepository.findUserEmailByBookingId(bookingId);
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    
    public List<Booking> getBookingsForUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public Booking cancelBooking(Long bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            // Change status to 'Cancelled'
            booking.setStatus(Status.CANCELED);
            return bookingRepository.save(booking);
        } else {
            throw new RuntimeException("Booking not found");
        }
    }
}
