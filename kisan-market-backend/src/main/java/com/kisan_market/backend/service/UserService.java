package com.kisan_market.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kisan_market.backend.dto.AuthResponse;
import com.kisan_market.backend.dto.RegisterRequest;
import com.kisan_market.backend.dto.UpdateProfileRequest;
import com.kisan_market.backend.dto.UserDto;
import com.kisan_market.backend.entity.Role;
import com.kisan_market.backend.entity.User;
import com.kisan_market.backend.exception.BadRequestException;
import com.kisan_market.backend.exception.NotFoundException;
import com.kisan_market.backend.repository.UserRepository;
import com.kisan_market.backend.security.JwtService;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());

        Role role = request.getRole();
        user.setRole(role == null || role == Role.ADMIN ? Role.CUSTOMER : role);

        userRepository.save(user);
        return buildAuthResponse(user);
    }

    public AuthResponse login(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return buildAuthResponse(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public UserDto getUserDto(User user) {
        return UserDto.from(user);
    }

    public UserDto updateProfile(String email, UpdateProfileRequest request) {
        User user = findByEmail(email);

        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            user.setPhone(request.getPhone());
        }

        if (request.getDeliveryLocation() != null) {
            user.setDeliveryLocation(request.getDeliveryLocation());
        }

        userRepository.save(user);
        return UserDto.from(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token, UserDto.from(user));
    }
}
