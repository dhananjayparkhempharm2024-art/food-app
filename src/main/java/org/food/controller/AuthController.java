package org.food.controller;

import org.food.dto.auth.AuthResponse;
import org.food.dto.auth.LoginRequest;
import org.food.dto.auth.RegisterCustomerRequest;
import org.food.dto.auth.RegisterRestaurantRequest;
import org.food.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register/customer")
    public ResponseEntity<AuthResponse> registerCustomer(@Valid @RequestBody RegisterCustomerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerCustomer(request));
    }

    @PostMapping("/register/restaurant")
    public ResponseEntity<AuthResponse> registerRestaurant(@Valid @RequestBody RegisterRestaurantRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerRestaurant(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}

