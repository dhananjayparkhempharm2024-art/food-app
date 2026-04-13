package org.food.dto.cart;

import java.math.BigDecimal;

public record CartMenuItemDTO(
        Long id,
        String name,
        String description,
        BigDecimal price,
        boolean available) {
}

