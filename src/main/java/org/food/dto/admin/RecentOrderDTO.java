package org.food.dto.admin;

import java.time.Instant;

public record RecentOrderDTO(
        Long id,
        String status,
        Double totalAmount,
        Instant createdAt) {
}

