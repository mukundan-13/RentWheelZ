package com.rentwheelz.rentwheelzz.controller;

import com.rentwheelz.rentwheelzz.dto.UserDTO;
import com.rentwheelz.rentwheelzz.model.User;
import com.rentwheelz.rentwheelzz.security.JwtUtil;
import com.rentwheelz.rentwheelzz.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserProfileController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getProfile(HttpServletRequest request) {
        String email = getEmailFromToken(request);
        if (email != null) {
            Optional<User> userOptional = userService.findByEmail(email);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                UserDTO userDTO = new UserDTO(
                		user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getAddress(),
                        user.getPhoneNumber(),
                        user.getRole()
                );
                return ResponseEntity.ok(userDTO);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody UserDTO userDTO, HttpServletRequest request) {
        String email = getEmailFromToken(request);
        if (email != null) {
            Optional<User> userOptional = userService.findByEmail(email);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                // Update user details
                user.setFirstName(userDTO.getFirstName());
                user.setLastName(userDTO.getLastName());
                user.setAddress(userDTO.getAddress());
                user.setPhoneNumber(userDTO.getPhoneNumber());
                // Save updated user
                userService.save(user);
                return ResponseEntity.ok("User profile updated successfully!");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping("/profile")
    public ResponseEntity<String> deleteProfile(HttpServletRequest request) {
        String email = getEmailFromToken(request);
        if (email != null) {
            Optional<User> userOptional = userService.findByEmail(email);
            if (userOptional.isPresent()) {
                userService.delete(userOptional.get());
                return ResponseEntity.ok("User profile deleted successfully!");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    private String getEmailFromToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtUtil.extractEmail(token);
        }
        return null;
    }
}
