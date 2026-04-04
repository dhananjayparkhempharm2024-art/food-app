package org.food.dto.admin;

public record RestaurantDTO(
        Long id,
        String restaurantName,
        String address,
        String email,
        String cuisineType,
        String description) {
}

