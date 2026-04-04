package org.food.dto.admin;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.food.enums.OrderStatus;

public record OrderHistoryDTO(
        Long id,
        String customerName,
        String restaurantName,
        BigDecimal totalAmount,
        OrderStatus status,
        LocalDateTime createdAt) {

    public OrderHistoryDTO(Long id,
                           String customerName,
                           String restaurantName,
                           BigDecimal totalAmount,
                           OrderStatus status,
                           Instant createdAt) {
        this(id, customerName, restaurantName, totalAmount, status,
                createdAt != null ? LocalDateTime.ofInstant(createdAt, ZoneOffset.UTC) : null);
    }
}

