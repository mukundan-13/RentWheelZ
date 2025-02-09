package com.rentwheelz.rentwheelzz.service;

import com.rentwheelz.rentwheelzz.model.Booking;
import com.rentwheelz.rentwheelzz.model.User;
import com.rentwheelz.rentwheelzz.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@Service
public class BookingNotificationService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private JavaMailSender mailSender;

    private static final Logger log = LoggerFactory.getLogger(BookingNotificationService.class);

    public void updateBookingStatusAndNotify(Long bookingId, String newStatus) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();

            Booking.Status status = Booking.Status.valueOf(newStatus.toUpperCase());
            booking.setStatus(status); 
            bookingRepository.save(booking);
            User user = booking.getUser(); 
            sendBookingStatusEmail(user.getEmail(), booking);
        } else {
            throw new RuntimeException("Booking not found");
        }
    }

    public void sendBookingStatusEmail(String email, Booking booking) {
        if (email == null || email.trim().isEmpty()) {
            log.error("Email address is null or empty for booking ID: {}", booking.getId());
            throw new IllegalArgumentException("Email address cannot be null or empty");
        }

        log.debug("Booking Details: {}", booking);
        log.debug("User: {}", booking.getUser()); 
        log.debug("Vehicle: {}", booking.getVehicle());  

        String subject = "Booking Confirmed - RentWheelz";

        String firstName = (booking.getUser() != null && booking.getUser().getFirstName() != null) 
        ? booking.getUser().getFirstName() 
        : "User";
    
    String vehicleModel = (booking.getVehicle() != null && booking.getVehicle().getModel() != null) 
        ? booking.getVehicle().getModel() 
        : "Vehicle Model";
    
    String companyName = (booking.getVehicle() != null && booking.getVehicle().getCompanyName() != null) 
        ? booking.getVehicle().getCompanyName() 
        : "Company Name";
    
        
        String startDate = (booking.getStartDate() != null) 
            ? booking.getStartDate().toString() 
            : "N/A";
        
        String endDate = (booking.getEndDate() != null) 
            ? booking.getEndDate().toString() 
            : "N/A";
        
        Double totalPrice = (booking.getTotalPrice() != null) 
            ? booking.getTotalPrice() 
            : 0.00;

        String messageText = String.format(
            "Dear %s,\n\n" +
            "Your booking has been confirmed!\n\n" +
            "Here are your booking details:\n" +
            "Booking ID: %d\n" +
            "Booking Start Date: %s\n" +
            "Booking End Date: %s\n" +
            "Total Amount: $%.2f\n\n" +
            "Thank you for choosing RentWheelz! If you have any questions, feel free to contact us.\n\n" +
            "Best regards,\n" +
            "The RentWheelz Team",
            firstName,
            booking.getId(),
            //vehicleModel,
            //companyName,
            startDate,
            endDate,
            totalPrice
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(messageText);

        mailSender.send(message);
    }

    public void sendBookingStatusCancelled(String email, Booking booking) {
        if (email == null || email.trim().isEmpty()) {
            log.error("Email address is null or empty for booking ID: {}", booking.getId());
            throw new IllegalArgumentException("Email address cannot be null or empty");
        }

        String subject = "Booking Cancelled - RentWheelz";
        String firstName = (booking.getUser() != null && booking.getUser().getFirstName() != null) 
            ? booking.getUser().getFirstName() 
            : "User";
        
        String vehicleModel = (booking.getVehicle() != null && booking.getVehicle().getModel() != null) 
            ? booking.getVehicle().getModel() 
            : "Vehicle Model";
        
        String companyName = (booking.getVehicle() != null && booking.getVehicle().getCompanyName() != null) 
            ? booking.getVehicle().getCompanyName() 
            : "Company Name";
        
        String startDate = (booking.getStartDate() != null) 
            ? booking.getStartDate().toString() 
            : "N/A";
        
        String endDate = (booking.getEndDate() != null) 
            ? booking.getEndDate().toString() 
            : "N/A";

        String messageText = String.format(
            "Dear %s,\n\n" +
            "We regret to inform you that your booking for vehicle '%s' has been cancelled.\n" +
            "We apologize for the inconvenience and hope to serve you better in the future.\n\n" +
            "Booking ID: %d\n" +
            "Vehicle: %s\n" +
            "Company: %s\n" +
            "Booking Start Date: %s\n" +
            "Booking End Date: %s\n\n" +
            "For any queries, feel free to contact us.\n\n" +
            "Best regards,\n" +
            "The RentWheelz Team",
            firstName,
            vehicleModel,
            booking.getId(),
            vehicleModel,
            companyName,
            startDate,
            endDate
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(messageText);

        mailSender.send(message);
    }
}
