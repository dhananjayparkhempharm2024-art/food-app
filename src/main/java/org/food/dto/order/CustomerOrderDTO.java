package org.food.dto.order;

import java.math.BigDecimal;
import java.time.Instant;

import org.food.enums.OrderStatus;

public record CustomerOrderDTO(
        Long id,
        OrderStatus status,
        BigDecimal totalAmount,
        String paymentMode,
        Instant createdAt) {
}

