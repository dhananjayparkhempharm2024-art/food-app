package org.food.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRestaurantRequest(
        @NotBlank String fullName,
        @Email @NotBlank String email,
        @NotBlank String password,
        String phone,
        @NotBlank String restaurantName,
        String description,
        String address,
        String cuisineType,
        String restaurantPhone) {
}

