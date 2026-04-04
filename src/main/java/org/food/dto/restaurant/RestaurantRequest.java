package org.food.dto.restaurant;

import jakarta.validation.constraints.NotBlank;

public record RestaurantRequest(
        @NotBlank String name,
        String description,
        String address,
        String phone,
        String cuisineType) {
}

