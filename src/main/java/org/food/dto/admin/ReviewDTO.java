package org.food.dto.admin;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public record ReviewDTO(
        Long id,
        String customerName,
        String restaurantName,
        Integer rating,
        String comment,
        LocalDateTime createdAt) {

    public ReviewDTO(Long id,
                     String customerName,
                     String restaurantName,
                     Integer rating,
                     String comment,
                     Instant createdAt) {
        this(id, customerName, restaurantName, rating, comment,
                createdAt != null ? LocalDateTime.ofInstant(createdAt, ZoneOffset.UTC) : null);
    }
}

