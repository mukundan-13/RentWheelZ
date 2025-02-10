package com.rentwheelz.rentwheelzz.service;

import com.rentwheelz.rentwheelzz.dto.PasswordResetRequest;
import com.rentwheelz.rentwheelzz.dto.PasswordResetToken;
import com.rentwheelz.rentwheelzz.model.User;
import com.rentwheelz.rentwheelzz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void sendResetLink(PasswordResetRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); 
            userRepository.save(user);


            String resetLink = "https://rentwheelz-zvep.onrender.com/reset-password?token=" + token;
            sendEmail(user.getEmail(), resetLink);
        } else {

            throw new RuntimeException("User not found");
        }
    }

    private void sendEmail(String email, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n" + resetLink);
        mailSender.send(message);
    }

    public void resetPassword(PasswordResetToken tokenRequest) {
        User user = userRepository.findByResetToken(tokenRequest.getToken());
        if (user != null && user.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
            String newPassword = tokenRequest.getNewPassword(); 

            if (newPassword == null || newPassword.isEmpty()) {
                throw new IllegalArgumentException("New password cannot be null or empty");
            }
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null); 
            user.setResetTokenExpiry(null); 
            userRepository.save(user);
        } else {
            throw new RuntimeException("Invalid token or token expired");
        }
    }
}
