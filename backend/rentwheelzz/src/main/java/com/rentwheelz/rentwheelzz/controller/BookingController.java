package com.rentwheelz.rentwheelzz.controller;

import com.rentwheelz.rentwheelzz.model.Booking;
import com.rentwheelz.rentwheelzz.service.BookingNotificationService;
import com.rentwheelz.rentwheelzz.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private BookingNotificationService bookingNotificationService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.saveBooking(booking);
        String email = bookingService.getUserEmailByBookingId(savedBooking.getId());
        
        if (email != null) {
            System.out.println("User email: " + email);
        } else {
            System.out.println("User not associated with the booking.");
        }
        bookingNotificationService.sendBookingStatusEmail(email, savedBooking);

        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBooking);
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    
    
    
    @PutMapping("/cancel/{id}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        try {
            Booking cancelledBooking = bookingService.cancelBooking(id);
            String email = bookingService.getUserEmailByBookingId(cancelledBooking.getId());
            
            if (email != null) {
                System.out.println("User email: " + email);
            } else {
                System.out.println("User not associated with the booking.");
            }
            bookingNotificationService.sendBookingStatusCancelled(email, cancelledBooking);
            return ResponseEntity.ok(cancelledBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
 
    }
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getAllBookingsForUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingsForUser(userId);
        return ResponseEntity.ok(bookings);
    }
}
