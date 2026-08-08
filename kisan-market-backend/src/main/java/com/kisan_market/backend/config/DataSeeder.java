package com.kisan_market.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.kisan_market.backend.entity.Role;
import com.kisan_market.backend.entity.User;
import com.kisan_market.backend.repository.UserRepository;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@kisan.com").isEmpty()) {
                User admin = new User(
                        "Admin",
                        "admin@kisan.com",
                        passwordEncoder.encode("admin123"),
                        "0000000000",
                        Role.ADMIN);
                userRepository.save(admin);
            }
        };
    }
}
