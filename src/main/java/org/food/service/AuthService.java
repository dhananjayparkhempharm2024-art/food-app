package org.food.service;

import org.food.dto.auth.AuthResponse;
import org.food.dto.auth.LoginRequest;
import org.food.dto.auth.RegisterCustomerRequest;
import org.food.dto.auth.RegisterRestaurantRequest;
import org.food.entity.Cart;
import org.food.entity.Restaurant;
import org.food.entity.User;
import org.food.enums.RestaurantStatus;
import org.food.enums.Role;
import org.food.exception.BadRequestException;
import org.food.repository.CartRepository;
import org.food.repository.RestaurantRepository;
import org.food.repository.UserRepository;
import org.food.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       RestaurantRepository restaurantRepository,
                       CartRepository cartRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse registerCustomer(RegisterCustomerRequest request) {
        ensureUniqueEmail(request.email());

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setPhone(request.phone());
        user.setRole(Role.CUSTOMER);
        user = userRepository.save(user);

        Cart cart = new Cart();
        cart.setCustomer(user);
        cartRepository.save(cart);

        return buildResponse(user);
    }

    @Transactional
    public AuthResponse registerRestaurant(RegisterRestaurantRequest request) {
        ensureUniqueEmail(request.email());

        User owner = new User();
        owner.setFullName(request.fullName());
        owner.setEmail(request.email().toLowerCase());
        owner.setPassword(passwordEncoder.encode(request.password()));
        owner.setPhone(request.phone());
        owner.setRole(Role.RESTAURANT);
        owner = userRepository.save(owner);

        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.restaurantName());
        restaurant.setDescription(request.description());
        restaurant.setAddress(request.address());
        restaurant.setPhone(request.restaurantPhone());
        restaurant.setCuisineType(request.cuisineType());
        restaurant.setStatus(RestaurantStatus.PENDING);
        restaurant.setOwner(owner);
        restaurant = restaurantRepository.save(restaurant);

        owner.setRestaurant(restaurant);
        userRepository.save(owner);

        return buildResponse(owner);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email().toLowerCase(), request.password()));
        User user = userRepository.findByEmail(request.email().toLowerCase())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));
        return buildResponse(user);
    }

    private void ensureUniqueEmail(String email) {
        if (userRepository.existsByEmail(email.toLowerCase())) {
            throw new BadRequestException("Email already registered");
        }
    }

    private AuthResponse buildResponse(User user) {
        UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole().name())
                .disabled(!user.isEnabled())
                .build();
        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token, "Bearer", user.getId(), user.getFullName(), user.getEmail(), user.getRole());
    }
}

