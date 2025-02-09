package com.rentwheelz.rentwheelzz.controller;

import com.rentwheelz.rentwheelzz.model.User;
import com.rentwheelz.rentwheelzz.security.JwtUtil;
import com.rentwheelz.rentwheelzz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender javaMailSender;  

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.register(user);

        String subject = "Registration Successful";
        String body = "Dear " + user.getFirstName() + ",\n\nWelcome to RentWheelz – your one-stop destination for renting the best cars around! We are thrilled to have you join our community of car enthusiasts and travelers.\n" + //
                        "\n" + //
                        "At RentWheelz, we are committed to offering you a seamless and enjoyable car rental experience. Whether you're planning a weekend getaway, a business trip, or just need a reliable ride, we've got the perfect vehicle waiting for you.\n" + //
                        "\n" + //
                        "Here's what you can expect:\n" + //
                        "A wide range of vehicles: From luxury sedans to rugged SUVs, we offer a diverse fleet to suit your needs.\n" + //
                        "Easy booking process: Renting a car has never been this simple – browse, select, and book with just a few clicks.\n" + //
                        "If you have any questions or need assistance, feel free to reply to this email.\n" + //
                        "\n" + //
                        "Thank you for choosing RentWheelz – we look forward to serving you!\n" + //
                        "\n" + //
                        "Best regards,\n" + //
                        "The RentWheelz Team\n";
        
        sendRegistrationEmail(user.getEmail(), subject, body); 

        return ResponseEntity.ok("User registered successfully!");
    }

    private void sendRegistrationEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("your-email@gmail.com");  
        javaMailSender.send(message);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isPresent() &&
                passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/check")
    public ResponseEntity<String> checkAuth(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); 
            
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                return ResponseEntity.ok("User is authenticated: " + email);
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        return ResponseEntity.status(401).body("Authorization header missing");
    }
}
