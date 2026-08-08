package com.kisan_market.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.kisan_market.backend.dto.AuthResponse;
import com.kisan_market.backend.dto.LoginRequest;
import com.kisan_market.backend.dto.RegisterRequest;
import com.kisan_market.backend.dto.UpdateProfileRequest;
import com.kisan_market.backend.dto.UserDto;
import com.kisan_market.backend.entity.User;
import com.kisan_market.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }

    @GetMapping("/me")
    public UserDto me(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        return userService.getUserDto(user);
    }

    @PutMapping("/me")
    public UserDto updateMe(@Valid @RequestBody UpdateProfileRequest request, Authentication authentication) {
        return userService.updateProfile(authentication.getName(), request);
    }
}
