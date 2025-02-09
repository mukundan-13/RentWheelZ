package com.rentwheelz.rentwheelzz.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.rentwheelz.rentwheelzz.service.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	
	@Autowired
	private CustomUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter; // Inject the JWT filter

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/api/auth/**").permitAll() // Allow auth requests
//                .requestMatchers("/h2-console/**").permitAll() // Allow access to H2 console
//                .anyRequest().authenticated() // Secure all other requests
//            )
//            .csrf(csrf -> csrf.disable())
//            .headers(headers -> headers
//                .frameOptions(frameOptions -> frameOptions.sameOrigin())) // Allow frames for H2 console
//            .sessionManagement(session -> session
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Use stateless session management
//        
//            // Add the JWT filter
//            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .anyRequest().permitAll() 
            )
            .csrf(csrf -> csrf.disable()) 
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.disable())  
            );

        return http.build();
    }
}
